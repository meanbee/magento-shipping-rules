<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Combine extends Mage_Rule_Model_Condition_Combine {
    /**
     * @override
     */
    public function __construct() {
        parent::__construct();
        $this->setType('meanship/rule_condition_combine');
    }

    /**
     * Provides list of possible conditions for select field.
     *
     * @override
     * @return array Plaintext array of condition labels with associated attribute codes.
     */
    public function getNewChildSelectOptions() {
        $conditions = parent::getNewChildSelectOptions();

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Conditions Combination'),
            'value' => 'meanship/rule_condition_combine'
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Magento Environment'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Magento Store'),
                    'value' => 'meanship/rule_condition|store_id'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Magento Website'),
                    'value' => 'meanship/rule_condition|website_id'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Is an admin order?'),
                    'value' => 'meanship/rule_condition|is_admin_order'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Customer Information'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Customer Group'),
                    'value' => 'meanship/rule_condition|customer_group_id'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Cart Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Cart Weight'),
                    'value' => 'meanship/rule_condition|package_weight'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Cart Item Count'),
                    'value' => 'meanship/rule_condition|package_qty'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Cart Subtotal excl. Tax'),
                    'value' => 'meanship/rule_condition|package_value'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Cart Subtotal incl. Tax'),
                    'value' => 'meanship/rule_condition|base_subtotal_incl_tax'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Cart Subtotal after Discounts'),
                    'value' => 'meanship/rule_condition|package_value_with_discount'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Promotional Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Free Shipping'),
                    'value' => 'meanship/rule_condition|promo_free_shipping'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Coupon'),
                    'value' => 'meanship/rule_condition|promo_coupon_code'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Applied Cart Price Rules'),
                    'value' => 'meanship/rule_condition|promo_applied_rule_ids'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Payment Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Payment Method'),
                    'value' => 'meanship/rule_condition|payment_method'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Time Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Time of Day'),
                    'value' => 'meanship/rule_condition|time_time_of_day'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Day of Week'),
                    'value' => 'meanship/rule_condition|time_day_of_week'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Destination Conditions'),
            'value' => $this->getDestinationConditions()
        );

        /** @deprecated Remove next major version. */
        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Specalist Destnation Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Shipping Zip Code (if numeric value)'),
                    'value' => 'meanship/rule_condition|dest_postcode_numeric'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Shipping Postcode Prefix (UK only)'),
                    'value' => 'meanship/rule_condition|dest_postcode_prefix'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Cart Item Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Cart items subselection'),
                    'value' => 'meanship/rule_condition_product_subselect'
                ),
            )
        );

        return $conditions;
    }

    /**
     * Provides destionation based conditions.
     * @return array Plaintext array of condition labels with associated attribute codes.
     */
    public function getDestinationConditions() {
        $conditions = array();

        $conditions[] =  array(
            'label' => Mage::helper('meanship')->__('Shipping Street Address, Line 1'),
            'value' => 'meanship/rule_condition|dest_street_address_l1'
        );

        $conditions[] =  array(
            'label' => Mage::helper('meanship')->__('Shipping Street Address, Line 2'),
            'value' => 'meanship/rule_condition|dest_street_address_l2'
        );

        $conditions[] =  array(
            'label' => Mage::helper('meanship')->__('Shipping Country'),
            'value' => 'meanship/rule_condition|dest_country_id'
        );

        if (Mage::helper('meanship/compat')->isEuCountrySupported()) {
            $conditions[] = array(
                'label' => Mage::helper('meanship')->__('Shipping Country Group'),
                'value' => 'meanship/rule_condition|dest_country_group'
            );
        }

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Shipping State'),
            'value' => 'meanship/rule_condition|dest_region_id'
        );

        /** @deprecated Remove next major version. */
        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Shipping Zip Code'),
            'value' => 'meanship/rule_condition|dest_postcode'
        );

        /** @deprecated Remove next major version. */
        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Shipping Postcode (UK only) Prefix'),
            'value' => 'meanship/rule_condition|dest_postcode_prefix'
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Shipping Postal Code'),
            'value' => 'meanship/rule_condition_postalCode'
        );

        return $conditions;
    }

    public function collectValidatedAttributes($productCollection) {
        foreach ($this->getConditions() as $condition) {
            $condition->collectValidatedAttributes($productCollection);
        }
        return $this;
    }
}
