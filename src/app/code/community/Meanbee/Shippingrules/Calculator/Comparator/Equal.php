<?php
class Meanbee_Shippingrules_Calculator_Comparator_Equal
    extends Meanbee_Shippingrules_Calculator_Comparator_Abstract
{
    public function __construct($registers)
    {
        parent::__construct($registers);
        $this->addType('number');
    }

    /**
     * {@inheritdoc}
     * @param  mixed   $validValue    Admin configured value
     * @param  mixed   $variableValue From Shipping Rate Request
     * @param  string  $type
     * @return boolean
     */
    public function evaluate($validValue, $variableValue, $type) {
        return $validValue == $variableValue;
    }
}