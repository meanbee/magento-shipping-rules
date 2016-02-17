<?php
class Meanbee_Shippingrules_Model_Config_Source_CountryCondensation {
    const VERBOSE = 1;
    const COUNTRY_CODE = 2;
    const REGIONAL_IDENTIFIERS = 3;

    public function toOptionArray() {
        return array(
            array(
                'label' => Mage::helper('meanship')->__('Show country names in full'),
                'value' => self::VERBOSE
            ),
            array(
                'label' => Mage::helper('meanship')->__('Condense to country codes'),
                'value' => self::COUNTRY_CODE
            ),
            array(
                'label' => Mage::helper('meanship')->__('Condense to regional identifiers (flags)'),
                'value' => self::REGIONAL_IDENTIFIERS
            )
        );
    }
}
