<?php
class Meanbee_Shippingrules_Model_Rule extends Mage_Core_Model_Abstract
{
    protected function _construct()
    {
        $this->_init('meanbee_shippingrules/rule');
    }

    /**
     * Calculates the shipping method cost.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public function calculateCost($request, $registers) {
        try {
            $costDescriptor = Zend_Json::decode($this->getCost());
        } catch (Zend_Json_Exception $error) {
            Mage::log("Malformed cost descriptor: {$error}", Zend_Log::WARN, 'system.log');
            return 0;
        }
        if ($costDescriptor['register'] !== 'Aggregator') {
            return 0;
        }
        $calculator = $registers->getAggregatorRegister()->newInstanceOf($costDescriptor['key'], $costDescriptor);
        $cost = $calculator->evaluate($request);
        if ($this->getCostPerItem()) {
            $cost *= $this->getTotalQuantity($request);
        }
        return $cost;
    }

    /**
     * Calculates the shipping method price.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public function calculatePrice($request, $registers) {
        try {
            $priceDescriptor = Zend_Json::decode($this->getPrice());
        } catch (Zend_Json_Exception $error) {
            Mage::log("Malformed price descriptor: {$error}", Zend_Log::WARN, 'system.log');
            return 0;
        }
        if ($priceDescriptor['register'] !== 'Aggregator') {
            return 0;
        }
        $calculator = $registers->getAggregatorRegister()->newInstanceOf($priceDescriptor['key'], $priceDescriptor);
        $price = $calculator->evaluate($request);
        if ($this->getPricePerItem()) {
            $price *= $this->getTotalQuantity($request);
        }
        return $price;
    }

    /**
     * Calculates whether the shipping rule conditions are met.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public function matchesConditions($request, $registers) {
        try {
            $conditionDescriptor = Zend_Json::decode($this->getConditions());
        } catch (Zend_Json_Exception $error) {
            Mage::log("Malformed condition descriptor: {$error}", Zend_Log::WARN, 'system.log');
            return 0;
        }
        if ($conditionDescriptor['register'] !== 'Aggregator') {
            return 0;
        }
        $calculator = $registers->getAggregatorRegister()->newInstanceOf($conditionDescriptor['key'], $conditionDescriptor, null);
        return $calculator->evaluate($request);
    }

    /**
     * Adds variables and corresponding values to the shipping rate request.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    static function addVariablesToRequest($request, $registers)
    {
        $request = $registers->getConditionRegister()->addVariablesToRequest($request);
        Mage::log(json_encode($request->getData(), JSON_PRETTY_PRINT), Zend_Log::DEBUG, 'meanbee_shippingrules.log');
        return $request;
    }

    protected function getTotalQuantity($request) {
        $items = $request->getAllItems();
        $quantity = 0;
        foreach ($items as $item) {
            $quantity += $item->getQty();
        }
        return $quantity;
    }
}
