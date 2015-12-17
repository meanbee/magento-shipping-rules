<?php
class Meanbee_Shippingrules_Model_Config_Source_OperatorRenderType {
    const TEXTUAL = 1;
    const MATHEMATICAL = 2;
    public function toOptionArray() {
        return array(
            array(
                'label' => Mage::helper('meanship')->__('Use textual operators (e.g. less than or equal to)'),
                'value' => self::TEXTUAL
            ),
            array(
                'label' => Mage::helper('meanship')->__('Use mathematical operators (e.g. ≤)'),
                'value' => self::MATHEMATICAL
            )
        );
    }
}
