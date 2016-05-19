<?php
interface Meanbee_Shippingrules_Calculator_Boolean
{
	/**
    * Evaluates the object to a boolean value.
    * @param Mage_Shipping_Model_Rate_Request $request
    * @return boolean
    */
	public function evaluate($request);
}
