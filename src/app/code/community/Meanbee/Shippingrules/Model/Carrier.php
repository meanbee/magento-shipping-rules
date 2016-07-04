<?php
class Meanbee_Shippingrules_Model_Carrier
    extends Mage_Shipping_Model_Carrier_Abstract
    implements Mage_Shipping_Model_Carrier_Interface
{
    protected $_code = 'meanbee_shippingrules';
    /**
     * {@inheritdoc}
     * @implementation Mage_Shipping_Model_Carrier_Interface
     * @return array Allowed shipping methods.
     */
    public function getAllowedMethods()
    {
        $methods = array();

        /** @var Meanbee_Shippingrules_Model_Resource_Rule_Collection $ruleCollection */
        $ruleCollection = Mage::getModel('meanbee_shippingrules/rule')
            ->getCollection()
            ->addFieldToFilter('is_active', 1)
            ->setOrder('display_sort_order', Varien_Data_Collection::SORT_ORDER_ASC);

        foreach ($ruleCollection as $rule) {
            /** @var Meanbee_Shippingrules_Model_Rule */
            $methods[$rule->getId()] = $rule->getName();
        }
        return $methods;
    }

    /**
     * Collect and get rates.
     * @override
     * @param  Mage_Shipping_Model_Rate_Request           $request
     * @return Mage_Shipping_Model_Rate_Result|bool|null
     */
    public function collectRates(Mage_Shipping_Model_Rate_Request $request)
    {
        /** @var Meanbee_Shippingrules_Helper_Config $config */
        $config = Mage::helper('meanbee_shippingrules/config');

        if (!$config->isActive()) {
            return false;
        }

        $registers = new Meanbee_Shippingrules_Calculator_Registers;

        $request = Meanbee_Shippingrules_Model_Rule::addVariablesToRequest($request, $registers);
        // Mage::log(array_map(function ($item) { return json_encode($item->getData()); }, $request->getAllItems()), Zend_Log::DEBUG, 'debug.log', true);
        $resultArray = array();
        foreach ($methods = $this->getMatchedRules($request, $registers) as $methodName => $rule) {
            /** @var Mage_Shipping_Model_Rate_Result_Method $method */
            $method = Mage::getModel('shipping/rate_result_method');

            $method->setCarrier('meanbee_shippingrules');
            $method->setCarrierTitle($config->getCarrierName());

            $method->setMethod($rule->getId());
            $method->setMethodTitle($methodName);

            if ($method->getFreeShipping()) {
                $method->setCost(0);
                $method->setPrice(0);
            } else {
                $method->setCost($rule->getCost());
                $method->setPrice($rule->getPrice());
            }

            $resultArray[] = $method;
        }
        usort($resultArray, 'self::sortRates');

        /** @var Mage_Shipping_Model_Rate_Result $result */
        $result = Mage::getModel('shipping/rate_result');
        foreach ($resultArray as $method) {
            $result->append($method);
        }
        return $result;
    }

    /**
     * Gets matched rules excluding those disabled by stop flags.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Varien_Object[]
     */
    protected function getMatchedRules($request, $registers) {
        $methods = array();

        /** @var Meanbee_Shippingrules_Model_Resource_Rule_Collection $ruleCollection */
        $ruleCollection = Mage::getModel('meanbee_shippingrules/rule')
            ->getCollection()
            ->addFieldToFilter('is_active', 1)
            ->setOrder('sort_order', Varien_Data_Collection::SORT_ORDER_ASC);

        $stopFlag = array();

        foreach ($ruleCollection as $rule) {
            /** @var Meanbee_Shippingrules_Model_Rule */

            if (!$rule->matchesConditions($request, $registers)) {
                continue;
            }

            $ruleName = $rule->getName();
            /* Defer price and cost calculations until needed to avoid *
             * unnecescary execution time.                             */
            $price = false;
            if (array_key_exists($ruleName, $methods)) {
                if (!isset($stopFlag[$ruleName])) {
                    $stopFlag[$ruleName] = false;
                }
                /* If a stop flag has been found for a method with the same *
                 * name, ignore this one.                                   */
                if ($stopFlag[$ruleName]) {
                    continue;
                }
                $price = $rule->calculatePrice($request, $registers);
                /* If a cheaper method has already been found with the same *
                 * name, ignore this one.                                   */
                if ($methods[$rule_name]->getPrice() < $price) {
                    continue;
                }
            }
            if ($price === false) {
                $price = $rule->calculatePrice($request, $registers);
            }

            $methods[$ruleName] = new Varien_Object(array(
                'id'                 => $rule->getId(),
                'cost'               => $rule->calculateCost($request, $registers),
                'price'              => $price,
                'display_sort_order' => $rule->getDisplaySortOrder()
            ));

            if ($rule->getStopAllRulesProcessing()) {
                break;
            }
            if ($rule->getStopRulesProcessing()) {
                $stopFlag[$ruleName];
            }
        }
        return $methods;
    }

    /**
     * Sorts rates by Display Sort Order
     */
    protected static function sortRates($a, $b) {
        if ($a->getDisplaySortOrder() == $b->getDisplaySortOrder()) {
            return 0;
        }
        return ($a->getDisplaySortOrder() < $b->getDisplaySortOrder()) ? -1 : 1;
    }
}