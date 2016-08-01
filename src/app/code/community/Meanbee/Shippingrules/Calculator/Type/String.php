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
        if (is_array($value) && empty(array_diff(array_keys($value), array('text', 'caseSensitive')))) {
            return ''.$value['text'];
        }
        return ''.$value;
    }

    /**
     * Gets whether a comparison should be made case-sensitively.
     * @param  mixed   $value
     * @return bool
     */
    public function isCaseSensitive($value)
    {
        if (is_array($value) && empty(array_diff(array_keys($value), array('text', 'caseSensitive')))) {
            return !!$value['caseSensitive'];
        }
        return false;
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