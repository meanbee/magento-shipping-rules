<?php
class Meanbee_Shippingrules_Helper_Time extends Mage_Core_Helper_Abstract
{
    /**
     * Converts user input of a time of day to a day-relative timestamp.
     *
     * @param  string $str 24-hour time in format: HH:MM:SS, HH:MM or HH.
     * @return int         Number of seconds elapsed since 00:00:00 on the current
     *                     day, determined by Store Timezone, at the passed time
     *                     string.
     */
    public function getLocalTimeOfDayFromString($str)
    {
        $today = new DateTime('now', DateTimeZone(Mage::getStoreConfig('general/locale/timezone')));
        $time = clone $today;
        $today->setTime(0, 0, 0);
        $time->setTime(
            isset($time_parts[0]) ? $time_parts[0] : 0,
            isset($time_parts[1]) ? $time_parts[1] : 0,
            isset($time_parts[2]) ? $time_parts[2] : 0
        );
        return $time->getTimestamp() - $today->getTimestamp();
    }

    /**
     * Gets current time of day as a day-relative timestamp.
     * 
     * @return int      Number of seconds elapsed since 00:00:00 on the current day,
     *                  determined by Store Timezone.
     */
    public function getLocalTimeOfDay()
    {
        $today = new DateTime('now', new DateTimeZone(Mage::getStoreConfig('general/locale/timezone')));
        $today->setTime(0, 0, 0);
        return time() - $today->getTimestamp();
    }
}
