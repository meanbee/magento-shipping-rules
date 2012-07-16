<?php
if (version_compare(Mage::getVersion(), '1.6', '>=')) {
    abstract class Meanbee_Shippingrules_Model_Resource_Rule_Collection_Abstract extends Mage_Rule_Model_Resource_Rule_Collection_Abstract {}
} else {
    abstract class Meanbee_Shippingrules_Model_Resource_Rule_Collection_Abstract extends Mage_Rule_Model_Mysql4_Rule_Collection {}
}
