<?php
class Meanbee_Shippingrules_Model_Rule_Condition extends Meanbee_Shippingrules_Model_Rule_Condition_Abstract {

    /**
     * Full list of attributes that may be compared in a shipping rule condition
     *
     * @override
     *
     * @return array Associates attribute code with hypertext label.
     */
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
            'promo_free_shipping' => Mage::helper('meanship')->__('Free Shipping'),
            'promo_coupon_code' => Mage::helper('meanship')->__('Coupon'),
            'promo_applied_rule_ids' => Mage::helper('meanship')->__('Applied Cart Price Rules'),

            'payment_method' => Mage::helper('meanship')->__('Payment Method'),

            'customer_group_id' => Mage::helper('meanship')->__('Customer Group'),

            'time_time_of_day' => Mage::helper('meanship')->__('Time of Day'),
            'time_day_of_week' => Mage::helper('meanship')->__('Day of Week'),

            'dest_street_address_l1' => Mage::helper('meanship')->__('Shipping Street Address, Line 1'),
            'dest_street_address_l2' => Mage::helper('meanship')->__('Shipping Street Address, Line 2'),
            'dest_country_id' => Mage::helper('meanship')->__('Shipping Country'),
            'dest_country_group' => Mage::helper('meanship')->__('Shipping Country Group'),
            'dest_region_id'  => Mage::helper('meanship')->__('Shipping State'),

            /** @deprecated Remove next major version. { */
                'dest_postcode'   => Mage::helper('meanship')->__('Shipping Zipcode [Deprecated]'),
                'dest_postcode_numeric' => Mage::helper('meanship')->__('Shipping Zip Code (if numeric value) [Deprecated]'),
                'dest_postcode_prefix' => Mage::helper('meanship')->__('Shipping Postcode (UK only) Prefix [Deprecated]'),
            /** } */

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

    /**
     * Maps attribute code to types which describe compatible operators.
     *
     * @see Meanbee_Shippingrules_Model_Rule_Condition_Abstract->getDefaultOperatorInputByType
     * @override
     *
     * @return string Operator list key.
     */
    public function getInputType() {
        $matches = array();
        if (preg_match('/^dest_postal_code_p[0-4]_(str|b10|b26|b36)$/', $this->getAttribute(), $matches)) {
            switch ($matches[1]) {
                case Meanbee_Shippingrules_Helper_Postcode::ALPHABETIC:
                    return 'string';
                case Meanbee_Shippingrules_Helper_Postcode::NUMERIC_BASE10:
                    return 'numeric';
                default:
                    return "numeric_{$matches[1]}";
            }
        }
        switch ($this->getAttribute()) {
            case 'customer_group_id':
            case 'dest_country_id':
            case 'dest_country_group':
            case 'dest_region_id':
            case 'promo_coupon_code':
            case 'promo_applied_rule_ids':
            case 'store_id':
            case 'website_id':
            case 'payment_method':
            case 'time_day_of_week':
                return 'multiselect';
            case 'is_admin_order':
            case 'promo_free_shipping':
                return 'select';
            case 'dest_street_address_l1':
            case 'dest_street_address_l2':
            case 'dest_postcode':
            case 'dest_postcode_prefix':
                return 'string';
            default:
                return 'numeric';
        }
    }

    /**
     * Maps attribute code to input field type when editing condition.
     *
     * @override
     *
     * @return string Input field type.
     */
    public function getValueElementType() {
        switch ($this->getAttribute()) {
            case 'customer_group_id':
            case 'dest_country_id':
            case 'dest_country_group':
            case 'dest_region_id':
            case 'promo_coupon_code':
            case 'promo_applied_rule_ids':
            case 'store_id':
            case 'website_id':
            case 'payment_method':
            case 'time_day_of_week':
                return 'multiselect';
            case 'is_admin_order':
            case 'promo_free_shipping':
                return 'select';
            default:
                return 'text';
        }
    }

    /**
     * Maps attribute code to array of oftions for select and multiselect input field types.
     *
     * @override
     *
     * @return array Select options.
     */
    public function getValueSelectOptions() {
        if (!$this->hasData('value_select_options')) {
            switch ($this->getAttribute()) {
                case 'promo_coupon_code':
                    $options = Mage::getModel('meanship/rule_condition_source_couponCode')
                        ->toOptionArray();
                    break;
                case 'promo_applied_rule_ids':
                    $options = Mage::getModel('meanship/rule_condition_source_priceRule')
                        ->toOptionArray();
                    break;
                case 'customer_group_id':
                    $options = Mage::getModel('customer/group')
                        ->getCollection()
                        ->toOptionArray();
                    break;
                case 'payment_method':
                    $options = Mage::getModel('meanship/rule_condition_source_paymentMethod')
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
                case 'promo_free_shipping':
                    $options = Mage::getModel('adminhtml/system_config_source_yesno')
                        ->toOptionArray();
                    break;
                case 'time_day_of_week':
                    $options = Mage::getModel('adminhtml/system_config_source_locale_weekdays')
                        ->toOptionArray();
                    break;
                default:
                    $options = array();
            }

            $this->setData('value_select_options', $options);
        }

        return $this->getData('value_select_options');
    }

    /**
     * Normalises attribute values in a shipping rate request.
     *
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return mixed                                     Sanitised value.
     */
    public function getSanitisedValue(Mage_Shipping_Model_Rate_Request $request) {
        $value = $request->getData($this->getAttribute());

        switch ($this->getAttribute()) {
            case 'dest_postcode': /** @deprecated Remove next major version. */
            case 'dest_postcode_prefix': /** @deprecated Remove next major version. */
                $value = Mage::helper('meanship/postcode')->sanitisePostcode($value);
                break;
        }

        return $value;
    }

    /**
     * Parses the condition input for the rule, ready for comparison with shipping rate request.
     *
     * @override
     *
     * @return mixed Parsed value.
     */
    public function getValueParsed() {
        $value = parent::getValueParsed();

        switch ($this->getAttribute()) {
            case 'dest_postcode': /** @deprecated Remove next major version. */
            case 'dest_postcode_prefix': /** @deprecated Remove next major version. */
                $value = Mage::helper('meanship/postcode')->sanitisePostcode($value);
                break;
            case 'dest_postcode_numeric':
                $value = (is_array($value)) ? array_map("intval", $value) : intval($value);
                break;
            case 'is_admin_order':
                $value = ($value == '1');
                break;
            case 'time_time_of_day':
                $value = Mage::helper('meanship/time')->getLocalTimeOfDayFromString($value);
                break;
        }

        return $value;
    }

    /**
     * Checks results of condition(s).
     *
     * @override
     *
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return boolean                          True if condition(s) passed, False otherwise.
     */
    public function validate(Varien_Object $request) {
        return $this->validateAttribute($this->getSanitisedValue($request));
    }

    /**
     * @override
     */
    public function getAttributeElement() {
        $element = parent::getAttributeElement();
        $element->setShowAsText(true);
        return $element;
    }
}
