<?php
abstract class Meanbee_Shippingrules_Model_Rule_Condition_Numeric extends Mage_Rule_Model_Condition_Abstract {

    protected $_inputType = 'numeric';

    abstract public function getValidateObjectKey();

    public function validate(Varien_Object $object) {
        $obj_value = $object->getData($this->getValidateObjectKey());

        if ($obj_value) {
            $operation = $this->getOperatorForValidate();
            $value = $this->getValue();

            switch ($operation) {
                case '==':
                    return $obj_value == $value;
                case '!=':
                    return $obj_value != $value;
                case '>':
                    return $obj_value > $value;
                case '<':
                    return $obj_value < $value;
                case '<=':
                    return $obj_value <= $value;
                case '>=':
                    return $obj_value >= $value;
            }
        }

        return false;
    }
}