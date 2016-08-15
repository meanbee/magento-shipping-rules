<?php
class Calculator_Comparator_OneOfTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Comparator_OneOf */
    private $comparator;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->comparator = new Meanbee_Shippingrules_Calculator_Comparator_OneOf($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Comparator_Abstract', $this->comparator);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getComparatorRegister()->get('oneof')), get_class($this->comparator));
    }

    public function testTypes()
    {
        $this->assertTrue($this->comparator->canHandleType('enum'));
        $this->assertTrue($this->comparator->canHandleType('number'));
        $this->assertTrue($this->comparator->canHandleType('number_base26'));
        $this->assertTrue($this->comparator->canHandleType('number_base36'));
        $this->assertTrue($this->comparator->canHandleType('string'));
    }

    public function testEnum()
    {
        $this->assertTrue($this->comparator->evaluate(array(1, 2, 3), 1, 'enum'));
        $this->assertFalse($this->comparator->evaluate(array(1, 2, 3), 4, 'enum'));
    }

    public function testNumber()
    {
        $this->assertTrue($this->comparator->evaluate(array('-0', 3.14, '89'), 0, 'number'));
        $this->assertTrue($this->comparator->evaluate(array('-0', 3.14, '89'), 3.14, 'number'));
        $this->assertTrue($this->comparator->evaluate(array('-0', 3.14, '89'), 89, 'number'));
        $this->assertFalse($this->comparator->evaluate(array('-0', 3.14, '89'), '2', 'number'));
    }

    public function testNumberBase26()
    {
        $this->assertTrue($this->comparator->evaluate(array('A', 'B', 'C'), 'A', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate(array('A', 'B', 'C'), 'D', 'number_base26'));
    }

    public function testNumberBase36()
    {
        $this->assertTrue($this->comparator->evaluate(array('A', '1B', '20'), 'A', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array('A', '1B', '20'), '1B', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array('A', '1B', '20'), '20', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array('A', '1B', '20'), '12', 'number_base36'));
    }

    public function testString()
    {
        $this->assertTrue($this->comparator->evaluate(array('a', 'string', 'array'), 'string', 'string'));
        $this->assertFalse($this->comparator->evaluate(array('a', 'string', 'array'), 'notinarray', 'string'));
        $this->assertTrue($this->comparator->evaluate(array(0 => 'a', 1 => 'string', 2 => 'array', 'caseSensitive' => false), 'STRING', 'string'));
        $this->assertFalse($this->comparator->evaluate(array(0 => 'a', 1 => 'string', 2 => 'array', 'caseSensitive' => false), 'NOTINARRAY', 'string'));
    }

    public function testExtensibility()
    {
        $this->comparator->addType('_testtype');
        $this->assertTrue($this->comparator->canHandleType('_testtype', false));
        $this->comparator->removeType('_testtype', false);
        $this->assertFalse($this->comparator->canHandleType('_testtype', false));
    }
}