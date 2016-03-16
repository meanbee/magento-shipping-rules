<?php
class Meanbee_Shippingrules_Helper_Data extends Mage_Core_Helper_Data {

    public function isValidRegex($regex) {
        $trackErrors = ini_get('track_errors');
        ini_set('track_errors', 'on');
        $php_errormsg = '';
        @preg_match($regex, '');
        ini_set('track_errors', $trackErrors);
        return $php_errormsg == "";
    }
}