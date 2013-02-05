<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Combine extends Mage_Rule_Model_Condition_Combine {
    public function __construct() {
        parent::__construct();
        $this->setType('meanship/rule_condition_combine');
    }

    public function getNewChildSelectOptions() {
        $conditions = parent::getNewChildSelectOptions();

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Conditions Combination'),
            'value' => 'meanship/rule_condition_combine'
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
                    'label' => Mage::helper('meanship')->__('Cart Total'),
                    'value' => 'meanship/rule_condition|package_value'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Destination Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Shipping Country'),
                    'value' => 'meanship/rule_condition|dest_country_id'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Shipping State'),
                    'value' => 'meanship/rule_condition|dest_region_id'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Shipping Zip Code'),
                    'value' => 'meanship/rule_condition|dest_postcode'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Cart Item Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Cart items subselection'),
                    'value' => 'salesrule/rule_condition_product_subselect'
                ),
            )
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
