<?php
class Meanbee_Shippingrules_Helper_Compat extends Mage_Core_Helper_Abstract {

    /**
     * Does the EU country support exist in this version of Magento?
     *
     * @param null $version
     *
     * @return mixed
     */
    public function isEuCountrySupported($version = null) {
        if (null == $version) {
            $version = Mage::getVersion();
        }

        return version_compare($version, '1.7', '>=');
    }
}
