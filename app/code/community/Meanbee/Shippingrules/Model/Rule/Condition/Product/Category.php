<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Product_Category extends Meanbee_Shippingrules_Model_Rule_Condition_Product_Abstract {
    protected $_inputType = 'grid';

    public function getValueElementType() {
        return 'multiselect';
    }

    public function getAttributeName() {
        return 'Product Category';
    }

    public function getAttribute() {
        return 'category';
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }

    public function getValueSelectOptions() {
        $collection = Mage::getModel('catalog/category')->getCollection();
        $collection->addAttributeToSelect('name')->addIsActiveFilter();
        $options = array();

        foreach ($collection as $category) {
            if ($category->getName() != "") { // to skip blank category name
                $options[] = array(
                    'label' => $category->getName(),
                    'value' => $category->getId()
                );
            }
        }

        return $options;
    }

    public function validate(Varien_Object $object) {
        return $this->validateProductData($object, 'category');
    }
}