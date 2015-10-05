<?php
class Meanbee_Shippingrules_Model_Config_Source_CountryCondensation {
    public function toOptionArray() {
        return array(
            array(
                'label' => Mage::helper('meanship')->__('Show country names in full'),
                'value' => 'full'
            ),
            array(
                'label' => Mage::helper('meanship')->__('Condense to country codes'),
                'value' => 'code'
            ),
            array(
                'label' => Mage::helper('meanship')->__('Condense to regional identifiers (flags)'),
                'value' => 'flag'
            )
        );
    }
}
