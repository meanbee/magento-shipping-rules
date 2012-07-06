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
                    'value' => 'meanship/rule_condition_weight'
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
