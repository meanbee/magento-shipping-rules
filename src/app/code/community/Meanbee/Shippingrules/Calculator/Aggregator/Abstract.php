<?php
abstract class Meanbee_Shippingrules_Calculator_Aggregator_Abstract
{
    /** @var Meanbee_Shippingrules_Calculator_* $parent */
    public $parent;

    /**
     * Aggregates the results of evaluation of its children
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return bool|int|float                            Aggregated value
     */
    public abstract function evaluate($request);

    /**
     * Associates a calculator object as a child of this aggregator.
     * @param  Meanbee_Shippingrules_Calculator_Numeric|Meanbee_Shippingrules_Calculator_Boolean $child
     * @return $this
     */
    public abstract function add($child);

    /**
     * Initializes aggregator with descriptor array.
     * @param  Array                              $obj    Descriptor array.
     * @param  Meanbee_Shippingrules_Calculator_* $parent Parent object in evaluation tree.
     * @return $this
     */
    public function init($obj, &$parent) {
        $this->parent = $parent;
        foreach ($obj['children'] as $child) {
            switch ($child['register']) {
                case 'Aggregator':
                    $this->add(Meanbee_Shippingrules_Calculator_Register_Aggregator::instance()->newInstanceOf($child['combinator'], $child, $this));
                    break;
                case 'Condition':
                    $this->add(Meanbee_Shippingrules_Calculator_Register_Condition::instance()->newInstanceOf($child['key'], $child, $this));
                    break;
                case 'Term':
                    $this->add(Meanbee_Shippingrules_Calculator_Register_Term::instance()->newInstanceOf($child['key'], $child, $this));
                    break;
            }
        }
        return $this;
    }
}
