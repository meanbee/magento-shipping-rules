<?php
class Meanbee_Shippingrules_Calculator_Comparator_NotContain
    extends Meanbee_Shippingrules_Calculator_Comparator_Abstract
{
    public function __construct($registers)
    {
        parent::__construct($registers);
        $this->addType('string');
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
        $sanitizedValidValue = $type->sanitizeValidValue($validValue);
        $sanitizedVariableValue = $type->sanitizeVariableValue($variableValue);
        return strpos($sanitizedVariableValue, $sanitizedValidValue) === false;
    }
}