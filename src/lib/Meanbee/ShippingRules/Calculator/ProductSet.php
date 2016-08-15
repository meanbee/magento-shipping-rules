<?php
interface Meanbee_Shippingrules_Calculator_ProductSet
{
    /**
    * Evaluates the object to a boolean value.
    * @param Mage_Shipping_Model_Rate_Request $request
    * @return array
    */
    public function evaluate($request);
}
