<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Destination_Zipcode extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {

    public function getAttributeName() {
        return 'Shipping Zipcode';
    }

    public function getAttribute() {
        return 'dest_postcode';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }
}
