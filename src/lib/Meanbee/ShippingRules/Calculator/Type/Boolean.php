<?php
class Meanbee_Shippingrules_Calculator_Type_Boolean
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
        return (bool) +$value;
    }

    /**
     * {@inheritDoc}
     * @override
     * @param  string $value
     * @return int
     */
    public function sanitizeVariableValue($value)
    {
        return (bool) +$value;
    }
}