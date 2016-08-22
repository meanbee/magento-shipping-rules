<?php
/** @var Mage_Core_Model_Resource_Setup $installer */
$installer = $this;

$installer->startSetup();

$sql = <<<EOQ

DROP TABLE IF EXISTS `{$installer->getTable('meanbee_shippingrules/rule')}`;
CREATE TABLE `{$installer->getTable('meanbee_shippingrules/rule')}` (
  `rule_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Rule Id',
  `name` varchar(255) DEFAULT NULL COMMENT 'Shipping Method Name',
  `price` mediumtext COMMENT 'Shipping Method Price',
  `cost` mediumtext COMMENT 'Shipping Method Cost',
  `conditions` mediumtext COMMENT 'Conditions',
  `price_per_item` int(10) NOT NULL DEFAULT '0' COMMENT 'Price Per Item',
  `cost_per_item` int(10) NOT NULL DEFAULT '0' COMMENT 'Cost Per Item',
  `stop_rules_processing` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Stop Similar Rules Processing',
  `stop_all_rules_processing` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Stop All Rules Processing',
  `sort_order` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Execution Sort Order',
  `display_sort_order` int(10) NOT NULL DEFAULT '0' COMMENT 'Display Sort Order',
  `notes` text NOT NULL COMMENT 'Notes',
  `is_active` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Is Active',
  `version` varchar(32) NOT NULL DEFAULT '3.0.0' COMMENT 'Version',
  `migrated_to` text NOT NULL,
  `migration_ignored` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`rule_id`)
) DEFAULT CHARSET=utf8 COMMENT='Meanbee Shipping Rule';

EOQ;

$installer->run($sql);

$installer->endSetup();
