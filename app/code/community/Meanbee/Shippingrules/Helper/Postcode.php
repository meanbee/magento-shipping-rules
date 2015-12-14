<?php
class Meanbee_Shippingrules_Helper_Postcode extends Mage_Core_Helper_Abstract {
    const NUMERIC_BASE10 = 1;
    const NUMERIC_BASE26 = 2;
    const NUMERIC_BASE36 = 3;
    const ALPHABETIC = 4;

    static public $POSTAL_CODES = array(
        array(
            'code'  => 'AU', 'name'  => 'Australia',
            'regex' => '/^(\d{4})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'AI', 'name'  => 'Anguilla',
            'regex' => '/^AI(\d{4})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'AT', 'name'  => 'Austria',
            'regex' => '/^(\d{4})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'AQ', 'name'  => 'British Antarctic Territory',
            'regex' => '/^BIQQ(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'BIQQ'
        ), array(
            'code'  => 'BE', 'name'  => 'Belgium',
            'regex' => '/^(\d{4})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'BR', 'name'  => 'Brazil',
            'regex' => '/^(\d{5})(\d{3})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE10)
        ), array(
            'code'  => 'CA', 'name'  => 'Canada',
            'regex' => '/^([A-Z]\d[A-Z])(\d[A-Z]\d)$/',
            'parts' => array(NUMERIC_BASE36, NUMERIC_BASE36)
        ), array(
            'code'  => 'DE', 'name'  => 'Germany',
            'regex' => '/^(\d{5})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'DK', 'name'  => 'Denmark',
            'regex' => '/^(\d{3,4})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'ES', 'name'  => 'Spain',
            'regex' => '/^(0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'FK', 'name'  => 'Falkland Islands',
            'regex' => '/^FIQQ(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'FIQQ'
        ), array(
            'code'  => 'FO', 'name'  => 'Faroe Islands',
            'regex' => '/^(\d{3,4})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'GB', 'name'  => 'United Kingdom',
            'regex' => '/^([A-Z]{1,2})(\d{2}|\d[A-Z]?)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(ALPHABETIC, NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26)
        ), array(
            'code'  => 'GB+', 'name' => 'British Forces Post Office',
            'regex' => '/^BFPO(\d{1,4})$/',
            'parts' => array(NUMERIC_BASE10),
            'prefix' => 'BFPO'
        ), array(
            'code'  => 'GG', 'name'  => 'Guernsey',
            'regex' => '/^GY(\d{2}|\d[A-Z]?)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'GY'
        ), array(
            'code'  => 'GI', 'name'  => 'Gibraltar',
            'regex' => '/^GX(\d{1,2})(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'GX'
        ), array(
            'code'  => 'GS', 'name'  => 'South Georgia and the South Sandwich Islands',
            'regex' => '/^SIQQ(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'SIQQ'
        ), array(
            'code'  => 'IM', 'name'  => 'Isle of Man',
            'regex' => '/^IM(\d{2}|\d[A-Z]?)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'IM'
        ), array(
            'code'  => 'HU', 'name'  => 'Hungary',
            'regex' => '/^(\d{4})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'IO', 'name'  => 'British Indian Ocean Territory',
            'regex' => '/^BBND(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'BBND'
        ), array(
            'code'  => 'IT', 'name'  => 'Italy',
            'regex' => '/^(\d{5})$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'JE', 'name'  => 'Jersey',
            'regex' => '/^JE(\d{2}|\d[A-Z]?)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'JE'
        ), array(
            'code'  => 'JP', 'name'  => 'Japan',
            'regex' => '/^(\d{3})(\d{4})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE10)
        ), array(
            'code'  => 'LU', 'name'  => 'Luxembourg',
            'regex' => '/^L(\d{4})$/',
            'parts' => array(NUMERIC_BASE10),
            'prefix' => 'L'
        ), array(
            'code'  => 'NL', 'name'  => 'Netherlands',
            'regex' => '/^([1-9]\d{3})([A-Z]{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE26)
        ), array(
            'code'  => 'SE', 'name'  => 'Sweden',
            'regex' => '/^(\d{3})(\d{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE10)
        ), array(
            'code'  => 'SH', 'name'  => 'Saint Helena, Ascension and Tristan da Cunha',
            'regex' => '/^(ASCN|STHL|TDCU)(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(ALPHABETIC, NUMERIC_BASE10, NUMERIC_BASE26)
        ), array(
            'code'  => 'PN', 'name'  => 'Pitcairn Islands',
            'regex' => '/^PCRN(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'PCRN'
        ), array(
            'code'  => 'RU', 'name'  => 'Russia',
            'regex' => '/^\d{6}$/',
            'parts' => array(NUMERIC_BASE10)
        ), array(
            'code'  => 'TC', 'name'  => 'Turks and Caicos Islands',
            'regex' => '/^TKCA(\d)([ABD-HJLNP-UW-Z]{2})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE26),
            'prefix' => 'TKCA'
        ), array(
            'code'  => 'PL', 'name'  => 'Poland',
            'regex' => '/^(\d{2})(\d{3})$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE26)
        ), array(
            'code'  => 'US', 'name'  => 'United States of America',
            'regex' => '/^(\d{5})(\d{4}|)$/',
            'parts' => array(NUMERIC_BASE10, NUMERIC_BASE10)
        )
    );

    public function getPostalCodeDataByCountryCode($countryCode) {
        foreach (self::$POSTAL_CODES as $postalCode) {
            if ($postalCode['code'] === $countryCode) {
                return $postalCode;
            }
        }
        return null;
    }

    /**
     * @param $postcode
     *
     * @return string
     */
    public function extractUKPostcodePrefix($postcode) {
        $postcode = $this->sanitisePostcode($postcode);

        if ($this->isValidPostcode($postcode, 'GB')) {
            return substr($postcode, 0, strlen($postcode) - 3);
        }

        return '';
    }

    /**
     * @param $postcode
     * @param $countryCode null
     *
     * @return mixed
     */
    public function isValidPostcode($postalCode, $countryCode = null) {
        $postcode = $this->sanitisePostcode($postcode);
        if ($countryCode !== null) {
            $postalCodeData = getPostalCodeDataByCountryCode($countryCode);
            return preg_match($postalCodeData['regex'], $postalCode) === 1;
        }
        $countryCodes = array();
        foreach (self::$POSTAL_CODES as $postalCodeData) {
            if (preg_match($postalCodeData['regex'], $postalCode) === 1) {
                array_push($countryCodes, $postalCodeData['code']);
            }
        }
        return $countryCodes;
    }

    /**
     * @param $postcode
     *
     * @return mixed
     */
    public function sanitisePostcode($postcode) {
        return preg_replace('/\s+/', str_replace(array('-', '-', '‒', '–', '—', '―'), '', strtoupper($postcode)));
    }
}
