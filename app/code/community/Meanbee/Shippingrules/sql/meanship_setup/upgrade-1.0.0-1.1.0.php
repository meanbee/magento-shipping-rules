<?php
/** @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$this->startSetup();

$table = $installer->getConnection()
    ->addColumn($installer->getTable('meanship/rule'), 'version', array(
        'type'     => Varien_Db_Ddl_Table::TYPE_VARCHAR,
        'size'     => 32,
        'nullable' => false,
        'default'  => '1.0.0',
        'comment'  => 'Version that the rule was created for'
    ));

Mage::helper('meanship/upgrade')->migrateRulesTo1point1();

$this->endSetup();