<?php
class Meanbee_Shippingrules_Model_Carrier extends Mage_Shipping_Model_Carrier_Abstract {

    protected $_code = 'meanship';

    /**
     * Collect and get rates
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Result|bool|null
     */
    public function collectRates(Mage_Shipping_Model_Rate_Request $request) {
        if (!$this->getConfigFlag('active')) {
            return;
        }

        $result = Mage::getModel('shipping/rate_result');

        foreach ($this->_getApplicableRules($request) as $method_name =>  $rule_data) {
            $method = Mage::getModel('shipping/rate_result_method');

            $method->setCarrier($this->_code);
            $method->setCarrierTitle('Shipping');

            // record method information
            $method->setMethod($rule_data->getId());
            $method->setMethodTitle($method_name);

            // rate cost is optional property to record how much it costs to vendor to ship
            $method->setCost($rule_data->getCost());
            $method->setPrice($rule_data->getPrice());

            $result->append($method);
        }

        return $result;
    }

    protected function _getApplicableRules(Mage_Shipping_Model_Rate_Request $request) {
        $methods = array();

        $rule_collection = Mage::getModel('meanship/rule')->getCollection()
            ->addFieldToFilter('is_active', 1)
            ->setOrder('sort_order');

        /**
         * The customer doesn't come to us through $request, so we need to check for it manually.  This following will
         * work on the frontend checkout.
         *
         * @TODO Check how this performs when creating an order from the admin area.
         */
        if ($customer = Mage::helper('customer')->getCustomer()) {
            $request->setCustomer($customer);
            $request->setCustomerGroupId($customer->getGroupId());
        } else {
            $request->setCustomer(null);
            $request->setCustomerGroupId(Mage_Customer_Model_Group::NOT_LOGGED_IN_ID);
        }

        foreach ($rule_collection as $rule) {
            if (!$rule->validate($request)) {
                continue;
            }

            if (array_key_exists($rule->getName(), $methods)) {
                if ($methods[$rule->getName()]->getPrice() < $rule->getPrice()) {
                    continue;
                }
            }

            $methods[$rule->getName()] = new Varien_Object(array(
                'price' => $rule->getPrice(),
                'cost'  => $rule->getCost(),
                'id'    => $rule->getId()
            ));
        }

        return $methods;
    }
}