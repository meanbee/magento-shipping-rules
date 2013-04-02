<?php
class Meanbee_Shippingrules_Test_Model_Rule_Condition_Abstract extends EcomDev_PHPUnit_Test_Case {
    /** @var Meanbee_Shippingrules_Model_Rule_Condition_Abstract */
    protected $_obj = null;

    public function setUp() {
        $this->_obj = Mage::getModel('meanship/rule_condition_abstract');
    }

    public function tearDown() {
        $this->_obj = null;
    }

    /**
     * @test
     */
    public function testModelConstructed() {
        $this->assertInstanceOf('Meanbee_Shippingrules_Model_Rule_Condition_Abstract', $this->_obj);
    }

    public function testValidateAttributeEquality() {
        $this->_obj->setOperator('==');
        $this->_obj->setValue(9);

        $this->assertTrue($this->_obj->validateAttribute(9));
        $this->assertTrue($this->_obj->validateAttribute('9'));
        $this->assertFalse($this->_obj->validateAttribute(10));

        $this->assertTrue($this->_obj->validateAttribute(array(9)));
    }

    public function testValidateAttributeEqualityNegation() {
        $this->_obj->setOperator('!=');
        $this->_obj->setValue(5);

        $this->assertTrue($this->_obj->validateAttribute(9));
        $this->assertTrue($this->_obj->validateAttribute('9'));
        $this->assertFalse($this->_obj->validateAttribute(5));
        $this->assertFalse($this->_obj->validateAttribute('5'));
    }

    public function testValidateAttributeLessThan() {
        $this->_obj->setOperator("<");
        $this->_obj->setValue(9);

        $this->assertTrue($this->_obj->validateAttribute(8));
        $this->assertFalse($this->_obj->validateAttribute(10));
    }

    public function testValidateAttributeGreaterThan() {
        $this->_obj->setOperator(">");
        $this->_obj->setValue(9);

        $this->assertTrue($this->_obj->validateAttribute(10));
        $this->assertFalse($this->_obj->validateAttribute(8));
    }

    public function testValidateAttributeStartsWith() {
        $this->_obj->setOperator("^");
        $this->_obj->setValue("NICK");

        $this->assertTrue($this->_obj->validateAttribute("NICK"));
        $this->assertTrue($this->_obj->validateAttribute("NICKtest"));
        $this->assertTrue($this->_obj->validateAttribute("NICK1123"));
        $this->assertTrue($this->_obj->validateAttribute("NICK ste"));

        $this->assertFalse($this->_obj->validateAttribute(".NICK"));
        $this->assertFalse($this->_obj->validateAttribute("KCIN"));
        $this->assertFalse($this->_obj->validateAttribute(""));
    }

    public function testValidateAttributeEndsWith() {
        $this->_obj->setOperator("$");
        $this->_obj->setValue("NICK");

        $this->assertTrue($this->_obj->validateAttribute("NICK"));
        $this->assertTrue($this->_obj->validateAttribute("testNICK"));
        $this->assertTrue($this->_obj->validateAttribute("123NICK"));
        $this->assertTrue($this->_obj->validateAttribute("test NICK"));

        $this->assertFalse($this->_obj->validateAttribute("NICK."));
        $this->assertFalse($this->_obj->validateAttribute("KCIN "));
        $this->assertFalse($this->_obj->validateAttribute(""));
    }
}