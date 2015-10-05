<?php
/** @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$this->startSetup();

$table_name = $installer->getTable('meanship/rule');

$installer->run("
  ALTER TABLE `{$table_name}` ADD `display_sort_order` INT(10) NOT NULL DEFAULT 0;
");

$this->endSetup();
