<?php
class Meanbee_Shippingrules_Helper_Time extends Mage_Core_Helper_Abstract
{
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

	public function getLocalTimeOfDay($str)
	{
        $today = new DateTime('now', new DateTimeZone(Mage::getStoreConfig('general/locale/timezone')));
        $today->setTime(0, 0, 0);
        return time() - $today->getTimestamp();
	}
}
