<?php
class Condition_Promotion extends Condition_Abstract
{
	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Condition_Abstract
	 * @return string [description]
	 */
	public function getCategory() {
		return 'Promotion Conditions';
	}

	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Condition_Abstract
	 * @return array[] [description]
	 */
	public function getVariables($context) {
		if (!isset($context['group']) || is_null($context)) {
			return array(
				'promo_free_shipping' => array('label' => 'Free Shipping', 'type' => array('boolean')),
				'promo_coupon_code'   => array('label' => 'Coupon Code',   'type' => array('enumerated', 'string'), 'options' => array())
			);
		}
		return array();
	}
}
