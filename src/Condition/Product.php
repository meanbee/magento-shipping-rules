<?php
class Condition_Product extends Condition_Abstract
{
	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Condition_Abstract
	 * @return string [description]
	 */
	public function getCategory() {
		return 'Product Conditions';
	}

	/**
	 * {@inheritdoc}
	 * @implementation Condition_Abstract
	 * @return array[] [description]
	 */
	public function getVariables($context) {
		return array(

		);
	}
}
