<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Weight extends Mage_Rule_Model_Condition_Abstract {
    public function getAttributeName() {
        return 'Cart Weight';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function getOperatorSelectOptions() {
        $operators = array(
            'greater than or equal to' => '>=',
            'greater than' => '>',
            'less than or equal to' => '<=',
            'less than' => '<'
        );

        $return = array();

        foreach ($operators as $key => $value) {
            $return[] = array(
                'label' => $key,
                'value' => $value
            );
        }

        return $return;
    }

    public function validate(Varien_Object $object) {
        return true;
    }
}
