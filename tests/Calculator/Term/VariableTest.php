<?php
class Calculator_Term_VariableTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Term_Variable */
    private $term;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->term = new Meanbee_Shippingrules_Calculator_Term_Variable($this->registers);

        $this->rateRequest = new Varien_Object;
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Term_Abstract', $this->term);
    }

    public function testModifiersAndAccessors()
    {
        $this->assertEquals($this->term, $this->term->setVariable('_test_variable'));
        $this->assertEquals('_test_variable', $this->term->getVariable());
        
        $this->assertEquals($this->term, $this->term->setProducts(array('Test Product')));
        $this->assertEquals(array('Test Product'), $this->term->getProducts());
    }

    public function testInitialisation() {
        $this->assertEquals($this->term, $this->term->init(array(
            'attribute' => '_test_variable',
            'value' => 0
        ), $this->registers));
        
        $this->assertEquals('_test_variable', $this->term->getVariable());
    }

    public function testEvaluation() {
        $this->assertEquals(0, $this->term->evaluate($this->rateRequest));

        $this->rateRequest->setAllItems(array(
            new Varien_Object(array(
                'product' => new Varien_Object(array(
                    '_test_variable' => 7357
                )),
                'qty' => 2
            ))
        ));
        
        $this->term->setVariable('_test_variable');
        $this->assertEquals(14714, $this->term->evaluate($this->rateRequest));
        
        $this->term->setVariable('qty');
        $this->assertEquals(2, $this->term->evaluate($this->rateRequest));
        
    }
}