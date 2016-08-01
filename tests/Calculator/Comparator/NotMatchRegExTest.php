<?php
class Calculator_Comparator_NotMatchRegExTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Comparator_NotMatchRegEx */
    private $comparator;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->comparator = new Meanbee_Shippingrules_Calculator_Comparator_NotMatchRegEx($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Comparator_Abstract', $this->comparator);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getComparatorRegister()->get('notmatchregex')), get_class($this->comparator));
    }

    public function testTypes()
    {
        $this->assertTrue($this->comparator->canHandleType('string'));
    }

    public function testSimple()
    {
        $this->assertFalse($this->comparator->evaluate('^a$', 'a', 'string'));

        $this->assertTrue($this->comparator->evaluate('^a$', 'b', 'string'));
    }

    public function testComplex()
    {
        $this->assertFalse($this->comparator->evaluate(array('text' => '^a$', 'caseSensitive' => true), 'a', 'string'));
        $this->assertFalse($this->comparator->evaluate(array('text' => '^a$', 'caseSensitive' => false), 'a', 'string'));
        $this->assertFalse($this->comparator->evaluate(array('text' => '^a$', 'caseSensitive' => false), 'A', 'string'));
        
        $this->assertTrue($this->comparator->evaluate(array('text' => '^a$', 'caseSensitive' => true), 'A', 'string'));
    }
}