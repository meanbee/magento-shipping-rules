<?php
class Meanbee_Shippingrules_Model_Resource_Rule extends Meanbee_Shippingrules_Model_Resource_Rule_Abstract {
    protected function _construct() {
        $this->_init('meanship/rule', 'rule_id');
    }
}