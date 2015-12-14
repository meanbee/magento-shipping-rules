<?php
class Meanbee_Shippingrules_Model_Rule_Condition extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {
    public function loadAttributeOptions() {
        $attributes = array(
            'store_id'       => Mage::helper('meanship')->__('Magento Store'),
            'website_id'     => Mage::helper('meanship')->__('Magento Website'),
            'is_admin_order' => Mage::helper('meanship')->__('Is an admin order'),

            'package_qty'    => Mage::helper('meanship')->__('Total Items Quantity'),
            'package_value'  => Mage::helper('meanship')->__('Subtotal excl. Tax'),
            'base_subtotal_incl_tax' => Mage::helper('meanship')->__('Subtotal incl. Tax'),
            'package_value_with_discount' => Mage::helper('meanship')->__('Subtotal after Discounts'),
            'package_weight' => Mage::helper('meanship')->__('Total Weight'),

            'customer_group_id' => Mage::helper('meanship')->__('Customer Group'),

            'dest_country_id' => Mage::helper('meanship')->__('Shipping Country'),
            'dest_country_group' => Mage::helper('meanship')->__('Shipping Country Group'),
            'dest_region_id'  => Mage::helper('meanship')->__('Shipping State'),
            // 'dest_postcode'   => Mage::helper('meanship')->__('Shipping Zipcode'),
            // 'dest_postcode_numeric' => Mage::helper('meanship')->__('Shipping Zip Code (if numeric value)'),
            // 'dest_postcode_prefix' => Mage::helper('meanship')->__('Shipping Postcode (UK only) Prefix'),

            'dest_postal_code_p0_str' => Mage::helper('meanship')->__('Entire Postal Code'),
            'dest_postal_code_p0_b26' => Mage::helper('meanship')->__('Entire Postal Code [A-Z]'),
            'dest_postal_code_p0_b10' => Mage::helper('meanship')->__('Entire Postal Code [0-9]'),
            'dest_postal_code_p0_b36' => Mage::helper('meanship')->__('Entire Postal Code [0-9, A-Z]'),
            'dest_postal_code_p1_str' => Mage::helper('meanship')->__('1st Part [A-Z]'),
            'dest_postal_code_p1_b26' => Mage::helper('meanship')->__('1st Part [A-Z]'),
            'dest_postal_code_p1_b10' => Mage::helper('meanship')->__('1st Part [0-9]'),
            'dest_postal_code_p1_b36' => Mage::helper('meanship')->__('1st Part [0-9, A-Z]'),
            'dest_postal_code_p2_str' => Mage::helper('meanship')->__('2nd Part [A-Z]'),
            'dest_postal_code_p2_b26' => Mage::helper('meanship')->__('2nd Part [A-Z]'),
            'dest_postal_code_p2_b10' => Mage::helper('meanship')->__('2nd Part [0-9]'),
            'dest_postal_code_p2_b36' => Mage::helper('meanship')->__('2nd Part [0-9, A-Z]'),
            'dest_postal_code_p3_str' => Mage::helper('meanship')->__('3rd Part [A-Z]'),
            'dest_postal_code_p3_b26' => Mage::helper('meanship')->__('3rd Part [A-Z]'),
            'dest_postal_code_p3_b10' => Mage::helper('meanship')->__('3rd Part [0-9]'),
            'dest_postal_code_p3_b36' => Mage::helper('meanship')->__('3rd Part [0-9, A-Z]'),
            'dest_postal_code_p4_str' => Mage::helper('meanship')->__('4th Part [A-Z]'),
            'dest_postal_code_p4_b26' => Mage::helper('meanship')->__('4th Part [A-Z]'),
            'dest_postal_code_p4_b10' => Mage::helper('meanship')->__('4th Part [0-9]'),
            'dest_postal_code_p4_b36' => Mage::helper('meanship')->__('4th Part [0-9, A-Z]')
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
            case 'dest_postal_code_p0_str':
            case 'dest_postal_code_p1_str':
            case 'dest_postal_code_p2_str':
            case 'dest_postal_code_p3_str':
            case 'dest_postal_code_p4_str':
            case 'dest_postcode':
            case 'dest_postcode_prefix':
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
            case 'dest_postcode_prefix':
                $value = Mage::helper('meanship/postcode')->sanitisePostcode($value);
                break;
        }

        return $value;
    }

    public function getValueParsed() {
        $value = parent::getValueParsed();

        switch ($this->getAttribute()) {
            case 'dest_postcode':
            case 'dest_postcode_prefix':
                $value = Mage::helper('meanship/postcode')->sanitisePostcode($value);
                break;
            case 'is_admin_order':
                $value = ($value == '1');
                break;
            case 'dest_postcode_numeric':
                $value = (is_array($value)) ? array_map("intval", $value) : intval($value);
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
