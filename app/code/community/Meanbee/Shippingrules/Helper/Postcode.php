<?php
class Meanbee_Shippingrules_Helper_Postcode extends Mage_Core_Helper_Abstract {
    const ALPHABETIC = 'str';     // Postcode part should be considered as a string.
    const NUMERIC_BASE10 = 'b10'; // Postcode part should be considered as a decimal integer.
    const NUMERIC_BASE26 = 'b26'; // Postcode part should be considered as a hexavigesimal integer.
    const NUMERIC_BASE36 = 'b36'; // Postcode part should be considered as a hexatrigesimal integer.
    const CONSTANT = '';          // Postcode part should not be considered for solitary comparison since it is constant for the format.
    /**
     * For example, the GB postcode is one of the formats:
     * AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
     * where 9 represents a character in the range 0..9 and A represent a character
     * in the range A..Z.
     *
     * Take the example cases BA1 1EF and N1P 7EG.
     * The GB postcode is subdivided into the sections:
     * Outward Code (BA1, N1P) and Inward Code (1EF, 7EG).
     * Outward Code is subdivided into the sections:
     * Postcode Area (BA, N) and Postcode District (1, 1P).
     * Inward Code is subdivided into the sections:
     * Postcode Sector (1, 7) and Postcode Unit (EF, EG).
     *
     * Therefore, the GB format postal code is considered in the 4 parts:
     * Postcode Area, Postcode District, Postcode Sector and Postcode Unit.
     *
     * For Postcode District, Postcode Sector and Postcode Unit is makes sense to
     * compare them numerically, as such they are considered as NUMERIC_BASE36,
     * NUMERIC_BASE10 and NUMERIC_BASE26 respectively. It does not make sense to
     * compare Postcode Area numerically and so it is considered as ALPHABETIC.
     *
     * NUMERIC_* parts have operators: greater than, less than, etc.
     * ALPHABETIC parts have operators: begins with, ends with, matches regex, etc.
     * CONSTANT parts do not have any operators since any unnegatedcomparison would
     * return true.
     */

    /**
     * Loads postal code format descriptors from JSON file.
     *
     * @return array Postal code format descriptor array.
     */
    public function getPostalCodeData() {
        if (isset($this->_postalCodeData)) {
            return $this->_postalCodeData;
        }
        $json = file_get_contents(Mage::getBaseDir().'/js/meanbee/shippingrules/postalcode_formats.json');
        $this->_postalCodeData = Zend_Json::decode($json, true);
        return $this->_postalCodeData;
    }

    /**
     * Searches array of postal code format descriptors by country code.
     *
     * @param  string     $countryCode 2 letter country code (e.g. "GB"; United Kingdom).
     * @return array|null              Postal code format descriptor, null if no match found.
     */
    public function getPostalCodeDataByCountryCode($countryCode) {
        foreach ($this->getPostalCodeData() as $postalCode) {
            if (strtoupper($postalCode['code']) === strtoupper($countryCode)) {
                return $postalCode;
            }
        }
        return null;
    }

    /**
     * @deprecated Remove next major version.
     *
     * @param $postcode
     * @return string
     */
    public function extractUKPostcodePrefix($postcode) {
        $postcode = $this->sanitisePostcode($postcode);

        if ($this->isValidPostalCode($postcode, 'GB')) {
            return substr($postcode, 0, strlen($postcode) - 3);
        }

        return '';
    }

    /**
     * Checks validity of postal code.
     *
     * @param string $postalCode       Postal code to be validated.
     * @param string $countryCode=null Country code indicating format to match against.
     * @param array  &$matches         Array to fill with result of regex execution.
     * @return boolean|array|null      Returns validity of postal code if format is known.
     *                                 Returns array of valid formats if no country code is provided.
     *                                 Else returns null.
     */
    public function isValidPostalCode($postalCode, $countryCode = null, &$matches = array()) {
        $postalCode = $this->sanitisePostcode($postalCode);
        if ($countryCode !== null) {
            $postalCodeData = $this->getPostalCodeDataByCountryCode($countryCode);
            if ($postalCodeData === null) return null;
            return (bool) preg_match($postalCodeData['regex'], $postalCode, $matches);
        }
        $countryCodes = array();
        foreach ($this->getPostalCodeData() as $postalCodeData) {
            if ((bool) preg_match($postalCodeData['regex'], $postalCode, $matches)) {
                array_push($countryCodes, $postalCodeData['code']);
            }
        }
        return $countryCodes;
    }

    /**
     * @deprecated Remove next major version.
     * @see $this->isValidPostalCode
     *
     * @param  string  $postcode
     * @return boolean
     */
    public function isValidPostcode($postcode) {
        $postcode = $this->sanitisePostcode($postcode);
        $postcode_length = strlen($postcode);

        if ($postcode_length > 8 || $postcode_length < 5) {
            return false;
        }

        return (boolean) preg_match('/^([a-z]{2}\d[a-z]|[a-z]\d[a-z]|[a-z]\d|[a-z]\d{2}|[a-z]{2}\d|[a-z]{2}\d{2})\d[a-z]{2}$/i', $postcode) === 1;
    }

    /**
     * Removes space and dash characters from postal code.
     *
     * @param string $postalCode
     * @return string
     */
    public function sanitisePostcode($postalCode) {
        if (is_array($postalCode)) {
            return array_map(array($this, 'sanitisePostcode'), $postalCode);
        }
        return preg_replace('/\s+/', '', str_replace(array('-', '-', '‒', '–', '—', '―'), '', strtoupper($postalCode)));
    }

    /**
     * Converts numbers from a base-26 or base-36 poscode encoding to base-10.
     *
     * @param string $subject
     * @param int    $fromBase
     * @return int
     */
    public function toBase10($subject, $fromBase) {
        if ($fromBase == 26) {
            $map = array(
                'A' => '0', 'B' => '1', 'C' => '2', 'D' => '3',
                'E' => '4', 'F' => '5', 'G' => '6', 'H' => '7',
                'I' => '8', 'J' => '9', 'K' => 'A', 'L' => 'B',
                'M' => 'C', 'N' => 'D', 'O' => 'E', 'P' => 'F',
                'Q' => 'G', 'R' => 'H', 'S' => 'I', 'T' => 'J',
                'U' => 'K', 'V' => 'L', 'W' => 'M', 'X' => 'N',
                'Y' => 'O', 'Z' => 'P'
            );
            $subjectArr = str_split($subject, 1);
            $subject = '';
            foreach ($subjectArr as $char) {
                $subject .= $map[$char];
            }
        }
        return (int) base_convert($subject, $fromBase, 10);
    }
}
