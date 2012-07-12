<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Customer_Group extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {

    protected $_inputType = 'grid';

    public function getValueElementType() {
        return 'multiselect';
    }

    public function getAttributeName() {
        return 'Customer Group';
    }

    public function getAttribute() {
        return 'customer_group_id';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function getValueSelectOptions() {
        return Mage::getModel('customer/group')->getCollection()->toOptionArray();
    }
}
