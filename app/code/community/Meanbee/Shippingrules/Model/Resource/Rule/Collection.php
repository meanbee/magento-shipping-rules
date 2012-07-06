<?php
class Meanbee_Shippingrules_Model_Resource_Rule_Collection extends Mage_Rule_Model_Resource_Rule_Collection_Abstract {
    protected function _construct() {
        $this->_init('meanship/rule');
    }
}