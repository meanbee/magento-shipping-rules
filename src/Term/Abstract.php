<?php
abstract class Term_Abstract implements Numeric
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
