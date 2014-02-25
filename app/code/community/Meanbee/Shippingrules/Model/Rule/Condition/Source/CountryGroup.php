<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Source_CountryGroup {
    public function toOptionArray() {
        return array(
            array(
                'label' => Mage::helper('meanship')->__('European Union'),
                'value' => 'eu'
            )
        );
    }
}
