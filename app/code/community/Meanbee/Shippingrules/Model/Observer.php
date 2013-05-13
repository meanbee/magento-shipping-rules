<?php
class Meanbee_ShippingRules_Model_Observer
{
    public function salesQuoteConfigGetProductAttributes(Varien_Event_Observer $event) {
        /** @var Varien_Object $attributes */
        $attributes = $event->getAttributes();

        $productAttrs = Mage::getResourceModel('catalog/product_attribute_collection');

        $productAttrs->addVisibleFilter();
        $productAttrs->addFieldToFilter('additional_table.is_used_for_promo_rules', array('gt' => 0));
        foreach ($productAttrs as $productAttr) {
        /** $productAttr Mage_Catalog_Model_Resource_Eav_Attribute */
            $attributes[$productAttr->getAttributeCode()] = '';
        }
        return $attributes;
    }
}
