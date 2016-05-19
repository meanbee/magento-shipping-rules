<?php
abstract class Meanbee_Shippingrules_Calculator_Term_Abstract
    implements Meanbee_Shippingrules_Calculator_Numeric
{
    /** @var Meanbee_Shippingrules_Calculator_* $parent */
    public $parent;

    /**
     * Evaluates the value of the term
     * @todo
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public abstract function evaluate($request);

    /**
     * Initialises term with descriptor array.
     * @todo
     * @param  Array                              $obj Descriptor Array
     * @param  Meanbee_Shippingrules_Calculator_* $parent Parent object in evaluation tree.
     * @return $this
     */
    public abstract function init($obj, &$parent)
    {
        $this->parent = $parent;
        return $this;
    }
}
