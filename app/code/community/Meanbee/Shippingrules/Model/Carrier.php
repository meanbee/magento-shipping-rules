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

        foreach (Mage::getModel('meanship/rule')->getCollection() as $rule) {

            if (!$rule->validate($request)) {
                continue;
            }

            $method = Mage::getModel('shipping/rate_result_method');

            $method->setCarrier($this->_code);
            $method->setCarrierTitle('Shipping');

            // record method information
            $method->setMethod($rule->getId());
            $method->setMethodTitle($rule->getName());

            // rate cost is optional property to record how much it costs to vendor to ship
            $method->setCost($rule->getPrice());
            $method->setPrice($rule->getPrice());

            $result->append($method);
        }

        return $result;
    }
}