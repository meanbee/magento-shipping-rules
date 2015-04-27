<?php
class Meanbee_Shippingrules_Test_Model_Rule extends EcomDev_PHPUnit_Test_Case {
    /** @var Meanbee_Shippingrules_Model_Rule */
    protected $_obj = null;

    public function setUp() {
        $this->_obj = Mage::getModel('meanship/rule');
    }

    public function tearDown() {
        $this->_obj = null;
    }

    /**
     * @test
     */
    public function testModelConstructed() {
        $this->assertInstanceOf('Meanbee_Shippingrules_Model_Rule', $this->_obj);
    }

    /**
     * @test
     */
    public function testGetConditionsInstance() {
        $this->assertInstanceOf('Meanbee_Shippingrules_Model_Rule_Condition_Combine', $this->_obj->getConditionsInstance());
    }

    /**
     * @test
     */
    public function testGetActionsInstance() {
        $this->assertInstanceOf('Mage_Rule_Model_Action_Collection', $this->_obj->getActionsInstance());
    }
}
