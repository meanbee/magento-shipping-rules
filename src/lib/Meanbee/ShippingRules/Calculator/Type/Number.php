<?php
class Meanbee_Shippingrules_Calculator_Type_Number
    extends Meanbee_Shippingrules_Calculator_Type_Abstract
{
    /**
     * {@inheritDoc}
     * @override
     * @param  string $value
     * @return int
     */
    public function sanitizeValidValue($value)
    {
        return +$value;
    }

    /**
     * {@inheritDoc}
     * @override
     * @param  string $value
     * @return int
     */
    public function sanitizeVariableValue($value)
    {
        return +$value;
    }
}