<?php
class Meanbee_Shippingrules_Calculator_Condition_Customer
	extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
	/**
	 * {@inheritdoc}
	 * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
	 * @return array[] Vaaaaaaariable descriptors.
	 */
	public function getVariables() {
		return array(
			'customer_group' => array('label' => 'Customer Group', 'type' => array('enumerated'), 'options' => array())
		);
	}
}
