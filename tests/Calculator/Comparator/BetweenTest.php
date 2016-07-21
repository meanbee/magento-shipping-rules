<?php
class Calculator_Comparator_BetweenTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Comparator_Between */
    private $comparator;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->comparator = new Meanbee_Shippingrules_Calculator_Comparator_Between($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Comparator_Abstract', $this->comparator);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getComparatorRegister()->get('between')), get_class($this->comparator));
    }

    public function testTypes()
    {
        $this->assertTrue($this->comparator->canHandleType('number'));
        $this->assertTrue($this->comparator->canHandleType('number_base26'));
        $this->assertTrue($this->comparator->canHandleType('number_base36'));
    }

    public function testNumber()
    {
        $this->assertTrue($this->comparator->evaluate(array('1', '3'), 1, 'number'));
        $this->assertTrue($this->comparator->evaluate(array(1, 2), '1.5', 'number'));
        $this->assertTrue($this->comparator->evaluate(array(1, 1.5), 4/3, 'number'));
        $this->assertTrue($this->comparator->evaluate(array(1234567889, 1234567891), 1234567890, 'number'));
        $this->assertTrue($this->comparator->evaluate(array('-1', '+1'), '0', 'number'));
        $this->assertTrue($this->comparator->evaluate(array('+0.142857142856', '+0.142857142858'), '0.142857142857', 'number'));
        $this->assertTrue($this->comparator->evaluate(array('-6', '-4'), '-5', 'number'));
        
        $this->assertFalse($this->comparator->evaluate(array('1', '3'), 4, 'number'));
        $this->assertFalse($this->comparator->evaluate(array(1, 2), '2.5', 'number'));
        $this->assertFalse($this->comparator->evaluate(array(1, 1.5), 5/3, 'number'));
        $this->assertFalse($this->comparator->evaluate(array(1234567889, 1234567891), 1234567888, 'number'));
        $this->assertFalse($this->comparator->evaluate(array('-1', '+1'), '2', 'number'));
        $this->assertFalse($this->comparator->evaluate(array('+0.142857142856', '+0.142857142858'), '0.14285714285', 'number'));
        $this->assertFalse($this->comparator->evaluate(array('-6', '-4'), '-7', 'number'));

        $this->assertFalse($this->comparator->evaluate('1', 1, 'number'));
    }

    public function testNumberBase26()
    {
        $this->assertTrue($this->comparator->evaluate(array('A', 'C'), 'B', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate(array('B', 'D'), 'c', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate(array('c', 'e'), 'D', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate(array('d', 'f'), 'e', 'number_base26'));
        $this->assertTrue($this->comparator->evaluate(array('ABCDWXYX', 'ABCDWXYZ'), 'ABCDWXYY', 'number_base26'));
        
        $this->assertFalse($this->comparator->evaluate(array('A', 'C'), 'D', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate(array('B', 'D'), 'e', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate(array('c', 'e'), 'F', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate(array('d', 'f'), 'g', 'number_base26'));
        $this->assertFalse($this->comparator->evaluate(array('ABCDWXYX', 'ABCDWXYZ'), 'ABCDWXYW', 'number_base26'));
    }

    public function testNumberBase36()
    {
        $this->assertTrue($this->comparator->evaluate(array('1', '3'), '2', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array(1, 3), '2', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array('1', '3'), 2, 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array(1234567889, 1234567891), 1234567890, 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array('A', 'C'), 'B', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array('B', 'D'), 'c', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array('c', 'e'), 'D', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array('d', 'f'), 'e', 'number_base36'));
        $this->assertTrue($this->comparator->evaluate(array('12YX', '12YZ'), '12YY', 'number_base36'));

        
        $this->assertFalse($this->comparator->evaluate(array('1', '3'), 4, 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array(1, 3), '4', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array('1', '3'), 4, 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array(1234567889, 1234567891), 1234567888, 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array('A', 'C'), 'D', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array('B', 'D'), 'e', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array('c', 'e'), 'F', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array('d', 'f'), 'g', 'number_base36'));
        $this->assertFalse($this->comparator->evaluate(array('12YX', '12YZ'), '12YW', 'number_base36'));
    }

    public function testExtensibility()
    {
        $this->comparator->addType('_testtype');
        $this->assertTrue($this->comparator->canHandleType('_testtype', false));
        $this->comparator->removeType('_testtype', false);
        $this->assertFalse($this->comparator->canHandleType('_testtype', false));
    }
}