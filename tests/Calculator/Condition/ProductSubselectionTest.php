<?php
class Calculator_Condition_ProductSubselectionTest
    extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Condition_ProductSubselection */
    private $condition;

    private $comparatorTrue;
    private $comparatorFalse;
    private $term;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->condition = new Meanbee_Shippingrules_Calculator_Condition_ProductSubselection($this->registers);

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
                              
        $this->term = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->term->method('init')
                   ->will($this->returnSelf());
        $this->term->method('evaluate')
                   ->willReturn(10);

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

        $this->assertEquals($this->condition, $this->condition->setTerm($this->term));
        $this->assertEquals($this->term, $this->condition->getTerm());
    }

    public function testInitialisation() {
        $this->registers->getComparatorRegister()->add('_test_comparator', $this->comparatorTrue);
        $this->assertEquals($this->condition, $this->condition->init(array(
            'variable' => 'price',
            'comparator' => array('key' => '_test_comparator'),
            'value' => '_test_value'
        ), $this->registers));

        $this->assertEquals('price', $this->condition->getVariable());
        $this->assertEquals($this->comparatorTrue, $this->condition->getComparator());
        $this->assertEquals('_test_value', $this->condition->getValue());
    }

    public function testCompoundInitialisation() {
        $this->registers->getComparatorRegister()->add('_test_comparator', $this->comparatorTrue);
        $this->registers->getTermRegister()->add('_test_term', $this->term);
        $this->assertEquals($this->condition, $this->condition->init(array(
            'variable' => 'product_subselection',
            'comparator' => array('key' => '_test_comparator'),
            'term' => array(
                'key' => '_test_term'
            ),
            'value' => '_test_value'
        ), $this->registers));

        $this->assertEquals('product_subselection', $this->condition->getVariable());
        $this->assertEquals($this->term, $this->condition->getTerm());
        $this->assertEquals('_test_value', $this->condition->getValue());
    }

    public function testVariables()
    {
        $this->assertArrayHasKey('product_subselection', $this->condition->getVariables());
    }

    public function testProductSubselection()
    {
        $this->condition->setVariable('product_subselection');

        $this->condition->setTerm($this->term);
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }
}