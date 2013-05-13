<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Product_Subselect extends Mage_SalesRule_Model_Rule_Condition_Product_Subselect {
    public function __construct() {
        parent::__construct();
        $this->setType('meanship/rule_condition_product_subselect')
            ->setValue(null);
    }


    public function loadAttributeOptions()
    {
        $hlp = Mage::helper('salesrule');
        $attributes = array(
            'qty'  => $hlp->__('total quantity'),
            'base_row_total'  => $hlp->__('total amount'),
        );

        $productAttributes = Mage::getResourceSingleton('catalog/product')
           ->loadAllAttributes()
           ->getAttributesByCode();
        $allowedInputTypes = array('text', 'boolean', 'price');
        $allowedTextValidations = array('validate-number', 'validate-digits');

        foreach ($productAttributes as $attribute) {
           /* @var $attribute Mage_Catalog_Model_Resource_Eav_Attribute */
           if (!$attribute->getIsVisible()
               || !in_array($attribute->getFrontendInput(), $allowedInputTypes)
               || !$attribute->getDataUsingMethod('is_used_for_promo_rules')
               || ($attribute->getFrontendInput() == 'text' && ! in_array($attribute->getFrontendClass(), $allowedTextValidations))
           ) {
               continue;
           }

           $attributes[$attribute->getAttributeCode()] = $hlp->__('Sum of attribute: %s',$attribute->getFrontendLabel());
        }

        asort($attributes);
        $this->setAttributeOption($attributes);

        return $this;
    }


    /**
     * validate
     *
     * @param Varien_Object $object Quote
     * @return boolean
     */
    public function validate(Varien_Object $object) {
        if (!$this->getConditions()) {
            return false;
        }

        $attr = $this->getAttribute();
        $total = 0;
        foreach ($object->getData('all_items') as $item) {
            /** @var $item Mage_Sales_Model_Quote_Item */
            if ($this->_validateItem($item)) {
                if ($item->getData($attr)) {
                    $total += (float) $item->getData($attr);
                } elseif ($item->getProduct() instanceof Mage_Catalog_Model_Product) {
                    $product = Mage::getModel('catalog/product')->load($item->getProduct()->getId());
                    $total += (float) $product->getData($attr) * $item->getQty();
                }
            }
        }

        return $this->validateAttribute($total);
    }

    /**
     * From Mage_Rule_Model_Condition_Combine::validate().
     *
     * @param Varien_Object $object
     *
     * @return bool
     */
    protected function _validateItem(Varien_Object $object) {
        if (!$this->getConditions()) {
            return true;
        }

        $all = $this->getAggregator() === 'all';

        foreach ($this->getConditions() as $cond) {
            /** @var Mage_SalesRule_Model_Rule_Condition_Product $cond */
            $validated = $cond->validate($object);

            if ($all && $validated !== true) {
                return false;
            } elseif (!$all && $validated === true) {
                return true;
            }
        }
        return $all ? true : false;
    }
}