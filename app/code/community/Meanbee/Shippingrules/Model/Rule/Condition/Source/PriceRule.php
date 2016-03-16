<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Source_PriceRule {
    public function toOptionArray() {
        $options = array();
        $cart_rules = Mage::getResourceModel('salesrule/rule_collection');

        foreach ($cart_rules as $cart_rule) {
                array_push($options, array(
                    'label' => $cart_rule->getName(),
                    'value' => $cart_rule->getId()
                ));
        }
        return $options;
    }
}
