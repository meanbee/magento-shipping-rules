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
            'promo_free_shipping' => array('label' => 'Free Shipping', 'type' => array('boolean')),
            'promo_coupon_code'   => array('label' => 'Coupon Code',   'type' => array('enumerated', 'string'), 'options' => array())
        );
    }
}
