<?php
class Meanbee_Shippingrules_Helper_Migration extends Mage_Core_Helper_Abstract
{
    const MIGRATION_MALFORMED = 'malformed';
    const MIGRATION_MIXED = 'mixed';
    const MIGRATION_QUEUED = 'queued';

    public function getMigrationStatus() {
        if ($this->useLegacyTable() && !$this->isLegacyTableMigrationReady()) {
            return self::MIGRATION_MALFORMED;
        }
        
        $references = $this->getRulesByMigrationStatus();

        if (count($references[self::MIGRATION_QUEUED]) > 0 && count($references[self::MIGRATION_MALFORMED]) == 0) {
            return self::MIGRATION_QUEUED;
        }
        if (count($references[self::MIGRATION_QUEUED]) > 0 && count($references[self::MIGRATION_MALFORMED]) > 0) {
            return self::MIGRATION_MIXED;
        }
        if (count($references[self::MIGRATION_QUEUED]) == 0 && count($references[self::MIGRATION_MALFORMED]) > 0) {
            return self::MIGRATION_MALFORMED;
        }
    }

    public function getRulesByMigrationStatus() {
        $tablePrefix = Mage::getConfig()->getTablePrefix();
        $checkLegacyTable = $this->useLegacyTable();
        $thisVersion = Mage::helper('meanbee_shippingrules/config')->getVersion();
        $references = array(
            self::MIGRATION_QUEUED => array(),
            self::MIGRATION_MALFORMED => array()
        );

        if ($checkLegacyTable && $this->isLegacyTableMigrationReady()) {
            /** @var Varien_Db_Adapter_Interface $readConnection */
            $readConnection = Mage::getSingleton('core/resource')->getConnection('core_read');
            $query = "SELECT * FROM `{$tablePrefix}meanship_rule` WHERE `migration_ignored` = 0";
            $results = $readConnection->fetchAll($query);
            foreach ($results as $row) {
                if (version_compare($row['version'], $thisVersion, '<') && version_compare($row['migrated_to'], $thisVersion, '<')) {
                    $rule = new Varien_Object;
                    $rule->addData($row)
                         ->setDbTable("{$tablePrefix}meanship_rule");
                    if (preg_match('/-migrationready$/i', $row['version'])) {
                        $references[self::MIGRATION_QUEUED][] = $rule;
                    } else {
                        $references[self::MIGRATION_MALFORMED][] = $rule;
                    }
                }
            }
        }

        /** @var Meanbee_Shippingrules_Model_Resource_Rule_Collection $rules */
        $rules = Mage::getModel('meanbee_shippingrules/rule')->getCollection();
        $rules->addFieldToFilter('migration_ignored', 0);
        foreach ($rules as $rule) {
            if (version_compare($rule->getVersion(), $thisVersion, '<') && version_compare($rule->getMigratedTo(), $thisVersion, '<')) {
                if (preg_match('/-migrationready$/i', $rule->getVersion())) {
                    $references[self::MIGRATION_QUEUED][] = $rule->setDbTable("{$tablePrefix}meanbee_shippingrules_rule");
                } else {
                    $references[self::MIGRATION_MALFORMED][] = $rule->setDbTable("{$tablePrefix}meanbee_shippingrules_rule");
                }
            }
        }

        
        return $references;
    }

    private function isLegacyTableMigrationReady() {
        $tablePrefix = Mage::getConfig()->getTablePrefix();
        /** @var Varien_Db_Adapter_Interface $readConnection */
        $readConnection = Mage::getSingleton('core/resource')->getConnection('core_read');
        $database = Mage::getConfig()->getResourceConnectionConfig("default_setup")->dbname;
        $query = "SELECT COUNT(*) AS `cols` FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '{$database}' AND TABLE_NAME = '{$tablePrefix}meanship_rule' AND COLUMN_NAME IN ('version', 'migrated_to', 'migration_ignored')";
        $result = $readConnection->fetchOne($query);
        
        return $result >= 3;
    }

