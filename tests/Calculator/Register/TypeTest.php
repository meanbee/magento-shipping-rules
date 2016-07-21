<?php
class Calculator_Register_TypeTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Register_Type */
    private $register;
    
    private $type1;
    private $type2;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_ShippingRules_Calculator_Registers;
        $this->register = new Meanbee_ShippingRules_Calculator_Register_Type($this->registers);

        $this->type1 = $this->createMock(Meanbee_Shippingrules_Calculator_Type_Abstract::class);
        $this->type2 = $this->createMock(Meanbee_Shippingrules_Calculator_Type_Abstract::class);
    }

    public function testAdditionAndRemoval() {
        $this->assertFalse($this->register->has('_test_type'));
        $this->assertEquals($this->register, $this->register->add('_test_type', $this->type1));
        $this->assertTrue($this->register->has('_test_type'));
        $this->assertEquals('_test_type', $this->register->find($this->type1, true));
        $this->assertFalse($this->register->find($this->type2, true));
        $this->assertEquals($this->register, $this->register->add('_test_type', $this->type2));
        $this->assertTrue($this->register->has('_test_type'));
        $this->assertEquals('_test_type', $this->register->find($this->type1, true));
        $this->assertFalse($this->register->find($this->type2, true));
        $this->assertEquals($this->type1, $this->register->remove('_test_type'));
        $this->assertFalse($this->register->has('_test_type'));
        $this->assertFalse($this->register->find($this->type1, true));
        $this->assertEquals($this->register, $this->register->add('_test_type', $this->type2));
        $this->assertTrue($this->register->has('_test_type'));
        $this->assertEquals('_test_type', $this->register->find($this->type2, true));
        $this->assertFalse($this->register->find($this->type1, true));
    }

    public function testAccessor() {
        $this->register->add('_test_type', $this->type1);
        $this->assertEquals($this->type1, $this->register->get('_test_type'));
    }

    public function testNew() {
        $this->register->add('_test_type', $this->type1);
        $this->assertNull($this->register->newInstanceOf('_test_type', null));
    }
}
