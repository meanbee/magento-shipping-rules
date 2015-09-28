<?php

$installer = $this;

$this->startSetup();

$table_name = $installer->getTable('meanship/rule');

$installer->run("
  ALTER TABLE `{$table_name}` ADD `stop_all_rules_processing` TINYINT(1) NOT NULL DEFAULT 0;
");

$this->endSetup();
