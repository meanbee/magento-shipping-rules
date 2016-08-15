<?php
class Meanbee_Shippingrules_Calculator_Comparator_Equal
    extends Meanbee_Shippingrules_Calculator_Comparator_Abstract
{
    public function __construct($registers)
    {
        parent::__construct($registers);
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
        $sanitizedVariableValue = $type->sanitizeVariableValue($variableValue);
        $sanitizedValidValue = $type->sanitizeValidValue($validValue);
        if ($typeId === 'string' && !$type->isCaseSensitive($validValue)) {
            return strtolower($sanitizedVariableValue) == strtolower($sanitizedValidValue);
        }
        return $sanitizedVariableValue == $sanitizedValidValue;
    }
}