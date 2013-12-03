<?php
/** @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

/**
 * Create table 'meanship/rule'
 */
$table_name = $installer->getTable('meanship/rule');

$installer->run("

    CREATE TABLE `{$table_name}` (
    `rule_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Rule Id',
    `name` varchar(255) DEFAULT NULL COMMENT 'Shipping Method Name',
    `price` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT 'Shipping Method Price',
    `cost` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT 'Shipping Method Cost',
    `conditions_serialized` mediumtext COMMENT 'Conditions Serialized',
    `stop_rules_processing` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Stop Rules Processing',
    `sort_order` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Sort Order',
    `is_active` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Is Active',
    PRIMARY KEY (`rule_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Meanbee Shipping Rule';

");

$installer->endSetup();
