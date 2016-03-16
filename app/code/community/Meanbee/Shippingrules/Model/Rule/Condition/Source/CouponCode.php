<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Source_CouponCode {
    public function toOptionArray() {
        $codes = array();
        $cart_rules = Mage::getResourceModel('salesrule/rule_collection');

        foreach ($cart_rules as $cart_rule) {
            if ($cart_rule->getCode()) {
                array_push($codes, array(
                    'label' => $cart_rule->getName(),
                    'value' => $cart_rule->getCode()
                ));
            }
        }
        return $codes;
    }
}
