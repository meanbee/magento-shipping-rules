<?php
class Meanbee_Shippingrules_Helper_Acl extends Mage_Core_Helper_Abstract {

    const RESOURCE_WRITE = 'meanbee_shippingrules/write';
    const RESOURCE_READ = 'meanbee_shippingrules';

    public function isAllowedToWrite() {
        return Mage::getSingleton('admin/session')->isAllowed(self::RESOURCE_WRITE);
    }

    public function isAllowedToRead() {
        return Mage::getSingleton('admin/session')->isAllowed(self::RESOURCE_READ);
    }
}
