<?php
class Meanbee_Shippingrules_Helper_Config extends Mage_Core_Helper_Abstract {
    const XML_SHOW_METHOD_CODE_GRID = 'carriers/meanship/show_method_code_on_grid';
    const XML_SORT_ORDER = 'carriers/meanship/sort_order';

    /**
     * @param null $store
     *
     * @return bool
     */
    public function getShouldShowMethodCodeOnGrid($store = null) {
        return Mage::getStoreConfigFlag(self::XML_SHOW_METHOD_CODE_GRID, $store);
    }

    /**
     * @param null $store
     *
     * @return string
     */
    public function getSortOrder($store = null) {
        return Mage::getStoreConfig(self::XML_SORT_ORDER, $store);
    }
}
