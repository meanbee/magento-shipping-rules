<?php
/** @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$this->startSetup();

$table_name = $installer->getTable('meanship/rule');

$installer->run("
  ALTER TABLE `{$table_name}` ADD `conditions_migration` TEXT NOT NULL DEFAULT '';
  ALTER TABLE `{$table_name}` ADD `price_migration` TEXT NOT NULL DEFAULT '';
  ALTER TABLE `{$table_name}` ADD `cost_migration` TEXT NOT NULL DEFAULT '';
  ALTER TABLE `{$table_name}` ADD `migrated_to` TEXT NOT NULL DEFAULT '';
  ALTER TABLE `{$table_name}` ADD `migration_ignored` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0;
");

$rules = Mage::getModel('meanship/rule')->getCollection();
$upgradeHelper = Mage::helper('meanship/upgrade');
foreach($rules as $rule) {
    $upgradeHelper->readyMigrationToVersion3($rule)->save();
}

$this->endSetup();
