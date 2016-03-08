<?php
class Condition_Customer extends Condition_Abstract
{
	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Condition_Abstract
	 * @return string [description]
	 */
	public function getCategory() {
		return 'Customer Conditions';
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
				'customer_group' => array('label' => 'Customer Group', 'type' => array('enumerated'), 'options' => array())
			);
		}
		return array();
	}
}
