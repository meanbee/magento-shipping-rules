<?php
class Meanbee_Shippingrules_Helper_Postcode extends Mage_Core_Helper_Abstract {
    static protected $_VALID_POSTCODE_REGEX = '/^([a-z]{2}\d[a-z]|[a-z]\d[a-z]|[a-z]\d|[a-z]\d{2}|[a-z]{2}\d|[a-z]{2}\d{2})\d[a-z]{2}$/i';

    /**
     * @param $postcode
     *
     * @return string
     */
    public function extractUKPostcodePrefix($postcode) {
        $postcode = $this->sanitisePostcode($postcode);

        if ($this->isValidPostcode($postcode)) {
            return substr($postcode, 0, strlen($postcode) - 3);
        }

        return '';
    }

    /**
     * @param $postcode
     *
     * @return bool
     */
    public function isValidPostcode($postcode) {
        $postcode = $this->sanitisePostcode($postcode);
        $postcode_length = strlen($postcode);

        if ($postcode_length > 8 || $postcode_length < 5) {
            return false;
        }

        return preg_match(self::$_VALID_POSTCODE_REGEX, $postcode) === 1;
    }

    /**
     * @param $postcode
     *
     * @return mixed
     */
    public function sanitisePostcode($postcode) {
        return str_replace(' ', '', strtolower($postcode));
    }
}
