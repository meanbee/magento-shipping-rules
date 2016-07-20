<?php
class Calculator_Term_Conditional_MultipleTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Term_Conditional_Multiple */
    private $term;

    private $aggregatorTrue;
    private $aggregatorFalse;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->term = new Meanbee_Shippingrules_Calculator_Term_Conditional_Multiple($this->registers);

        $this->aggregatorTrue = $this->createMock(Meanbee_Shippingrules_Calculator_Aggregator_Abstract::class);
        $this->aggregatorTrue->method('init')
                             ->will($this->returnSelf());
        $this->aggregatorTrue->method('evaluate')
                             ->willReturn(array(new Varien_Object(array(
                                'product' => new Varien_Object(array(
                                    '_test_variable' => 7357
                                )),
                                'qty' => 2
                             ))));

        $this->aggregatorFalse = $this->createMock(Meanbee_Shippingrules_Calculator_Aggregator_Abstract::class);
        $this->aggregatorFalse->method('init')
                              ->will($this->returnSelf());
        $this->aggregatorFalse->method('evaluate')
                              ->willReturn(array());

        $this->rateRequest = new Varien_Object;
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Term_Abstract', $this->term);
    }

    public function testModifiersAndAccessors()
    {
        $this->assertEquals($this->term, $this->term->setValue('non numeric value'));
        $this->assertEquals(0, $this->term->getValue());
        
        $this->assertEquals($this->term, $this->term->setValue(3830));
        $this->assertEquals(3830, $this->term->getValue());
    
        $this->assertEquals($this->term, $this->term->setValue('2972'));
        $this->assertEquals(2972, $this->term->getValue());
    
        $this->assertEquals($this->term, $this->term->setValue(9.74));
        $this->assertEquals(9.74, $this->term->getValue());

        $this->assertEquals($this->term, $this->term->setVariable('_test_variable'));
        $this->assertEquals('_test_variable', $this->term->getVariable());
        
        $this->assertEquals($this->term, $this->term->setProducts(array('Test Product')));
        $this->assertEquals(array('Test Product'), $this->term->getProducts());

        $this->assertEquals($this->term, $this->term->setAggregator($this->aggregatorTrue));
        $this->assertEquals($this->aggregatorTrue, $this->term->getAggregator());
    }

    public function testInitialisation() {
        $this->registers->getAggregatorRegister()->add('_test_aggregator', $this->aggregatorTrue);
        $this->assertEquals($this->term, $this->term->init(array(
            'attribute' => '_test_variable',
            'value' => 3,
            'aggregator' => array(
                'key' => '_test_aggregator'
            )
        ), $this->registers));
        
        $this->assertEquals('_test_variable', $this->term->getVariable());
        $this->assertEquals($this->aggregatorTrue, $this->term->getAggregator());
        $this->assertEquals(3, $this->term->getValue());
    }

    public function testEvaluation() {
        $this->term->setAggregator($this->aggregatorTrue);
        $this->assertEquals(0, $this->term->evaluate($this->rateRequest));

        $this->term->setValue(3);

        $this->term->setVariable('_test_variable');
        $this->assertEquals(44142, $this->term->evaluate($this->rateRequest));
        
        $this->term->setVariable('qty');
        $this->assertEquals(6, $this->term->evaluate($this->rateRequest));

        $this->term->setAggregator($this->aggregatorFalse);
        $this->assertEquals(0, $this->term->evaluate($this->rateRequest));
    }
}