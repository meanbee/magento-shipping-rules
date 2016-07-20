<?php
class Calculator_Term_ConstantTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Term_Constant */
    private $term;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->term = new Meanbee_Shippingrules_Calculator_Term_Constant($this->registers);

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
    }

    public function testInitialisation() {
        $this->assertEquals($this->term, $this->term->init(array(
            'value' => 3932
        ), $this->registers));
        
        $this->assertEquals(3932, $this->term->getValue());
    }

    public function testEvaluation() {
        $this->assertEquals(0, $this->term->evaluate($this->rateRequest));
        $this->term->setValue(1021);
        $this->assertEquals(1021, $this->term->evaluate($this->rateRequest));
    }
}