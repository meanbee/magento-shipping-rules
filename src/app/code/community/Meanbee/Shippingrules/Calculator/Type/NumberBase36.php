<?php
class Meanbee_Shippingrules_Calculator_Type_NumberBase36
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
        return (int) $this->hexatrigesimalToDecimal($value);
    }

    /**
     * {@inheritDoc}
     * @override
     * @param  string $value
     * @return int
     */
    public function sanitizeVariableValue($value)
    {
        return (int) $this->hexatrigesimalToDecimal($value);
    }
    
    protected function hexatrigesimalToDecimal($base36) {
        $base36 = strtoupper($base36);
        $base10 = base_convert($base36, 36, 10);
        return $base10;
    }
}