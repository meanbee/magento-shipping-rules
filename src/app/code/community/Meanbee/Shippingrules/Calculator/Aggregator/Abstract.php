<?php
abstract class Meanbee_Shippingrules_Calculator_Aggregator_Abstract
{
    /**
     * Aggregates the results of evaluation of its children
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return bool|int|float|array                      Aggregated value
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
     * @param  Array                                      $obj    Descriptor array.
     * @param  Meanbee_Shippingrules_Calculator_Registers $registers
     * @return $this
     */
    public function init($obj, $registers) {
        foreach ($obj['children'] as $child) {
            switch ($child['register']) {
                case 'Aggregator':
                    $this->add($registers->getAggregatorRegister()->newInstanceOf($child['combinator'], $child, $this));
                    break;
                case 'Condition':
                    $this->add($registers->getConditionRegister()->newInstanceOf($child['key'], $child, $this));
                    break;
                case 'Term':
                    $this->add($registers->getTermRegister()->newInstanceOf($child['key'], $child, $this));
                    break;
            }
        }
        return $this;
    }
}
