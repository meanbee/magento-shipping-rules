<?php
class Meanbee_Shippingrules_Calculator_Condition_Promotion
    extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return array[] VVariable descriptors.
     */
    public function getVariables() {
        return array(
            'promo_free_shipping'    => array('label' => 'Free Shipping',            'type' => array('boolean')),
            'promo_coupon_code'      => array('label' => 'Coupon Code',              'type' => array('enumerated', 'string')),
            'promo_applied_rule_ids' => array('label' => 'Applied Cart Price Rules', 'type' => array('enumerated'))
        );
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request) {
        $requestItems = $request->getAllItems();
        if (count($requestItems) > 0) {
            $quote = $requestItems[0]->getQuote();
            if(null != $quote->getShippingAddress()) {
                $request->setData('promo_free_shipping', $quote->getShippingAddress()->getFreeShipping());
            }
            $request->setData('promo_coupon_code', $quote->getCouponCode());
            $request->setData('promo_applied_rule_ids', implode(',', $this->getAppliedCartPriceRules($requestItems)) ?: null);
        }
        return $request;
    }

    /**
     * Gets an array of ids of all cart price rules that have been applied to
     * the cart or any product in the cart, without duplicates, regardless of
     * whether or not the billing and delivery addresses differ.
     * @param  Array $requestItems Array of items from the
     *                             Mage_Shipping_Model_Rate_Request object.
     * @return string[]
     */
    protected function getAppliedCartPriceRules($requestItems) {
        if (count($requestItems) <= 0) {
            return array();
        }
        $quote = $requestItems[0]->getQuote();
        $quoteLevelPriceRules = explode(',', $quote->getAppliedRuleIds()) ?: array();
        $productLevelPriceRules = array_reduce($requestItems, function ($accumulator, $product) {
            return array_merge($accumulator, explode(',', $product->getAppliedRuleIds()));
        }, array());
        $allPriceRules = array_merge($quoteLevelPriceRules, $productLevelPriceRules);
        return array_filter(array_unique($allPriceRules));
    }

    public function ajaxOptions($variable) {
        switch ($variable) {
            case 'promo_coupon_code':
                $options = array();
                $cart_rules = Mage::getResourceModel('salesrule/rule_collection');
                foreach ($cart_rules as $cart_rule) {
                    if ($cart_rule->getCode()) {
                        array_push($options, array('label' => $cart_rule->getName(), 'value' => $cart_rule->getCode()));
                    }
                }
                return $options;
            case 'promo_applied_rule_ids':
                $options = array();
                $cart_rules = Mage::getResourceModel('salesrule/rule_collection');
                foreach ($cart_rules as $cart_rule) {
                    array_push($options, array('label' => $cart_rule->getName(), 'value' => $cart_rule->getId()));
                }
                return $options;
        }
    }
}
