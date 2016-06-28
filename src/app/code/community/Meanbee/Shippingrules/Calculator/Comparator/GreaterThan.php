<?php
class Meanbee_Shippingrules_Calculator_Comparator_GreaterThan
    extends Meanbee_Shippingrules_Calculator_Comparator_Abstract
{
    public function __construct($registers)
    {
        parent::__construct($registers);
        $this->addType('number');
        $this->addType('number_base26');
        $this->addType('number_base36');
    }

    /**
     * {@inheritdoc}
     * @param  mixed   $validValue    Admin configured value
     * @param  mixed   $variableValue From Shipping Rate Request
     * @param  string  $typeId
     * @return boolean
     */
    public function evaluate($validValue, $variableValue, $typeId) {
        $type = $this->getType($typeId);
        return $type->sanitizeVariableValue($variableValue) > $type->sanitizeValidValue($validValue);
    }
}