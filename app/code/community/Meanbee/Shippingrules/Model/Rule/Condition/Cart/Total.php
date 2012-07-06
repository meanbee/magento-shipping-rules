<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Cart_Total extends Meanbee_Shippingrules_Model_Rule_Condition_Numeric {

    public function getAttributeName() {
        return 'Cart Total';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function getValidateObjectKey() {
        return 'package_value';
    }
}
