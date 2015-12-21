<?php
class Meanbee_Shippingrules_Helper_Country extends Mage_Core_Helper_Data {

    /**
     * Converts all letters in range A-Z in passed string to their respective
     * Regional Indicator symbol. Intended for the purpose of converting country
     * codes into flags.
     * @link wki.pe/Regional_Indicator_Symbol
     *
     * @param  String $plaintext County Code(s)
     * @return String            Regional Indicator Symbols
     */
    public function toRegionalIndicatorSymbols ($plaintext){
        $regionalIndicatorSymbols = '';
        $strlen = strlen($plaintext);
        $uctext = strtoupper($plaintext);
        for ($i = 0; $i < $strlen; $i++) { // For each character in string
            $ucchar = substr($uctext, $i, 1);
            $char = substr($plaintext, $i, 1);
            $codepoint = ord($char);
            if ($codepoint >= ord('A') && $codepoint <= ord('Z')) { // If character in range A-Z
                $regionalIndicatorSymbols .= html_entity_decode('&#' . (127462 + $codepoint - ord('A')) . ';'); // Create character for respective Regional Indicator Symbol
            } else { // Else
                $regionalIndicatorSymbols .= $char; // Use original character
            }
        }
        return $regionalIndicatorSymbols;
    }
}
