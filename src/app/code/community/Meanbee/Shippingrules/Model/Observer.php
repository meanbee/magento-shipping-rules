<?php
class Meanbee_Shippingrules_Model_Observer
{
    /**
     * Fired before loading of layout xml.
     * @param  Varien_Event_Observer $observer
     */
    public function controllerActionLayoutLoadBefore($observer)
    {
        if (Mage::app()->getRequest()->getControllerModule() !== 'Meanbee_Shippingrules') {
            return;
        }

        /** @var Mage_Core_Model_Layout $layout */
        $layout = $observer->getEvent()->getLayout();

        $migrationStatus = Mage::helper('meanbee_shippingrules/migration')->getMigrationStatus();
        if ($migrationStatus === Meanbee_Shippingrules_Helper_Migration::MIGRATION_QUEUED) {
            $layout->getUpdate()->addHandle('meanbee_shippingrules_MIGRATION_QUEUED');
        } else if ($migrationStatus === Meanbee_Shippingrules_Helper_Migration::MIGRATION_MALFORMED) {
            $layout->getUpdate()->addHandle('meanbee_shippingrules_MIGRATION_MALFORMED');
        } else if ($migrationStatus === Meanbee_Shippingrules_Helper_Migration::MIGRATION_MIXED) {
            $layout->getUpdate()->addHandle('meanbee_shippingrules_MIGRATION_MIXED');
        }
    }
}