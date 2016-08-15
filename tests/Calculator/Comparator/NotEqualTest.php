<?php
class Calculator_Comparator_NotEqualTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Comparator_NotEqual */
    private $comparator;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->comparator = new Meanbee_Shippingrules_Calculator_Comparator_NotEqual($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Comparator_Abstract', $this->comparator);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getComparatorRegister()->get('notequal')), get_class($this->comparator));
    }

    public function testTypes()
    {
        $this->assertTrue($this->comparator->canHandleType('number'));
        $this->assertTrue($this->comparator->canHandleType('number_base26'));
        $this->assertTrue($this->comparator->canHandleType('number_base36'));
        $this->assertTrue($this->comparator->canHandleType('string'));
    }

    public function testNumber()
    {
        $this->assertFalse($this->comparator->evaluate('1', 1, 'number'));
        $this->assertFalse($this->comparator->evaluate(1.5, '1.5', 'number'));
        $this->assertFalse($this->comparator->evaluate(4/3, 4/3, 'number'));
        $this->assertFalse($this->comparator->evaluate(1234567890, 1234567890, 'number'));
        $this->assertFalse($this->comparator->evaluate('-0', '0', 'number'));
        $this->assertFalse($this->comparator->evaluate('+0.142857142857', '0.142857142857', 'number'));
        $this->assertFalse($this->comparator->evaluate('-5', '-5', 'number'));

        $this->assertTrue($this->comparator->evaluate(1, 2, 'number'));
        $this->assertTrue($this->comparator->evaluate(4/3, 1.33333333334, 'number'));
    }

    public function testNumberBase26()
    {
        $this->assertFalse($this->comparator->evaluate('A', 'A', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate('B', 'b', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate('c', 'C', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate('d', 'd', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate('ABCDWXYZ', 'ABCDWXYZ', 'number_base26'));
        
        $this->assertTrue($this->comparator->evaluate('0123456789KLMNOPQRSTUVWXYZ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('0123456789KLMNOPQRSTUVWXYZ', '0123456789KLMNOPQRSTUVWXYZ', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('?', '?', 'number_base26'));
    }

    public function testNumberBase36()
    {
        $this->assertFalse($this->comparator->evaluate('1', 1, 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(2, '2', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('3', '3', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(1234567890, 1234567890, 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('A', 'A', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('B', 'b', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('c', 'C', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('d', 'd', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('12YZ', '12YZ', 'number_base36'));
        
        $this->assertTrue($this->comparator->evaluate('01YZ', 'ABYZ', 'number_base36'));
    }

    public function testString()
    {
        $this->assertFalse($this->comparator->evaluate('same', 'same', 'string'));
        $this->assertTrue($this->comparator->evaluate('same', 'different', 'string'));

        $this->assertFalse($this->comparator->evaluate(array(
            'text' => 'differentCases',
            'caseSensitive' => false
        ), 'DIFFERENTCASES', 'string'));
        $this->assertTrue($this->comparator->evaluate(array(
            'text' => 'differentCases',
            'caseSensitive' => true
        ), 'DIFFERENTCASES', 'string'));
    }

    public function testExtensibility()
    {
        $this->comparator->addType('_testtype');
        $this->assertTrue($this->comparator->canHandleType('_testtype', false));
        $this->comparator->removeType('_testtype', false);
        $this->assertFalse($this->comparator->canHandleType('_testtype', false));
    }
}