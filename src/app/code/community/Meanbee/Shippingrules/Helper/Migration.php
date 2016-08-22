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
        
        $references = $this->getReferencesByMigrationStatus();

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

    public function getReferencesByMigrationStatus() {
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
            $query = "SELECT `rule_id`, `version`, `migrated_to` FROM `{$tablePrefix}meanship_rule` WHERE `migration_ignored` = 0";
            $results = $readConnection->fetchAll($query);
            foreach ($results as $row) {
                if (version_compare($row['version'], $thisVersion, '<') && version_compare($row['migrated_to'], $thisVersion, '<')) {
                    if (preg_match('/-migrationready$/i', $row['version'])) {
                        $references[self::MIGRATION_QUEUED][] = "{$tablePrefix}meanship_rule#{$row['rule_id']}";
                    } else {
                        $references[self::MIGRATION_MALFORMED][] = "{$tablePrefix}meanship_rule#{$row['rule_id']}";
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
                    $references[self::MIGRATION_QUEUED][] = "{$tablePrefix}meanbee_shippingrules_rule#{$rule->getId()}";
                } else {
                    $notMigratable[self::MIGRATION_MALFORMED][] = "{$tablePrefix}meanbee_shippingrules_rule#{$rule->getId()}";
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
}