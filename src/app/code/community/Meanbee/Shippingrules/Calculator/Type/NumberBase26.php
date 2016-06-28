<?php
class Meanbee_Shippingrules_Calculator_Type_NumberBase26
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
        return (int) $this->alphaHexavigesimalToDecimal($value);
    }

    /**
     * {@inheritDoc}
     * @override
     * @param  string $value
     * @return int
     */
    public function sanitizeVariableValue($value)
    {
        return (int) $this->alphaHexavigesimalToDecimal($value);
    }

    protected function alphaHexavigesimalToHexavigesimal($alpha26)
    {
        $alpha26 = strtoupper($alpha26);
        $map = array(
            'A' => '0', 'B' => '1', 'C' => '2', 'D' => '3',
            'E' => '4', 'F' => '5', 'G' => '6', 'H' => '7',
            'I' => '8', 'J' => '9', 'K' => 'A', 'L' => 'B',
            'M' => 'C', 'N' => 'D', 'O' => 'E', 'P' => 'F',
            'Q' => 'G', 'R' => 'H', 'S' => 'I', 'T' => 'J',
            'U' => 'K', 'V' => 'L', 'W' => 'M', 'X' => 'N',
            'Y' => 'O', 'Z' => 'P'
        );
        $charArray = str_split($alpha26, 1);
        $base26 = '';
        foreach ($charArray as $char) $base26 .= $map[$char];
        return $base26;
    }

    protected function hexavigesimalToDecimal($base26) {
        $base26 = strtoupper($base26);
        $base10 = base_convert($base26, 26, 10);
        return $base10;
    }

    protected function alphaHexavigesimalToDecimal($alpha26) {
        $base26 = $this->alphaHexavigesimalToHexavigesimal($alpha26);
        $base10 = $this->hexavigesimalToDecimal($base26);
        return $base10;
    }
}