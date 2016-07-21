<?php
class Calculator_Register_ComparatorTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Register_Comparator */
    private $register;
    
    private $comparator1;
    private $comparator2;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_ShippingRules_Calculator_Registers;
        $this->register = new Meanbee_ShippingRules_Calculator_Register_Comparator($this->registers);

        $this->comparator1 = $this->createMock(Meanbee_Shippingrules_Calculator_Comparator_Abstract::class);
        $this->comparator1->method('init')
                          ->will($this->returnSelf());

        $this->comparator2 = $this->createMock(Meanbee_Shippingrules_Calculator_Comparator_Abstract::class);
        $this->comparator2->method('init')
                          ->will($this->returnSelf());
    }

    public function testAdditionAndRemoval() {
        $this->assertFalse($this->register->has('_test_comparator'));
        $this->assertEquals($this->register, $this->register->add('_test_comparator', $this->comparator1));
        $this->assertTrue($this->register->has('_test_comparator'));
        $this->assertEquals('_test_comparator', $this->register->find($this->comparator1, true));
        $this->assertFalse($this->register->find($this->comparator2, true));
        $this->assertEquals($this->register, $this->register->add('_test_comparator', $this->comparator2));
        $this->assertTrue($this->register->has('_test_comparator'));
        $this->assertEquals('_test_comparator', $this->register->find($this->comparator1, true));
        $this->assertFalse($this->register->find($this->comparator2, true));
        $this->assertEquals($this->comparator1, $this->register->remove('_test_comparator'));
        $this->assertFalse($this->register->has('_test_comparator'));
        $this->assertFalse($this->register->find($this->comparator1, true));
        $this->assertEquals($this->register, $this->register->add('_test_comparator', $this->comparator2));
        $this->assertTrue($this->register->has('_test_comparator'));
        $this->assertEquals('_test_comparator', $this->register->find($this->comparator2, true));
        $this->assertFalse($this->register->find($this->comparator1, true));
    }

    public function testAccessor() {
        $this->register->add('_test_comparator', $this->comparator1);
        $this->assertEquals($this->comparator1, $this->register->get('_test_comparator'));
    }

    public function testNew() {
        $this->register->add('_test_comparator', $this->comparator1);
        $this->assertEquals($this->comparator1, $this->register->newInstanceOf('_test_comparator', null));
    }
}
