<?php
class Calculator_Register_AggregatorTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Register_Aggregator */
    private $register;
    
    private $aggregator1;
    private $aggregator2;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_ShippingRules_Calculator_Registers;
        $this->register = new Meanbee_ShippingRules_Calculator_Register_Aggregator($this->registers);

        $this->aggregator1 = $this->createMock(Meanbee_Shippingrules_Calculator_Aggregator_Abstract::class);
        $this->aggregator1->method('init')
                          ->will($this->returnSelf());

        $this->aggregator2 = $this->createMock(Meanbee_Shippingrules_Calculator_Aggregator_Abstract::class);
        $this->aggregator2->method('init')
                          ->will($this->returnSelf());
    }

    public function testAdditionAndRemoval() {
        $this->assertFalse($this->register->has('_test_aggregator'));
        $this->assertEquals($this->register, $this->register->add('_test_aggregator', $this->aggregator1));
        $this->assertTrue($this->register->has('_test_aggregator'));
        $this->assertEquals('_test_aggregator', $this->register->find($this->aggregator1, true));
        $this->assertFalse($this->register->find($this->aggregator2, true));
        $this->assertEquals($this->register, $this->register->add('_test_aggregator', $this->aggregator2));
        $this->assertTrue($this->register->has('_test_aggregator'));
        $this->assertEquals('_test_aggregator', $this->register->find($this->aggregator1, true));
        $this->assertFalse($this->register->find($this->aggregator2, true));
        $this->assertEquals($this->aggregator1, $this->register->remove('_test_aggregator'));
        $this->assertFalse($this->register->has('_test_aggregator'));
        $this->assertFalse($this->register->find($this->aggregator1, true));
        $this->assertEquals($this->register, $this->register->add('_test_aggregator', $this->aggregator2));
        $this->assertTrue($this->register->has('_test_aggregator'));
        $this->assertEquals('_test_aggregator', $this->register->find($this->aggregator2, true));
        $this->assertFalse($this->register->find($this->aggregator1, true));
    }

    public function testAccessor() {
        $this->register->add('_test_aggregator', $this->aggregator1);
        $this->assertEquals($this->aggregator1, $this->register->get('_test_aggregator'));
    }

    public function testNew() {
        $this->register->add('_test_aggregator', $this->aggregator1);
        $this->assertEquals($this->aggregator1, $this->register->newInstanceOf('_test_aggregator', null));
    }
}
