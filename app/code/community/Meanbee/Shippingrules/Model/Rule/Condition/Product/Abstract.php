<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Product_Abstract extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {
    public function validateProductData(Varien_Object $object, $attribute) {
        $product_data = $object->getData('product_data');

        $is_negation_rule = substr($this->getOperator(), 0, 1) == "!";
        $resultant_validation = true;

        foreach ($product_data[$attribute] as $attribute_data) {
            if ($this->validateAttribute($attribute_data)) {
                if ($is_negation_rule) {
                    $resultant_validation = $resultant_validation && true;
                } else {
                    return true;
                }
            } else {
                $resultant_validation = $resultant_validation && false;
            }
        }

        if ($is_negation_rule) {
            return $resultant_validation;
        } else {
            return false;
        }
    }
}
