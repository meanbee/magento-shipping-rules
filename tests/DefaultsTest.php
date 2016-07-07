<?php
class DefaultsTest extends PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
    }

    public function testShippingCarrierDefaultsDefined()
    {
        $this->assertEquals('1', Mage::getConfig()->getNode('default/carriers/meanbee_shippingrules/active'));
        $this->assertEquals('meanbee_shippingrules/carrier', Mage::getConfig()->getNode('default/carriers/meanbee_shippingrules/model'));
        $this->assertNotEmpty(Mage::getConfig()->getNode('default/carriers/meanbee_shippingrules/title'));

        $this->assertTrue(Mage::getStoreConfigFlag('carriers/meanbee_shippingrules/active'));
        $this->assertEquals('meanbee_shippingrules/carrier', Mage::getStoreConfig('carriers/meanbee_shippingrules/model'));
        $this->assertNotEmpty(Mage::getStoreConfig('carriers/meanbee_shippingrules/title'));
    }
}