<?php
class Calculator_Condition_CartTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Condition_Cart */
    private $condition;

    private $comparatorTrue;
    private $comparatorFalse;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->condition = new Meanbee_Shippingrules_Calculator_Condition_Cart($this->registers);

        $this->comparatorTrue = $this->createMock(Meanbee_Shippingrules_Calculator_Comparator_Abstract::class);
        $this->comparatorTrue->method('init')
                             ->will($this->returnSelf());
        $this->comparatorTrue->method('evaluate')
                             ->willReturn(true);

        $this->comparatorFalse = $this->createMock(Meanbee_Shippingrules_Calculator_Comparator_Abstract::class);
        $this->comparatorFalse->method('init')
                              ->will($this->returnSelf());
        $this->comparatorFalse->method('evaluate')
                              ->willReturn(false);

        $this->rateRequest = new Varien_Object;
    }

    public function testModifiersAndAccessors()
    {
        $this->assertEquals($this->condition, $this->condition->setVariable('_test_variable'));
        $this->assertEquals('_test_variable', $this->condition->getVariable());

        $this->assertEquals($this->condition, $this->condition->setComparator($this->comparatorTrue));
        $this->assertEquals($this->comparatorTrue, $this->condition->getComparator());

        $this->assertEquals($this->condition, $this->condition->setValue('_test_value'));
        $this->assertEquals('_test_value', $this->condition->getValue());
    }

    public function testInitialisation() {
        $this->registers->getComparatorRegister()->add('_test_comparator', $this->comparatorTrue);
        $this->assertEquals($this->condition, $this->condition->init(array(
            'variable' => 'package_weight',
            'comparator' => array('key' => '_test_comparator'),
            'value' => '_test_value'
        ), $this->registers));

        $this->assertEquals('package_weight', $this->condition->getVariable());
        $this->assertEquals($this->comparatorTrue, $this->condition->getComparator());
        $this->assertEquals('_test_value', $this->condition->getValue());
    }

    public function testVariables()
    {
        $this->assertArrayHasKey('package_weight', $this->condition->getVariables());
        $this->assertArrayHasKey('package_qty', $this->condition->getVariables());
        $this->assertArrayHasKey('package_value', $this->condition->getVariables());
        $this->assertArrayHasKey('base_subtotal_incl_tax', $this->condition->getVariables());
        $this->assertArrayHasKey('package_value_with_discount', $this->condition->getVariables());
    }

    public function testPackageWeight()
    {
        $this->condition->setVariable('package_weight');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testPackageQty()
    {
        $this->condition->setVariable('package_qty');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testPackageValue()
    {
        $this->condition->setVariable('package_value');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testBaseSubtotalInclTax()
    {
        $this->condition->setVariable('base_subtotal_incl_tax');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testPackageValueWithDiscount()
    {
        $this->condition->setVariable('package_value_with_discount');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }
}