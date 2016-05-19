<?php
class Meanbee_Shippingrules_Calculator_Condition_Destination
	extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
	/**
	 * {@inheritdoc}
	 * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
	 * @return array[] Variable descriptors.
	 */
	public function getVariables() {
		return array(
			'dest_country_id'    => array('label' => 'Shipping Country',       'type' => array('enumerated'), 'options' => array()),
			'dest_country_group' => array('label' => 'Shipping Country Group', 'type' => array('enumerated'), 'options' => array()),
			'dest_region_id'     => array('label' => 'Shipping State',         'type' => array('enumerated'), 'options' => array())
		);
	}

}
