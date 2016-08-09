<?php
class Meanbee_Shippingrules_Helper_Upgrade extends Mage_Core_Helper_Abstract {
    public function migrateRulesTo1point1() {
        $rules = Mage::getModel('meanship/rule')->getCollection();

        /** @var $resource Mage_Core_Model_Resource */
        $resource = Mage::getModel('core/resource');

        /** @var $write_connection Varien_Db_Adapter_Pdo_Mysql */
        $write_connection = $resource->getConnection('core_write');

        foreach ($rules as $rule) {
            /** @var $rule Meanbee_Shippingrules_Model_Rule */
            $conditions_serialized = $rule->getConditionsSerialized();
            $migrated_conditions = $this->_processRule(unserialize($conditions_serialized));

            /**
             * We do a direct write to the table, avoiding the before_save logic in the rule.
             */
            $write_connection->update($resource->getTableName('meanship/rule'), array(
                'conditions_serialized' => serialize($migrated_conditions),
                'version' => '1.1.0'
            ), array(
                'rule_id = ?' => $rule->getId()
            ));
        }
    }

    protected function _processRule($condition) {
        if (isset($condition['conditions']) && count($condition['conditions']) > 0) {
            foreach ($condition['conditions'] as $key => $value) {
                $condition['conditions'][$key] = $this->_processRule($value);
            }
        }

        $type      = $condition['type'];
        $attribute = $condition['attribute'];

        switch ($type) {
            case "meanship/rule_condition_cart_count":
                $type = 'meanship/rule_condition';
                $attribute = 'package_qty';
                break;
            case "meanship/rule_condition_cart_total":
                $type = 'meanship/rule_condition';
                $attribute = 'package_value';
                break;
            case "meanship/rule_condition_cart_weight":
                $type = 'meanship/rule_condition';
                $attribute = 'package_weight';
                break;

            case "meanship/rule_condition_customer_group":
                $type = 'meanship/rule_condition';
                $attribute = 'customer_group_id';
                break;

            case "meanship/rule_condition_destination_country":
                $type = 'meanship/rule_condition';
                $attribute = 'dest_country_id';
                break;
            case "meanship/rule_condition_destination_state":
                $type = 'meanship/rule_condition';
                $attribute = 'dest_region_id';
                break;
            case "meanship/rule_condition_destination_zipcode":
                $type = 'meanship/rule_condition';
                $attribute = 'dest_postcode';
                break;
        }

        $condition['type']      = $type;
        $condition['attribute'] = $attribute;

        return $condition;
    }

    public function serializeConditions($child) {
        switch (get_class($child)) {
            case 'Meanbee_Shippingrules_Model_Rule_Condition_Combine':
            case 'Mage_SalesRule_Model_Rule_Condition_Product_Combine':
                return $this->serializeAggregator($child);
            case 'Meanbee_Shippingrules_Model_Rule_Condition':
                return $this->serializeCondition($child);
            case 'Meanbee_Shippingrules_Model_Rule_Condition_PostalCode':
                return $this->serializePostalCodeCompoundCondition($child);
            case 'Meanbee_Shippingrules_Model_Rule_Condition_Product_Subselect':
                return $this->serializeProductSubselectionCompoundCondition($child);
            case 'Mage_SalesRule_Model_Rule_Condition_Product':
            case 'Mage_SalesRule_Model_Rule_Condition_Product_Attribute_Assigned':
                return $this->serializeProductSubselectionChildCondition($child);
            default:
                return '[[[' . get_class($child) . ']]]';
        }
    }

    public function serializeAggregator($aggregator) {
        return array(
            'register' => 'Aggregator',
            'key'      => array('all' => 'Conjunctive', 'any' => 'Disjunctive')[$aggregator->getAggregator()],
            'value'    => !!$aggregator->getValue(),
            'children' => array_map(array($this, 'serializeConditions'), $aggregator->getConditions())
        );
    }

    public function serializeCondition($condition) {
        return array(
            'register'   => 'Condition',
            'key'        => $this->mapAttributeToConditionKey($condition->getAttribute()),
            'variable'   => $this->mapAttributeToVariable($condition->getAttribute()),
            'comparator' => $this->serializeComparator($condition->getOperator()),
            'value'      => $condition->getValueParsed()
        );
    }

    public function serializePostalCodeCompoundCondition($condition) {
        return array(
            'register'   => 'Condition',
            'key'        => 'Destination_PostalCode',
            'variable'   => 'dest_postal_code',
            'value'      => $condition->getValueParsed(),
            'aggregator' => $this->serializeAggregator($condition)
        );
    }

    public function serializeProductSubselectionCompoundCondition($condition) {
        return array(
            'register'   => 'Condition',
            'key'        => 'Product_Subselection',
            'variable'   => 'product_subselection',
            'comparator' => $this->serializeComparator($condition->getOperator()),
            'value'      => $condition->getValueParsed(),
            'term'       => array(
                'register'   => 'Term',
                'key'        => 'Product_Subselection',
                'value'      => 1,
                'attribute'  => $condition->getAttribute(),
                'aggregator' => array(
                    'register' => 'Aggregator',
                    'key'      => array('all' => 'Intersectional', 'any' => 'Unional')[$condition->getAggregator()],
                    'value'    => true,
                    'children' => array_map(array($this, 'serializeConditions'), $condition->getConditions())
                )
            )
        );
    }

