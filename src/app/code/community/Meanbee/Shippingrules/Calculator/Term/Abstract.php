<?php
abstract class Meanbee_Shippingrules_Calculator_Term_Abstract
    implements Meanbee_Shippingrules_Calculator_Numeric
{
    /**
     * [evaluate description]
     * @todo
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public abstract function evaluate($request);

    /**
     * [init description]
     * @todo
     * @param  [type] $obj [description]
     * @return $this       [description]
     */
    public abstract function init($obj, $context);
}
