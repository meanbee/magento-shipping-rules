<?php
class Helper_ConfigTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Helper_Config $helper */
    private $helper;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->helper = Mage::helper('meanbee_shippingrules/config');
    }

    public function testCarrierConfiguraion()
    {
        $this->assertEquals(Mage::getStoreConfigFlag(Meanbee_Shippingrules_Helper_Config::XML_MODULE_ACTIVE), $this->helper->isActive());
        $this->assertEquals(Mage::getStoreConfig(Meanbee_Shippingrules_Helper_Config::XML_CARRIER_NAME), $this->helper->getCarrierName());
        $this->assertEquals(Mage::getStoreConfig(Meanbee_Shippingrules_Helper_Config::XML_CARRIER_SORT_ORDER), $this->helper->getCarrierSortOrder());
    }

    public function testExtensionMetadata()
    {
        $this->assertEquals(Mage::getConfig()->getModuleConfig('Meanbee_Shippingrules')->version, $this->helper->getVersion());
        $this->assertEquals(Meanbee_Shippingrules_Helper_Config::DOCUMENTATION_URL, $this->helper->getDocumentationURL());
    }

    public function testExtensionConfiguration()
    {
        $this->assertEquals(explode(',', Mage::getStoreConfig(Meanbee_Shippingrules_Helper_Config::XML_GRID_FIELDS)), $this->helper->getGridFields());
    }
}