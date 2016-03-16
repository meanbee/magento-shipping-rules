<?php
/** @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$this->startSetup();

$table_name = $installer->getTable('meanship/rule');

$installer->run("
  ALTER TABLE `{$table_name}` ADD `version` VARCHAR(32) NOT NULL DEFAULT '1.0.0';
");

Mage::helper('meanship/upgrade')->migrateRulesTo1point1();

$this->endSetup();
