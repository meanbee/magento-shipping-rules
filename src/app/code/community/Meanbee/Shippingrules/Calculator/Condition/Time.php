<?php
class Meanbee_Shippingrules_Calculator_Condition_Time
    extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return array[] Variable descriptors.
     */
    public function getVariables() {
        return array(
            'time_time_of_day' => array('label' => 'Time of Day', 'type' => 'time')
        );
    }
}
