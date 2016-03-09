<?php
class Meanbee_Shippingrules_Calculator_Condition_Environment
	extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
	 * @return string [description]
	 */
	public function getCategory() {
		return 'Magento Environment Conditions';
	}

	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
	 * @return array[] [description]
	 */
	public function getVariables($context) {
		if (!isset($context['group']) || is_null($context)) {
			return array(
				'store_id'       => array('label' => 'Magento Store',   'type' => array('enumerated', 'string'), 'options' => array()),
				'website_id'     => array('label' => 'Magento Website', 'type' => array('enumerated', 'string'), 'options' => array()),
				'is_admin_order' => array('label' => 'Is Admin Order?', 'type' => array('boolean'))
			);
		}
		return array();
	}
}
