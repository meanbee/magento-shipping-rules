<?php
class Condition_Cart extends Condition_Abstract
{
	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Condition_Abstract
	 * @return string [description]
	 */
	public function getCategory() {
		return 'Cart Conditions';
	}

	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Condition_Abstract
	 * @return array[] [description]
	 */
	public function getVariables($context) {
		if(!isset($context['group']) || is_null($context)) {
			return array(
				'package_weight'              => array('label' => 'Total Weight',             'type' => array('number')),
				'package_quantity'            => array('label' => 'Total Items Quantity',     'type' => array('number')),
				'package_value'               => array('label' => 'Subtotal excl. Tax',       'type' => array('number')),
				'base_subtotal_incl_tax'      => array('label' => 'Subtotal incl. Tax',       'type' => array('number')),
				'package_value_with_discount' => array('label' => 'Subtotal after Discounts', 'type' => array('number'))
			);
		}
		return array();
	}
}
