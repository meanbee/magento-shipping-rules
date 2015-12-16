<?php
class Meanbee_Shippingrules_Helper_Postcode extends Mage_Core_Helper_Abstract {
    const ALPHABETIC = 'str';
    const NUMERIC_BASE10 = 'b10';
    const NUMERIC_BASE26 = 'b26';
    const NUMERIC_BASE36 = 'b36';
    const CONSTANT = '';

    static public $POSTAL_CODES = array(
        array(
            'code'  => 'AU', 'name'  => 'Australia',
            'regex' => '/^(\d{4})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'AI', 'name'  => 'Anguilla',
            'regex' => '/^AI(\d{4})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'AT', 'name'  => 'Austria',
            'regex' => '/^(\d{4})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'AQ', 'name'  => 'British Antarctic Territory',
            'regex' => '/^(BIQQ)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'BE', 'name'  => 'Belgium',
            'regex' => '/^(\d{4})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'BR', 'name'  => 'Brazil',
            'regex' => '/^(\d{5})(\d{3})$/',
            'parts' => array(self::NUMERIC_BASE10, self::NUMERIC_BASE10, self::NUMERIC_BASE10)
        ), array(
            'code'  => 'CA', 'name'  => 'Canada',
            'regex' => '/^([A-Z]\d[A-Z])(\d[A-Z]\d)$/',
            'parts' => array(self::NUMERIC_BASE36, self::NUMERIC_BASE36, self::NUMERIC_BASE36)
        ), array(
            'code'  => 'DE', 'name'  => 'Germany',
            'regex' => '/^(\d{5})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'DK', 'name'  => 'Denmark',
            'regex' => '/^(\d{3,4})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'ES', 'name'  => 'Spain',
            'regex' => '/^(0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'FK', 'name'  => 'Falkland Islands',
            'regex' => '/^(FIQQ)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'FR', 'name'  => 'France',
            'regex' => '/^(\d{1,5})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'FO', 'name'  => 'Faroe Islands',
            'regex' => '/^(\d{3,4})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'GB', 'name'  => 'United Kingdom',
            'regex' => '/^([A-Z]{1,2})(\d{2}|\d[A-Z]?)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::ALPHABETIC, self::ALPHABETIC, self::NUMERIC_BASE36, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'GB+', 'name' => 'British Forces Post Office',
            'regex' => '/^(BFPO)(\d{1,4})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE10)
        ), array(
            'code'  => 'GG', 'name'  => 'Guernsey',
            'regex' => '/^(GY)(\d{2}|\d[A-Z]?)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE36, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'GI', 'name'  => 'Gibraltar',
            'regex' => '/^(GX)(\d{1,2})(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE10, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'GS', 'name'  => 'South Georgia and the South Sandwich Islands',
            'regex' => '/^(SIQQ)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'IM', 'name'  => 'Isle of Man',
            'regex' => '/^(IM)(\d{2}|\d[A-Z]?)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE36, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'HU', 'name'  => 'Hungary',
            'regex' => '/^(\d{4})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'IO', 'name'  => 'British Indian Ocean Territory',
            'regex' => '/^(BBND)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'IT', 'name'  => 'Italy',
            'regex' => '/^(\d{5})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'JE', 'name'  => 'Jersey',
            'regex' => '/^(JE)(\d{2}|\d[A-Z]?)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE36, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'JP', 'name'  => 'Japan',
            'regex' => '/^(\d{3})(\d{4})$/',
            'parts' => array(self::NUMERIC_BASE10, self::NUMERIC_BASE10, self::NUMERIC_BASE10)
        ), array(
            'code'  => 'LU', 'name'  => 'Luxembourg',
            'regex' => '/^(L)(\d{4})$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'NL', 'name'  => 'Netherlands',
            'regex' => '/^([1-9]\d{3})([A-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'SE', 'name'  => 'Sweden',
            'regex' => '/^(\d{3})(\d{2})$/',
            'parts' => array(self::NUMERIC_BASE10, self::NUMERIC_BASE10, self::NUMERIC_BASE10)
        ), array(
            'code'  => 'SH', 'name'  => 'Saint Helena, Ascension and Tristan da Cunha',
            'regex' => '/^(ASCN|STHL|TDCU)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::ALPHABETIC, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'PN', 'name'  => 'Pitcairn Islands',
            'regex' => '/^(PCRN)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'RU', 'name'  => 'Russia',
            'regex' => '/^\d{6}$/',
            'parts' => array(self::NUMERIC_BASE10)
        ), array(
            'code'  => 'TC', 'name'  => 'Turks and Caicos Islands',
            'regex' => '/^(TKCA)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(self::NUMERIC_BASE36, self::CONSTANT, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'PL', 'name'  => 'Poland',
            'regex' => '/^(\d{2})(\d{3})$/',
            'parts' => array(self::NUMERIC_BASE36, self::NUMERIC_BASE10, self::NUMERIC_BASE26)
        ), array(
            'code'  => 'US', 'name'  => 'United States of America',
            'regex' => '/^(\d{5})(\d{4}|)$/',
            'parts' => array(self::NUMERIC_BASE10, self::NUMERIC_BASE10, self::NUMERIC_BASE10)
        )
    );

    /**
     * Searches array of postal code format descriptors by country code.
     *
     * @param  string     $countryCode 2 letter country code (e.g. "GB"; United Kingdom).
     * @return array|null              Postal code format descriptor, null if no match found.
     */
    public function getPostalCodeDataByCountryCode(string $countryCode) {
        foreach (self::$POSTAL_CODES as $postalCode) {
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
        foreach (self::$POSTAL_CODES as $postalCodeData) {
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
