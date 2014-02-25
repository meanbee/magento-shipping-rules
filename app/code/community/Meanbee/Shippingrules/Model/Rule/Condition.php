<?php
class Meanbee_Shippingrules_Model_Rule_Condition extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {
    public function loadAttributeOptions() {
        $attributes = array(
            'store_id'       => Mage::helper('meanship')->__('Magento Store'),
            'website_id'     => Mage::helper('meanship')->__('Magento Website'),
            'is_admin_order' => Mage::helper('meanship')->__('Is an admin order'),

            'package_qty'    => Mage::helper('meanship')->__('Total Items Quantity'),
            'package_value'  => Mage::helper('meanship')->__('Subtotal'),
            'package_weight' => Mage::helper('meanship')->__('Total Weight'),

            'customer_group_id' => Mage::helper('meanship')->__('Customer Group'),

            'dest_country_id' => Mage::helper('meanship')->__('Shipping Country'),
            'dest_country_group' => Mage::helper('meanship')->__('Shipping Country Group'),
            'dest_region_id'  => Mage::helper('meanship')->__('Shipping State'),
            'dest_postcode'   => Mage::helper('meanship')->__('Shipping Zipcode')
        );

        $this->setAttributeOption($attributes);

        return $this;
    }

    public function getInputType() {
        switch ($this->getAttribute()) {
            case 'customer_group_id':
            case 'dest_country_id':
            case 'dest_country_group':
            case 'dest_region_id':
            case 'store_id':
            case 'website_id':
                return 'multiselect';
            case 'is_admin_order':
                return 'select';
            case 'dest_postcode':
                return 'string';
            default:
                return 'numeric';
        }
    }

    public function getValueElementType() {
        switch ($this->getAttribute()) {
            case 'customer_group_id':
            case 'dest_country_id':
            case 'dest_country_group':
            case 'dest_region_id':
            case 'store_id':
            case 'website_id':
                return 'multiselect';
            case 'is_admin_order':
                return 'select';
            default:
                return 'text';
        }
    }

    public function getValueSelectOptions() {
        if (!$this->hasData('value_select_options')) {
            switch ($this->getAttribute()) {
                case 'customer_group_id':
                    $options = Mage::getModel('customer/group')
                        ->getCollection()
                        ->toOptionArray();
                    break;
                case 'dest_country_id':
                    $options = Mage::getResourceModel('directory/country_collection')
                        ->loadData()
                        ->toOptionArray(false);
                    break;
                case 'dest_region_id':
                    $options = Mage::getResourceModel('directory/region_collection')
                        ->loadData()
                        ->toOptionArray(false);
                    break;
                case 'dest_country_group':
                    $options = Mage::getModel('meanship/rule_condition_source_countryGroup')
                        ->toOptionArray();
                    break;
                case 'store_id':
                    $options = Mage::getResourceModel('core/store_collection')
                        ->toOptionArray();
                    break;
                case 'website_id':
                    $options = Mage::getResourceModel('core/website_collection')
                        ->toOptionArray();
                    break;
                case 'is_admin_order':
                    $options = Mage::getModel('adminhtml/system_config_source_yesno')
                        ->toOptionArray();
                    break;
                default:
                    $options = array();
            }

            $this->setData('value_select_options', $options);
        }

        return $this->getData('value_select_options');
    }

    public function getSanitisedValue($object) {
        $value = $object->getData($this->getAttribute());

        switch ($this->getAttribute()) {
            case 'dest_postcode':
                $value = str_replace(' ', '', strtolower($value));
                break;
        }

        return $value;
    }

    public function getValueParsed() {
        $value = parent::getValueParsed();

        switch ($this->getAttribute()) {
            case 'dest_postcode':
                $value = str_replace(' ', '', strtolower($value));
                break;
            case 'is_admin_order':
                $value = ($value == '1');
                break;
        }

        return $value;
    }

    public function validate(Varien_Object $object) {
        return $this->validateAttribute($this->getSanitisedValue($object));
    }

    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }
}
