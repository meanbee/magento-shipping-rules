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

    protected function _sanitise($str) {
        return str_replace(' ', '', strtolower($str));
    }

    public function getValueParsed() {
        if (!$this->hasValueParsed()) {
            $value = $this->getData('value');
            $this->setValueParsed($this->_sanitise($value));
        }

        return $this->getData('value_parsed');
    }

    public function validate(Varien_Object $object) {
        return $this->validateAttribute(
            $this->_sanitise($object->getData($this->getAttribute()))
        );
    }
}
