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
            'label' => Mage::helper('meanship')->__('Cart Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Cart Weight'),
                    'value' => 'meanship/rule_condition_cart_weight'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Cart Item Count'),
                    'value' => 'meanship/rule_condition_cart_count'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Cart Total'),
                    'value' => 'meanship/rule_condition_cart_total'
                )
            )
        );

        $conditions[] = array(
            'label' => Mage::helper('meanship')->__('Destination Conditions'),
            'value' => array(
                array(
                    'label' => Mage::helper('meanship')->__('Shipping Country'),
                    'value' => 'meanship/rule_condition_destination_country'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Shipping State'),
                    'value' => 'meanship/rule_condition_destination_state'
                ),
                array(
                    'label' => Mage::helper('meanship')->__('Shipping Zip Code'),
                    'value' => 'meanship/rule_condition_destination_zipcode'
                )
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
