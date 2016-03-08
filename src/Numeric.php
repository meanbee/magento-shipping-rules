<?php
interface Numeric
{
	/**
    * [evaluate description]
    * @todo
    * @param Mage_Shipping_Model_Rate_Request $request [description]
    * @return int|float [description]
    */
	public function evaluate($request);
}
