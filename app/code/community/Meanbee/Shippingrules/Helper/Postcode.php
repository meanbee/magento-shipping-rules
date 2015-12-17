<?php
class Meanbee_Shippingrules_Helper_Postcode extends Mage_Core_Helper_Abstract {
    const ALPHABETIC = 'str';     // Postcode part should be considered as a string.
    const NUMERIC_BASE10 = 'b10'; // Postcode part should be considered as a decimal integer.
    const NUMERIC_BASE26 = 'b26'; // Postcode part should be considered as a hexavigesimal integer.
    const NUMERIC_BASE36 = 'b36'; // Postcode part should be considered as a hexatrigesimal integer.
    const CONSTANT = '';          // Postcode part should not be cosidered for solitary comparison since it is constant for the format.

    /**
     * Loads postal code format descriptors from JSON file.
     *
     * @return array Postal code format descriptor array.
     */
    public function getPostalCodeData() {
        if (isset($this->_postalCodeData)) {
            return $this->_postalCodeData;
        }
        $json = file_get_contents(Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_JS).'meanbee/shippingrules/postalcode_formats.json');
        $this->_postalCodeData = json_decode($json, true);
        return $this->_postalCodeData;
    }

    /**
     * Searches array of postal code format descriptors by country code.
     *
     * @param  string     $countryCode 2 letter country code (e.g. "GB"; United Kingdom).
     * @return array|null              Postal code format descriptor, null if no match found.
     */
    public function getPostalCodeDataByCountryCode(string $countryCode) {
        foreach ($this->getPostalCodeData() as $postalCode) {
            if ($postalCode['code'] === $countryCode) {
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
    public function isValidPostalCode(string $postalCode, string $countryCode = null, array &$matches) {
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
     * Removes space and dash characters from postal code.
     *
     * @param string $postalCode
     * @return string
     */
    public function sanitisePostcode(string $postalCode) {
        return preg_replace('/\s+/', '', str_replace(array('-', '-', '‒', '–', '—', '―'), '', strtoupper($postalCode)));
    }

    /**
     * Converts numbers from a base-26 or base-36 poscode encoding to base-10.
     *
     * @param string $subject
     * @param int    $fromBase
     * @return int
     */
    public function toBase10(string $subject, int $fromBase) {
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
        return (int) base_convert($subject, $frombase, 10);
    }
}
