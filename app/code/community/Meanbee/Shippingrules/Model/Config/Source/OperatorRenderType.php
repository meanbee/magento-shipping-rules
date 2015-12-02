<?php
class Meanbee_Shippingrules_Model_Config_Source_OperatorRenderType {
    public function toOptionArray() {
        return array(
            array(
                'label' => Mage::helper('meanship')->__('Use textual operators (e.g. less than or equal to)'),
                'value' => 'textual'
            ),
            array(
                'label' => Mage::helper('meanship')->__('Use mathematical operators (e.g. ≤)'),
                'value' => 'mathematical'
            )
        );
    }
}
