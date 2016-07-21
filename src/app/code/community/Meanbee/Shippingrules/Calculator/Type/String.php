<?php
class Meanbee_Shippingrules_Calculator_Type_String
    extends Meanbee_Shippingrules_Calculator_Type_Abstract
{
    /**
     * {@inheritDoc}
     * @override
     * @param  mixed $value
     * @return string
     */
    public function sanitizeValidValue($value)
    {
        return ''.$value;
    }

    /**
     * {@inheritDoc}
     * @override
     * @param  mixed $value
     * @return string
     */
    public function sanitizeVariableValue($value)
    {
        return ''.$value;
    }
}