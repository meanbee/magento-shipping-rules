<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Product_Abstract extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {
    /**
     * @param Varien_Object $object
     * @param $attribute
     *
     * @return bool
     */
    public function validateProductData(Varien_Object $object, $attribute) {
        $product_data = $object->getData('product_data');
        $cart_product_values = $product_data[$attribute];

        if (!is_array($cart_product_values)) {
            $cart_product_values = array($cart_product_values);
        }

        foreach ($cart_product_values as $cart_product_value) {
            if ($this->validateAttribute($cart_product_value)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return array|float|int|string|void
     */
    public function getValueParsed() {
        $value = parent::getValueParsed();

        if ($this->isArrayOperatorType() && !is_array($value)) {
            return array($value);
        }

        return $value;
    }
}
