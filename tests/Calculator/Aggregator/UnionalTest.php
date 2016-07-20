<?php
class Calculator_Aggregator_UnionalTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Aggregator_Unional */
    private $aggregator;

    private $conditionTrue;
    private $conditionFalse;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->aggregator = new Meanbee_Shippingrules_Calculator_Aggregator_Unional($this->registers);

        $this->conditionTrue = $this->createMock(Meanbee_Shippingrules_Calculator_Condition_Abstract::class);
        $this->conditionTrue->method('init')
                             ->will($this->returnSelf());
        $this->conditionTrue->method('evaluate')
                             ->willReturn(true);

        $this->conditionFalse = $this->createMock(Meanbee_Shippingrules_Calculator_Condition_Abstract::class);
        $this->conditionFalse->method('init')
                              ->will($this->returnSelf());
        $this->conditionFalse->method('evaluate')
                              ->willReturn(false);

        $this->rateRequest = new Varien_Object;
        $this->rateRequest->setAllItems(array('Test Product'));
    }

    public function testModifiersAndAccessors()
    {
        $this->assertEquals($this->aggregator, $this->aggregator->setValue(false));
        $this->assertEquals(false, $this->aggregator->getValue());
    }

    public function testInitialisation() {
        $this->registers->getComparatorRegister()->add('_test_condition', $this->conditionTrue);
        $this->assertEquals($this->aggregator, $this->aggregator->init(array(
            'children' => array(array('register' => 'Condition', 'key' => '_test_condition')),
            'value' => false
        ), $this->registers));

        $this->assertEquals(false, $this->aggregator->getValue());
    }

    public function testAnyTrue()
    {
        $this->aggregator->setValue(true);
        $this->assertEquals(array(), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyTrue2True()
    {
        $this->aggregator->setValue(true);
        $this->aggregator->add($this->conditionTrue);
        $this->aggregator->add($this->conditionTrue);
        $this->assertEquals(array('Test Product'), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyTrue1True1False()
    {
        $this->aggregator->setValue(true);
        $this->aggregator->add($this->conditionTrue);
        $this->aggregator->add($this->conditionFalse);
        $this->assertEquals(array('Test Product'), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyTrue1False1True()
    {
        $this->aggregator->setValue(true);
        $this->aggregator->add($this->conditionFalse);
        $this->aggregator->add($this->conditionTrue);
        $this->assertEquals(array('Test Product'), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyTrue2False()
    {
        $this->aggregator->setValue(true);
        $this->aggregator->add($this->conditionFalse);
        $this->aggregator->add($this->conditionFalse);
        $this->assertEquals(array(), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyFalse()
    {
        $this->aggregator->setValue(false);
        $this->assertEquals(array(), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyFalse2True()
    {
        $this->aggregator->setValue(false);
        $this->aggregator->add($this->conditionTrue);
        $this->aggregator->add($this->conditionTrue);
        $this->assertEquals(array(), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyFalse1True1False()
    {
        $this->aggregator->setValue(false);
        $this->aggregator->add($this->conditionTrue);
        $this->aggregator->add($this->conditionFalse);
        $this->assertEquals(array('Test Product'), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyFalse1False1True()
    {
        $this->aggregator->setValue(false);
        $this->aggregator->add($this->conditionFalse);
        $this->aggregator->add($this->conditionTrue);
        $this->assertEquals(array('Test Product'), $this->aggregator->evaluate($this->rateRequest));
    }

    public function testAnyFalse2False()
    {
        $this->aggregator->setValue(false);
        $this->aggregator->add($this->conditionFalse);
        $this->aggregator->add($this->conditionFalse);
        $this->assertEquals(array('Test Product'), $this->aggregator->evaluate($this->rateRequest));
    }
}