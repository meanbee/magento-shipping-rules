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
}
