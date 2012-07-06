<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Cart_Count extends Mage_Rule_Model_Condition_Abstract {

    protected $_inputType = 'numeric';

    public function getAttributeName() {
        return 'Cart Item Count';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function validate(Varien_Object $object) {
        return true;
    }
}
