<?php
class Meanbee_Shippingrules_Helper_Config extends Mage_Core_Helper_Abstract {
    const XML_SHOW_METHOD_CODE_GRID = 'carriers/meanship/show_method_code_on_grid';
    const XML_SORT_ORDER = 'carriers/meanship/sort_order';
    const XML_CONDENSE_COUNTRIES_ON_GRID = 'carriers/meanship/condense_countries_on_grid';
    const XML_CLIP_POINT_ON_GRID = 'carriers/meanship/clip_conditions_on_grid';

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

    /**
     * @param null $store
     *
     * @return string
     */
    public function getCondenseCountriesOnGrid($store = null) {
        return Mage::getStoreConfig(self::XML_CONDENSE_COUNTRIES_ON_GRID, $store);
    }

    /**
     * @param null $store
     *
     * @return int
     */
    public function getClipPointOnGrid($store = null) {
        return (int) Mage::getStoreConfig(self::XML_CLIP_POINT_ON_GRID, $store);
    }
}
