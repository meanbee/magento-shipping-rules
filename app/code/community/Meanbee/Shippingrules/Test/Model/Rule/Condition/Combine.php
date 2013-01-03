<?php
class Meanbee_Shippingrules_Test_Model_Rule_Condition_Combine extends EcomDev_PHPUnit_Test_Case {
    /** @var Meanbee_Shippingrules_Model_Rule_Condition_Combine */
    protected $_obj = null;

    public function setUp() {
        $this->_obj = Mage::getModel('meanship/rule_condition_combine');
    }

    public function tearDown() {
        $this->_obj = null;
    }

    /**
     * @test
     */
    public function testModelConstructed() {
        $this->assertInstanceOf('Meanbee_Shippingrules_Model_Rule_Condition_Combine', $this->_obj);
    }

    /**
     * @test
     */
    public function testGetNewChildSelectOptions() {
        $this->assertTrue(is_array($this->_obj->getNewChildSelectOptions()));
    }
}