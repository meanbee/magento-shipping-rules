<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Product_Sku extends Meanbee_Shippingrules_Model_Rule_Condition_Product_Abstract {

    public function getAttributeName() {
        return 'Product SKU';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function getValidateObjectKey() {
        return 'package_qty';
    }

    public function validate(Varien_Object $object) {
        return $this->validateProductData($object, 'sku');
    }
}