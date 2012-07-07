<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Destination_State extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {

    protected $_inputType = 'multiselect';

    public function getValueElementType() {
        return 'multiselect';
    }

    public function getAttributeName() {
        return 'Shipping State';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function getValueSelectOptions() {
        return Mage::getResourceModel('directory/region_collection')
            ->loadData()
            ->toOptionArray(false);
    }

    public function validate(Varien_Object $object) {
        return true;
    }
}
