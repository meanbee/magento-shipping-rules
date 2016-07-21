<?php
class Calculator_Register_TermTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Register_Term */
    private $register;
    
    private $term1;
    private $term2;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_ShippingRules_Calculator_Registers;
        $this->register = new Meanbee_ShippingRules_Calculator_Register_Term($this->registers);

        $this->term1 = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->term1->method('init')
                          ->will($this->returnSelf());

        $this->term2 = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->term2->method('init')
                          ->will($this->returnSelf());
    }

    public function testAdditionAndRemoval() {
        $this->assertFalse($this->register->has('_test_term'));
        $this->assertEquals($this->register, $this->register->add('_test_term', $this->term1));
        $this->assertTrue($this->register->has('_test_term'));
        $this->assertEquals('_test_term', $this->register->find($this->term1, true));
        $this->assertFalse($this->register->find($this->term2, true));
        $this->assertEquals($this->register, $this->register->add('_test_term', $this->term2));
        $this->assertTrue($this->register->has('_test_term'));
        $this->assertEquals('_test_term', $this->register->find($this->term1, true));
        $this->assertFalse($this->register->find($this->term2, true));
        $this->assertEquals($this->term1, $this->register->remove('_test_term'));
        $this->assertFalse($this->register->has('_test_term'));
        $this->assertFalse($this->register->find($this->term1, true));
        $this->assertEquals($this->register, $this->register->add('_test_term', $this->term2));
        $this->assertTrue($this->register->has('_test_term'));
        $this->assertEquals('_test_term', $this->register->find($this->term2, true));
        $this->assertFalse($this->register->find($this->term1, true));
    }

    public function testAccessor() {
        $this->register->add('_test_term', $this->term1);
        $this->assertEquals($this->term1, $this->register->get('_test_term'));
    }

    public function testNew() {
        $this->register->add('_test_term', $this->term1);
        $this->assertEquals($this->term1, $this->register->newInstanceOf('_test_term', null));
    }
}
