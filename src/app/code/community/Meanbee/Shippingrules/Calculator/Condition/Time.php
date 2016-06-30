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
            'time_time_of_day' => array('label' => 'Time of Day', 'type' => 'time'),
            'time_day_of_week' => array('label' => 'Day of Week', 'type' => array('enumerated'))
        );
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request) {
        // TODO: Time of Day [time_time_of_day]
        // TODO: Day of Week [time_day_of_week]
        return $request;
    }
}
