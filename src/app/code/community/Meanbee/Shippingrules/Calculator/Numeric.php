<?php
interface Meanbee_Shippingrules_Calculator_Numeric
{
	/**
    * Evaluates the object to a numeric value.
    * @param Mage_Shipping_Model_Rate_Request $request
    * @return int|float
    */
	public function evaluate($request);
}
