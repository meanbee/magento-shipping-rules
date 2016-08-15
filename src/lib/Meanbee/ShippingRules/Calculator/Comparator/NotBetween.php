<?php
class Meanbee_Shippingrules_Calculator_Comparator_NotBetween
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
        if (!(is_array($validValue) && count($validValue) === 2)) return false;
        sort($validValue);
        $min = $validValue[0];
        $max = $validValue[1];
        $sanitizedVariableValue = $type->sanitizeVariableValue($variableValue);
        return $type->sanitizeValidValue($min) > $sanitizedVariableValue || $sanitizedVariableValue > $type->sanitizeValidValue($max);
    }
}