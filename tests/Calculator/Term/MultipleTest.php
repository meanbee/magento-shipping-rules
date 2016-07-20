<?php
class Calculator_Term_MultipleTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Term_Multiple */
    private $term;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->term = new Meanbee_Shippingrules_Calculator_Term_Multiple($this->registers);

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
    }

    public function testInitialisation() {
        $this->assertEquals($this->term, $this->term->init(array(
            'attribute' => '_test_variable',
            'value' => 3
        ), $this->registers));
        
        $this->assertEquals('_test_variable', $this->term->getVariable());
        $this->assertEquals(3, $this->term->getValue());
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

        $this->term->setValue(3);
        
        $this->term->setVariable('_test_variable');
        $this->assertEquals(44142, $this->term->evaluate($this->rateRequest));
        
        $this->term->setVariable('qty');
        $this->assertEquals(6, $this->term->evaluate($this->rateRequest));
    }
}