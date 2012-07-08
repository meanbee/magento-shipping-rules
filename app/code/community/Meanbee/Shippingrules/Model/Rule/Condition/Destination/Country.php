<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Destination_Country extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {

    protected $_inputType = 'grid';

    public function getValueElementType() {
        return 'multiselect';
    }

    public function getAttributeName() {
        return 'Shipping Country';
    }

    public function getAttribute() {
        return 'dest_country_id';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function getValueSelectOptions() {
        return Mage::getResourceModel('directory/country_collection')
            ->loadData()
            ->toOptionArray(false);
    }
}
