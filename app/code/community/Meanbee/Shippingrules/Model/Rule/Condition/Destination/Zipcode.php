<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Destination_Zipcode extends Mage_Rule_Model_Condition_Abstract {

    public function getAttributeName() {
        return 'Shipping Zipcode';
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
