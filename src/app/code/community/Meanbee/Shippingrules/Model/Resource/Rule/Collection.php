<?php
class Meanbee_Shippingrules_Model_Resource_Rule_Collection
    extends Mage_Core_Model_Resource_Db_Collection_Abstract
{
    protected function _construct()
    {
        $this->_init('meanbee_shippingrules/rule');
    }
}
