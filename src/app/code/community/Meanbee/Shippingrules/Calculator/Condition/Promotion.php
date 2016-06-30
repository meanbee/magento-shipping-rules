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
            'free_shipping'                  => array('label' => 'Free Shipping',            'type' => array('boolean')),
            'promo_coupon_code'              => array('label' => 'Coupon Code',              'type' => array('enumerated', 'string'), 'options' => array()),
            'promo_applied_cart_price_rules' => array('label' => 'Applied Cart Price Rules', 'type' => array('enumerated'), 'options' => array())
        );
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request) {
        // TODO: Coupon Code [promo_coupon_code]
        // TODO: Applied Cart Price Rules [promo_applied_cart_price_rules]
        return $request;
    }
}
