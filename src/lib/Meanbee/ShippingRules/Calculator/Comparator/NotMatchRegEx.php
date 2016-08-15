<?php
class Meanbee_Shippingrules_Calculator_Comparator_NotMatchRegEx
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
        $regex = "/{$type->sanitizeValidValue($validValue)}/u" . ($type->isCaseSensitive($validValue) ? '' : 'i');
        $result = !preg_match($regex, $type->sanitizeVariableValue($variableValue));
        return $result;
    }
}