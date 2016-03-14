<?php
class Meanbee_Shippingrules_Helper_Config extends Mage_Core_Helper_Abstract
{
    const DOCUMENTATION_URL = 'https://meanbee.atlassian.net/wiki/display/EXT/Shipping+Rules';

    const XML_CARRIER_NAME       = 'carriers/meanbee_shippingrules/carrier_name';
    const XML_CARRIER_SORT_ORDER = 'carriers/meanbee_shippingrules/carrier_sort_order';
    const XML_MODULE_ENABLED     = 'carriers/meanbee_shippingrules/enabled';
    const XML_GRID_FIELDS        = 'carriers/meanbee_shippingrules/grid_fields';
    const XML_METHOD_CODE_PREFIX = 'carriers/meanbee_shippingrules/method_code_prefix';

    public function getCarrierName($store = null)
    {
        return Mage::getStoreConfig(self::XML_CARRIER_NAME, $store);
    }

    public function getCarrierSortOrder($store = null)
    {
        return (int) Mage::getStoreConfig(self::XML_CARRIER_SORT_ORDER, $store);
    }

    public function getDocumentationURL()
    {
        return self::DOCUMENTATION_URL;
    }

    public function getEnabled($store = null)
    {
        return Mage::getStoreConfigFlag(self::XML_MODULE_ENABLED, $store);
    }

    public function getGridFields($store = null)
    {
        return explode(',', Mage::getStoreConfig(self::XML_GRID_FIELDS, $store));
    }

    public function getMethodCodePrefix($store = null)
    {
        return Mage::getStoreConfig(self::XML_METHOD_CODE_PREFIX, $store);
    }

    public function getVersion()
    {
        return (string) Mage::getConfig()->getModuleConfig('Meanbee_Shippingrules')->version;
    }
}
