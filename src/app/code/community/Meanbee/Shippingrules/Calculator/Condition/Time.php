<?php
class Meanbee_Shippingrules_Calculator_Condition_Time
	extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
	/**
	 * {@inheritdoc}
	 * @todo
	 * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
	 * @return string [description]
	 */
	public function getCategory() {
		return 'Time Conditions';
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
				'time_time_of_day' => array('label' => 'Time of Day', 'type' => 'time')
			);
		}
		return array();
	}
}
