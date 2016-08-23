<?php
/** @var Mage_Core_Model_Resource_Setup $installer */
$installer = $this;

$installer->startSetup();

$sql = <<<EOQ

DROP TABLE IF EXISTS `{$installer->getTable('meanbee_shippingrules/rule')}`;
CREATE TABLE `{$installer->getTable('meanbee_shippingrules/rule')}` (
  `rule_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Rule Id',
  `name` VARCHAR(255) DEFAULT NULL COMMENT 'Shipping Method Name',
  `price` TEXT COMMENT 'Shipping Method Price',
  `cost` TEXT COMMENT 'Shipping Method Cost',
  `conditions` TEXT COMMENT 'Conditions',
  `price_per_item` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Price Per Item',
  `cost_per_item` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Cost Per Item',
  `stop_rules_processing` TINYINT(1) NOT NULL DEFAULT '0' COMMENT 'Stop Similar Rules Processing',
  `stop_all_rules_processing` TINYINT(1) NOT NULL DEFAULT '0' COMMENT 'Stop All Rules Processing',
  `sort_order` INT(10) NOT NULL DEFAULT '0' COMMENT 'Execution Sort Order',
  `display_sort_order` INT(10) NOT NULL DEFAULT '0' COMMENT 'Display Sort Order',
  `notes` TEXT NOT NULL COMMENT 'Notes',
  `is_active` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Is Active',
  `version` VARCHAR(32) NOT NULL DEFAULT '3.0.0' COMMENT 'Version',
  `migrated_to` VARCHAR(32) NOT NULL COMMENT 'Version Migrated To',
  `migration_ignored` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Migration Ignored',
  PRIMARY KEY (`rule_id`)
) DEFAULT CHARSET=utf8 COMMENT='Meanbee Shipping Rule';

EOQ;

$installer->run($sql);

$installer->endSetup();
