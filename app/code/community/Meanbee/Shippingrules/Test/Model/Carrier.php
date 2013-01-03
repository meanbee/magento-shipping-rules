<?php
class Meanbee_Shippingrules_Test_Model_Carrier extends EcomDev_PHPUnit_Test_Case {
    /** @var Meanbee_Shippingrules_Model_Carrier */
    protected $_obj = null;

    public function setUp() {
        $this->_obj = Mage::getModel('meanship/carrier');
    }

    public function tearDown() {
        $this->_obj = null;
    }

    /**
     * @test
     */
    public function testModelConstructed() {
        $this->assertInstanceOf('Meanbee_Shippingrules_Model_Carrier', $this->_obj);
    }
}