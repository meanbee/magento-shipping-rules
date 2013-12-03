<?php
if (version_compare(Mage::getVersion(), '1.7', '>=')) {
    abstract class Meanbee_Shippingrules_Model_Rule_Abstract extends Mage_Rule_Model_Abstract {}
} else {
    abstract class Meanbee_Shippingrules_Model_Rule_Abstract extends Mage_Rule_Model_Rule {}
}

