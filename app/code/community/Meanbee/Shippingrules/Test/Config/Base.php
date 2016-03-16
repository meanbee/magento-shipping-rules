<?php
class Meanbee_Shippingrules_Test_Config_Base extends EcomDev_PHPUnit_Test_Case_Config {
    public function testClassAliases() {
        $this->assertBlockAlias('meanship/test', 'Meanbee_Shippingrules_Block_Test');
        $this->assertModelAlias('meanship/test', 'Meanbee_Shippingrules_Model_Test');
        $this->assertHelperAlias('meanship/test', 'Meanbee_Shippingrules_Helper_Test');
    }

    public function testShippingCarrierDefaultsDefined() {
        $this->assertConfigNodeValue('default/carriers/meanship/active', '1');
        $this->assertConfigNodeValue('default/carriers/meanship/model', 'meanship/carrier');
        $this->assertConfigNodeNotValue('default/carriers/meanship/title', '');

        $this->assertTrue(Mage::getStoreConfigFlag('carriers/meanship/active'));
        $this->assertEquals('meanship/carrier', Mage::getStoreConfig('carriers/meanship/model'));
        $this->assertNotEmpty(Mage::getStoreConfig('carriers/meanship/title'));
    }
}