<?php
class Meanbee_Shippingrules_Calculator_Comparator_NotBegin
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
     * @return bool
     */
    public function evaluate($validValue, $variableValue, $typeId) {
        $type = $this->getType($typeId);
        $sanitizedValidValue = $type->sanitizeValidValue($validValue);
        $sanitizedVariableValue = $type->sanitizeVariableValue($variableValue);
        if ($typeId === 'string' && !$type->isCaseSensitive($validValue)) {
            $sanitizedValidValue = strtolower($sanitizedValidValue);
            $sanitizedVariableValue = strtolower($sanitizedVariableValue);
        }
        return strpos($sanitizedVariableValue, $sanitizedValidValue) !== 0;
    }
}