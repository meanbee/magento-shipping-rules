<?php
class Calculator_Register_ConditionTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Register_Condition */
    private $register;
    
    private $condition1;
    private $condition2;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_ShippingRules_Calculator_Registers;
        $this->register = new Meanbee_ShippingRules_Calculator_Register_Condition($this->registers);

        $this->condition1 = $this->createMock(Meanbee_Shippingrules_Calculator_Condition_Abstract::class);
        $this->condition1->method('init')
                          ->will($this->returnSelf());

        $this->condition2 = $this->createMock(Meanbee_Shippingrules_Calculator_Condition_Abstract::class);
        $this->condition2->method('init')
                          ->will($this->returnSelf());
    }

    public function testAdditionAndRemoval() {
        $this->assertFalse($this->register->has('_test_condition'));
        $this->assertEquals($this->register, $this->register->add('_test_condition', $this->condition1));
        $this->assertTrue($this->register->has('_test_condition'));
        $this->assertEquals('_test_condition', $this->register->find($this->condition1, true));
        $this->assertFalse($this->register->find($this->condition2, true));
        $this->assertEquals($this->register, $this->register->add('_test_condition', $this->condition2));
        $this->assertTrue($this->register->has('_test_condition'));
        $this->assertEquals('_test_condition', $this->register->find($this->condition1, true));
        $this->assertFalse($this->register->find($this->condition2, true));
        $this->assertEquals($this->condition1, $this->register->remove('_test_condition'));
        $this->assertFalse($this->register->has('_test_condition'));
        $this->assertFalse($this->register->find($this->condition1, true));
        $this->assertEquals($this->register, $this->register->add('_test_condition', $this->condition2));
        $this->assertTrue($this->register->has('_test_condition'));
        $this->assertEquals('_test_condition', $this->register->find($this->condition2, true));
        $this->assertFalse($this->register->find($this->condition1, true));
    }

    public function testAccessor() {
        $this->register->add('_test_condition', $this->condition1);
        $this->assertEquals($this->condition1, $this->register->get('_test_condition'));
    }

    public function testNew() {
        $this->register->add('_test_condition', $this->condition1);
        $this->assertEquals($this->condition1, $this->register->newInstanceOf('_test_condition', null));
    }
}