    private function useLegacyTable() {
        $tablePrefix = Mage::getConfig()->getTablePrefix();
        return (bool) Mage::getSingleton('core/resource')
            ->getConnection('core_write')
            ->showTableStatus(trim("`{$tablePrefix}meanship_rule`", '`'));
    }

    public function migrateRules() {
        $tablePrefix = Mage::getConfig()->getTablePrefix();
        $references = $this->getRulesByMigrationStatus();
        foreach ($references[self::MIGRATION_QUEUED] as $reference) {
            if ($reference->getDbTable() === "{$tablePrefix}meanship_rule") {
                $migratedIds = array();
                switch ($reference->getVersion()) {
                    case '2.8.0-migrationready':
                        $this->migrateRuleFrom2_8_0ToCurrent($reference);
                        $migratedIds[] = $reference->getRuleId();
                        break;
                }
                Mage::log($migratedIds, Zend_Log::DEBUG, 'debug.log', true);
                if (!empty($migratedIds)) {
                    $currentVersion = Mage::helper('meanbee_shippingrules/config')->getVersion();
                    $migratedIds = '(\''.implode('\', \'', $migratedIds).'\')';
                    /** @var Varien_Db_Adapter_Interface $connection */
                    $connection = Mage::getSingleton('core/resource')->getConnection('core_write');
                    $connection->query("UPDATE `{$tablePrefix}meanship_rule` SET `migrated_to` = '{$currentVersion}' WHERE `rule_id` IN {$migratedIds}");
                }
            } else {
                // NOT IMPLEMENTED
            }
        }
    }

    public function ignoreMigration() {
        $references = $this->getRulesByMigrationStatus();
        $ruleIds = array();
        foreach ($references[self::MIGRATION_QUEUED] as $reference) {
            if ($reference->getDbTable() === "{$tablePrefix}meanship_rule") {
                $ruleIds[] = $reference->getRuleId();
            }
        }
        if (!empty($ruleIds)) {
            $ruleIds = '(\''.implode('\', \'', $ruleIds).'\')';
            /** @var Varien_Db_Adapter_Interface $connection */
            $connection = Mage::getSingleton('core/resource')->getConnection('core_write');
            $connection->query("UPDATE `{$tablePrefix}meanship_rule` SET `migration_ignored` = '1' WHERE `rule_id` IN {$ruleIds}");
        }
        $ruleIds = array();
        foreach ($references[self::MIGRATION_QUEUED] as $reference) {
            if ($reference->getDbTable() === "{$tablePrefix}meanbee_shippingrules_rule") {
                $ruleIds[] = $reference->getRuleId();
            }
        }
        if (!empty($ruleIds)) {
            /** @var Meanbee_Shippingrules_Model_Resource_Rule_Collection $ruleCollection */
            $ruleCollection = Mage::getModel('meanbee_shippingrules/rule')->getCollection();
            $ruleCollection->addFieldToFilter('rule_id', array('in', $ruleIds));
            foreach($ruleCollection as $rule) {
                $rule->setMigrationIgnored(true);
                $rule->save();
            }
        }
    }

    private function migrateRuleFrom2_8_0ToCurrent($oldRule) {
        /** @var Meanbee_Shippingrules_Model_Rule $newRule */
        $newRule = Mage::getModel('meanbee_shippingrules/rule')
            ->setName($oldRule->getName())
            ->setPrice($oldRule->getPriceMigration())
            ->setCost($oldRule->getCostMigration())
            ->setConditions($oldRule->getConditionsMigration())
            ->setPricePerItem($oldRule->getPerItem())
            ->setCostPerItem($oldRule->getPerItem())
            ->setStopRulesProcessing($oldRule->getStopRulesProcessing())
            ->setStopAllRulesProcessing($oldRule->getStopAllRulesProcessing())
            ->setSortOrder($oldRule->getSortOrder())
            ->setDisplaySortOrder($oldRule->getDisplaySortOrder())
            ->setNotes($oldRule->getNotes())
            ->setIsActive(false)
            ->setVersion(Mage::helper('meanbee_shippingrules/config')->getVersion())
            ->save();
    }
}