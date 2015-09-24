<?php

$installer = $this;

$this->startSetup();

$table_name = $installer->getTable('meanship/rule');

$installer->run("
  ALTER TABLE `{$table_name}` ADD `notes` TEXT NOT NULL DEFAULT '';
");

$installer->run("
  UPDATE `{$table_name}` SET `notes`='' WHERE `notes` IS NULL;
");

$this->endSetup();
