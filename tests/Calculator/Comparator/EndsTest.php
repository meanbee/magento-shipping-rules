<?php
class Calculator_Comparator_EndsTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Comparator_Ends */
    private $comparator;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->comparator = new Meanbee_Shippingrules_Calculator_Comparator_Ends($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Comparator_Abstract', $this->comparator);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getComparatorRegister()->get('ends')), get_class($this->comparator));
    }

    public function testTypes()
    {
        $this->assertTrue($this->comparator->canHandleType('string'));
    }

    public function testString()
    {
        $this->assertFalse($this->comparator->evaluate('a', 'abc', 'string'));
        $this->assertFalse($this->comparator->evaluate('b', 'abc', 'string'));
        $this->assertFalse($this->comparator->evaluate('d', 'abc', 'string'));
        $this->assertFalse($this->comparator->evaluate('C', 'abc', 'string'));

        $this->assertTrue($this->comparator->evaluate('c', 'abc', 'string'));

        $this->assertTrue($this->comparator->evaluate(array(
            'text' => 'CASES',
            'caseSensitive' => false
        ), 'endsDifferentCases', 'string'));
        $this->assertFalse($this->comparator->evaluate(array(
            'text' => 'CASES',
            'caseSensitive' => true
        ), 'endsDifferentCases', 'string'));
    }

    public function testExtensibility()
    {
        $this->comparator->addType('_testtype');
        $this->assertTrue($this->comparator->canHandleType('_testtype', false));
        $this->comparator->removeType('_testtype', false);
        $this->assertFalse($this->comparator->canHandleType('_testtype', false));
    }
}