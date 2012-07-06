<?php
class Meanbee_Shippingrules_Model_Resource_Rule extends Mage_Rule_Model_Resource_Abstract {
    protected function _construct() {
        $this->_init('meanship/rule', 'rule_id');
    }
}