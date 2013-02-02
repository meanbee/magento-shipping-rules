<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Product_Attributeset extends Meanbee_Shippingrules_Model_Rule_Condition_Product_Abstract {
    protected $_inputType = 'grid';

    public function getValueElementType() {
        return 'multiselect';
    }

    public function getAttributeName() {
        return 'Cart contains product with at least one of the Attribute Sets';
    }

    public function getAttribute() {
        return 'attribute_set';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function getValueSelectOptions() {
        $collection = Mage::getResourceModel('eav/entity_attribute_set_collection')->load();
        $options = array();

        foreach ($collection as $attribute_set) {
            /** @var $attribute_set Mage_Eav_Model_Entity_Attribute_Set */

            if ($attribute_set->getEntityTypeId() != 4) {
                continue;
            }

            $options[] = array(
                'label' => $attribute_set->getAttributeSetName(),
                'value' => $attribute_set->getAttributeSetId()
            );
        }

        return $options;
    }

    public function validate(Varien_Object $object) {
        return $this->validateProductData($object, 'attribute_set');
    }
}