    public function serializeProductSubselectionChildCondition($condition) {
        return array(
            'register'    => 'Condition',
            'key'         => 'Product_Subselection',
            'variable'    => $condition->getAttribute(),
            'comparator'  => $this->serializeComparator($condition->getOperator()),
            'value'       => $condition->getValueParsed()
        );
    }

    public function mapAttributeToConditionKey($attribute) {
        switch ($attribute) {
            case 'store_id':
            case 'website_id':
            case 'is_admin_order':
                return 'Environment';
            case 'package_qty':
            case 'package_value':
            case 'base_subtotal_incl_tax':
            case 'package_value_with_discount':
            case 'package_weight':
                return 'Cart';
            case 'promo_free_shipping':
            case 'promo_coupon_code':
            case 'promo_applied_rule_ids':
                return 'Promotion';
            case 'payment_method':
                return 'Payment';
            case 'customer_group_id':
                return 'Customer';
            case 'time_time_of_day':
            case 'time_time_day_of_week':
                return 'Time';
            case 'dest_street_address_l1':
            case 'dest_street_address_l2':
            case 'dest_country_id':
            case 'dest_country_group':
            case 'dest_region_id':
                return 'Destination';
        }
        if (preg_match('/dest_postal_code_p([0-4])_(str|b10|b26|b36)/', $attribute)) {
            return 'Destination_PostalCode';
        }
    }

    public function mapAttributeToVariable($attribute) {
        switch ($attribute) {
            case 'customer_group_id':
                return 'customer_group';
        }
        $matches = array();
        if (preg_match('/dest_postal_code_p([0-4])_(str|b10|b26|b36)/', $attribute, $matches)) {
            return 'dest_postal_code_'.(+$matches[1] ? 'part'.$matches[1] : 'full');
        }
        return $attribute;
    }

    public function serializeComparator($operator) {
        return array(
            'register' => 'Comparator',
            'key' => array(
                '=='      => 'Equal',
                '!='      => 'NotEqual',
                '>='      => 'GreaterThanOrEqual',
                '>=:b26'  => 'GreaterThanOrEqual',
                '>=:b36'  => 'GreaterThanOrEqual',
                '<='      => 'LessThanOrEqual',
                '<=:b26'  => 'LessThanOrEqual',
                '<=:b36'  => 'LessThanOrEqual',
                '>'       => 'GeaterThan',
                '>:b26'   => 'GeaterThan',
                '>:b36'   => 'GeaterThan',
                '<'       => 'LessThan',
                '<:b26'   => 'LessThan',
                '<:b36'   => 'LessThan',
                '..'      => 'Between',
                '..:b26'  => 'Between',
                '..:b36'  => 'Between',
                '!..'     => 'NotBetween',
                '!..:b26' => 'NotBetween',
                '!..:b36' => 'NotBetween',
                '{}'      => 'Contains',
                '!{}'     => 'NotContain',
                '()'      => 'OneOf',
                '!()'     => 'NotOneOf',
                '^'       => 'Begins',
                '!^'      => 'NotBegin',
                '$'       => 'Ends',
                '!$'      => 'NotEnd',
                '//'      => 'MatchesRegEx',
                Mage_SalesRule_Model_Rule_Condition_Product_Attribute_Assigned::OPERATOR_ATTRIBUTE_IS_ASSIGNED => 'IsAssigned',
                Mage_SalesRule_Model_Rule_Condition_Product_Attribute_Assigned::OPERATOR_ATTRIBUTE_IS_NOT_ASSIGNED => 'NotAssigned'
            )[$operator]
        );
    }

    public function serializeConstantTermFromLiteral($literal) {
        $json = array(
            'register' => 'Aggregator',
            'key'      => 'Summative',
            'children' => array()
        );
        if ($literal <> 0) {
            $json['children'][] = array(
                'register' => 'Term',
                'key'      => 'Constant',
                'value'    => $literal
            );
        }
        return json_encode($json);
    }

    public function readyMigrationToVersion3($rule) {
        if (version_compare($rule->getVersion(), '3.0.0', '<') && version_compare($rule->getVersion(), '1.0.0', '>=')) {
            $rule->setConditionsMigration(json_encode($this->serializeConditions($rule->getConditions())));
            $rule->setPriceMigration($this->serializeConstantTermFromLiteral($rule->getPrice()));
            $rule->setCostMigration($this->serializeConstantTermFromLiteral($rule->getCost()));
            $rule->setVersion(Mage::getConfig()->getModuleConfig('Meanbee_Shippingrules')->version.'-migrationready');
        }
        return $rule;
    }
}
