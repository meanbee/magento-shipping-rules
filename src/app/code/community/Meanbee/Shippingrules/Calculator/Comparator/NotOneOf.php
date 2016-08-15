<?php
class Meanbee_Shippingrules_Calculator_Comparator_NotOneOf
    extends Meanbee_Shippingrules_Calculator_Comparator_Abstract
{
    public function __construct($registers)
    {
        parent::__construct($registers);
        $this->addType('enum');
        $this->addType('number');
        $this->addType('number_base26');
        $this->addType('number_base36');
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
        $sanitizedValidValue = array_map(array($type, 'sanitizeValidValue'), $validValue);
        $sanitizedVariableValue = $type->sanitizeVariableValue($variableValue);
        if ($typeId === 'string' && !$type->isCaseSensitive($validValue)) {
            $sanitizedValidValue = array_map('strtolower', $sanitizedValidValue);
            $sanitizedVariableValue = strtolower($sanitizedVariableValue);
        }
        return !in_array($sanitizedVariableValue, $sanitizedValidValue);
    }
}