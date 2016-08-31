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
            'time_time_of_day' => array('label' => 'Time of Day', 'type' => array('time')),
            'time_day_of_week' => array('label' => 'Day of Week', 'type' => array('enum'))
        );
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request) {
        $request->setData('time_timestamp', time());
        $request->setData('time_time_of_day', $this->getLocalTimeOfDay());
        $request->setData('time_day_of_week', $this->getLocalDayOfWeek());
        return $request;
    }

    /**
     * Gets current time of day as a day-relative timestamp.
     * @return int      Number of seconds elapsed since 00:00:00 on the current day,
     *                  determined by Store Timezone.
     */
    protected function getLocalTimeOfDay()
    {
        $today = new DateTime('now', new DateTimeZone(Mage::getStoreConfig('general/locale/timezone')));
        $today->setTime(0, 0, 0);
        return time() - $today->getTimestamp();
    }

    /**
     * Gets the day of the week.
     * @return int Index of weekday, where Sunday is `0`, determined by Store
     *             Timezone.
     */
    public function getLocalDayOfWeek()
    {
        $now = new DateTime('now', new DateTimeZone(Mage::getStoreConfig('general/locale/timezone')));
        $date = $now->format('Y-m-d');
        return date('w', strtotime($date));
    }

    public function ajaxOptions($variable) {
        switch ($variable) {
            case 'time_day_of_week':
                return Mage::getModel('adminhtml/system_config_source_locale_weekdays')->toOptionArray();
        }
    }
}
