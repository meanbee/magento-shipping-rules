<?php
abstract class Meanbee_Shippingrules_Model_Rule_Condition_Numeric extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {

    protected $_inputType = 'numeric';

    abstract public function getValidateObjectKey();

    public function validate(Varien_Object $object) {
        $obj_value = $object->getData($this->getValidateObjectKey());

        if ($obj_value && is_numeric($obj_value)) {
            $operation = $this->getOperator();
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