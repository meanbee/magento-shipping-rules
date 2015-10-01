<?php
class Meanbee_Shippingrules_Model_Carrier extends Mage_Shipping_Model_Carrier_Abstract implements Mage_Shipping_Model_Carrier_Interface {
    protected $_code = 'meanship';

    /**
     * Collect and get rates
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Result|bool|null
     */
    public function collectRates(Mage_Shipping_Model_Rate_Request $request) {
        if (!$this->isActive()) {
            return false;
        }

        $result = Mage::getModel('shipping/rate_result');

        foreach ($this->_getApplicableRules($request) as $method_name =>  $rule_data) {
            $method = Mage::getModel('shipping/rate_result_method');

            $method->setCarrier($this->_code);
            $method->setCarrierTitle($this->getConfigData('title'));

            // record method information
            $method->setMethod($rule_data->getId());
            $method->setMethodTitle($method_name);

            if ($request->getFreeShipping()) {
                $method->setCost(0);
                $method->setPrice(0);
            } else {
                // rate cost is optional property to record how much it costs to vendor to ship
                $method->setCost($rule_data->getCost());
                $method->setPrice($rule_data->getPrice());
            }

            $result->append($method);
        }
        usort($result, 'self::sortRates');
        return $result;
    }

    public function getAllowedMethods() {
        $methods = array();

        /** @var $rule_collection Meanbee_Shippingrules_Model_Resource_Rule_Collection */
        $rule_collection = Mage::getModel('meanship/rule')->getCollection()
            ->addFieldToFilter('is_active', 1)
            ->setOrder('sort_order', Varien_Data_Collection::SORT_ORDER_ASC);

        foreach ($rule_collection as $rule) {
            $methods[$rule->getId()] = $rule->getName();
        }

        return $methods;
    }

    protected function _getApplicableRules(Mage_Shipping_Model_Rate_Request $request) {
        $methods = array();

        /** @var $rule_collection Meanbee_Shippingrules_Model_Resource_Rule_Collection */
        $rule_collection = Mage::getModel('meanship/rule')->getCollection()
            ->addFieldToFilter('is_active', 1)
            ->setOrder('sort_order', Varien_Data_Collection::SORT_ORDER_ASC);

        $request = $this->addCustomerDataToRequest($request);
        $request = $this->addAdminOrderDataToRequest($request);
        $request = $this->addPostcodePrefixToRequest($request);
        $request = $this->addCountryGroupToRequest($request);
        $request = $this->addNumericPostcodesToRequest($request);

        $stop_flag = array(
            '_all' => false
        );

        foreach ($rule_collection as $rule) {
            /** @var $rule Meanbee_Shippingrules_Model_Rule */
            if (!$rule->validate($request)) {
                continue;
            }

            $rule_name = $rule->getName();

            if (array_key_exists($rule_name, $methods)) {
                if (!isset($stop_flag[$rule_name])) {
                    $stop_flag[$rule_name] = false;
                }

                /**
                 * We'll skip this rule if we've already matched at a cheaper price, or we've hit a stop flag.
                 */
                if ($methods[$rule_name]->getPrice() < $rule->getPrice() || $stop_flag[$rule_name]) {
                    continue;
                } else if ($stop_flag['_all']) {
                    break;
                }
            }

            $methods[$rule_name] = new Varien_Object(array(
                'price' => $rule->getPrice(),
                'cost'  => $rule->getCost(),
                'id'    => $rule->getId()
            ));

            if ($rule->getStopRulesProcessing()) {
                $stop_flag[$rule_name] = true;
            }

            if ($rule->getStopAllRulesProcessing()) {
                $stop_flag['_all'] = true;
            }
        }

        return $methods;
    }

    /**
     * Establish whether or not the destination country is in a country group and add the country group
     * to the request if so.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addCountryGroupToRequest(Mage_Shipping_Model_Rate_Request $request) {

        $destination_country = $request->getDestCountryId();
        $destination_country_group = null;

        if (Mage::helper('meanship/compat')->isEuCountrySupported() && Mage::helper('core')->isCountryInEU($destination_country)) {
            $destination_country_group = 'eu';
        }

        if ($destination_country_group) {
            $request->setData('dest_country_group', $destination_country_group);
        }

        return $request;
    }

    /**
     * The customer doesn't come to us through $request, so we need to check for it manually.  This following will
     * work on the frontend checkout.
     *
     * @param $request Mage_Shipping_Model_Rate_Request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addCustomerDataToRequest(Mage_Shipping_Model_Rate_Request $request) {
        if (Mage::getSingleton('adminhtml/session_quote')->getCustomer()->hasData()) {
            $customer = Mage::getSingleton('adminhtml/session_quote')->getCustomer();
            $request->setCustomer($customer);
            $request->setCustomerGroupId($customer->getGroupId());
        } elseif (Mage::helper('customer')->getCustomer()->hasData()) {
            $customer = Mage::helper('customer')->getCustomer();
            $request->setCustomer($customer);
            $request->setCustomerGroupId($customer->getGroupId());
        } else {
            $request->setCustomer(null);
            $request->setCustomerGroupId(Mage_Customer_Model_Group::NOT_LOGGED_IN_ID);
        }

        return $request;
    }

    /**
     * Determine whether or not this is an order placed in the admin area.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addAdminOrderDataToRequest(Mage_Shipping_Model_Rate_Request $request) {
        if (Mage::getSingleton('adminhtml/session_quote')->hasData('quote_id')) {
            $request->setIsAdminOrder(true);
        } else {
            $request->setIsAdminOrder(false);
        }

        return $request;
    }

    /**
     * Extract the postcode prefix from the destination postcode if available.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addPostcodePrefixToRequest(Mage_Shipping_Model_Rate_Request $request) {
        $postcode = $request->getDestPostcode();
        $postcode_prefix = null;

        if ($postcode) {
            $postcode_prefix = Mage::helper('meanship/postcode')->extractUKPostcodePrefix($postcode);
        }

        if ($postcode_prefix) {
            $request->setData('dest_postcode_prefix', $postcode_prefix);
        }

        return $request;
    }

    /**
     * If the postcode is numeric then cast to a number and store it on the request so we can perform
     * numerical operations on it in the rule conditions.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addNumericPostcodesToRequest(Mage_Shipping_Model_Rate_Request $request) {

        if ($request->hasData('dest_postcode')) {
            $postcode = preg_replace('/\s*/', '', $request->getData('dest_postcode'));

            if (is_numeric($postcode)) {
                $request->setData('dest_postcode_numeric', (int) $postcode);
            }
        }

        return $request;
    }

    /**
     * Sorts rates by Display Sort Order
     */
     protected static function sortRates($a, $b) {
         if ($a->getDisplaySortOrder()==$b->getDisplaySortOrder()) {
             return 0;
         }
         return ($a->getDisplaySortOrder() < $b->getDisplaySortOrder()) ? -1 : 1;
     }
}
