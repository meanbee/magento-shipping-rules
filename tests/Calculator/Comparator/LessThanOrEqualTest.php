<?php
class Calculator_Comparator_LessThanOrEqualTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Comparator_LessThanOrEqual */
    private $comparator;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->comparator = new Meanbee_Shippingrules_Calculator_Comparator_LessThanOrEqual($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Comparator_Abstract', $this->comparator);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getComparatorRegister()->get('lessthanorequal')), get_class($this->comparator));
    }

    public function testTypes()
    {
        $this->assertTrue($this->comparator->canHandleType('number'));
        $this->assertTrue($this->comparator->canHandleType('number_base26'));
        $this->assertTrue($this->comparator->canHandleType('number_base36'));
    }

    public function testNumber()
    {
        $this->assertTrue($this->comparator->evaluate('1', 1, 'number'));
        $this->assertTrue($this->comparator->evaluate(1.5, '1.5', 'number'));
        $this->assertTrue($this->comparator->evaluate(4/3, 4/3, 'number'));
        $this->assertTrue($this->comparator->evaluate(1234567890, 1234567890, 'number'));
        $this->assertTrue($this->comparator->evaluate('-0', '0', 'number'));
        $this->assertTrue($this->comparator->evaluate('+0.142857142857', '0.142857142857', 'number'));
        $this->assertTrue($this->comparator->evaluate('-5', '-5', 'number'));

        $this->assertFalse($this->comparator->evaluate('1', 2, 'number'));
        $this->assertFalse($this->comparator->evaluate(1.5, '2.5', 'number'));
        $this->assertFalse($this->comparator->evaluate(1, 4/3, 'number'));
        $this->assertFalse($this->comparator->evaluate(123456789, 1234567890, 'number'));

        $this->assertTrue($this->comparator->evaluate(2, '1', 'number'));
        $this->assertTrue($this->comparator->evaluate('2.5', '1.5', 'number'));
        $this->assertTrue($this->comparator->evaluate(4/3, 1, 'number'));
        $this->assertTrue($this->comparator->evaluate(1234567890, 123456789, 'number'));
    }

    public function testNumberBase26()
    {
        $this->assertTrue($this->comparator->evaluate('A', 'A', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('B', 'b', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('c', 'C', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('d', 'd', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('ABCDWXYZ', 'ABCDWXYZ', 'number_base26'));
        
        $this->assertFalse($this->comparator->evaluate('A', 'B', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate('B', 'c', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate('c', 'D', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate('d', 'e', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate('ABCDWXY', 'ABCDWXYZ', 'number_base26'));
        
        $this->assertTrue($this->comparator->evaluate('B', 'A', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('c', 'B', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('D', 'c', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('e', 'd', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate('ABCDWXYZ', 'ABCDWXY', 'number_base26'));
    }

    public function testNumberBase36()
    {
        $this->assertTrue($this->comparator->evaluate('1', 1, 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(2, '2', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('3', '3', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(1234567890, 1234567890, 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('A', 'A', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('B', 'b', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('c', 'C', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('d', 'd', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('12YZ', '12YZ', 'number_base36'));
        
        $this->assertFalse($this->comparator->evaluate('1', 2, 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(2, '3', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('3', '4', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(123456789, 1234567890, 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('A', 'B', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('B', 'c', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('c', 'D', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('d', 'e', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate('12Y', '12YZ', 'number_base36'));
        
        $this->assertTrue($this->comparator->evaluate(2, '1', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('3', 2, 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('4', '3', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(1234567890, 123456789, 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('B', 'A', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('c', 'B', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('d', 'C', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('e', 'd', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate('12YZ', '12Y', 'number_base36'));
    }

    public function testExtensibility()
    {
        $this->comparator->addType('_testtype');
        $this->assertTrue($this->comparator->canHandleType('_testtype', false));
        $this->comparator->removeType('_testtype', false);
        $this->assertFalse($this->comparator->canHandleType('_testtype', false));
    }
}