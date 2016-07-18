<?php
class Calculator_Condition_Destination_PostalCodeTest
    extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Condition_Destination_PostalCode */
    private $condition;

    private $comparatorTrue;
    private $comparatorFalse;
    private $aggregatorTrue;
    private $aggregatorFalse;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->condition = new Meanbee_Shippingrules_Calculator_Condition_Destination_PostalCode($this->registers);

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
                              
        $this->aggregatorTrue = $this->createMock(Meanbee_Shippingrules_Calculator_Aggregator_Conjunctive::class);
        $this->aggregatorTrue->method('init')
                             ->will($this->returnSelf());
        $this->aggregatorTrue->method('evaluate')
                             ->willReturn(true);

        $this->aggregatorFalse = $this->createMock(Meanbee_Shippingrules_Calculator_Aggregator_Conjunctive::class);
        $this->aggregatorFalse->method('init')
                              ->will($this->returnSelf());
        $this->aggregatorFalse->method('evaluate')
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

        $this->assertEquals($this->condition, $this->condition->setAggregator($this->aggregatorTrue));
        $this->assertEquals($this->aggregatorTrue, $this->condition->getAggregator());
    }

    public function testInitialisation() {
        $this->registers->getComparatorRegister()->add('_test_comparator', $this->comparatorTrue);
        $this->assertEquals($this->condition, $this->condition->init(array(
            'variable' => 'dest_postal_code_full',
            'comparator' => array('key' => '_test_comparator'),
            'value' => '_test_value'
        ), $this->registers));

        $this->assertEquals('dest_postal_code_full', $this->condition->getVariable());
        $this->assertEquals($this->comparatorTrue, $this->condition->getComparator());
        $this->assertEquals('_test_value', $this->condition->getValue());
    }

    public function testCompoundInitialisation() {
        $this->registers->getAggregatorRegister()->add('_test_aggregator', $this->aggregatorTrue);
        $this->assertEquals($this->condition, $this->condition->init(array(
            'variable' => 'dest_postal_code',
            'aggregator' => array('key' => '_test_aggregator'),
            'value' => '_test_value'
        ), $this->registers));

        $this->assertEquals('dest_postal_code', $this->condition->getVariable());
        $this->assertEquals($this->aggregatorTrue, $this->condition->getAggregator());
        $this->assertEquals('_test_value', $this->condition->getValue());
    }

    public function testVariables()
    {
        $this->assertArrayHasKey('dest_postal_code', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_postal_code_full', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_postal_code_part1', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_postal_code_part2', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_postal_code_part3', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_postal_code_part4', $this->condition->getVariables());
    }

    public function testDestPostalCodeFull()
    {
        $this->condition->setVariable('dest_postal_code_full');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testDestPostalCodePart1()
    {
        $this->condition->setVariable('dest_postal_code_part1');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testDestPostalCodePart2()
    {
        $this->condition->setVariable('dest_postal_code_part2');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testDestPostalCodePart3()
    {
        $this->condition->setVariable('dest_postal_code_part3');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testDestPostalCodePart4()
    {
        $this->condition->setVariable('dest_postal_code_part4');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testCompoundEvaluation()
    {
        $this->condition->setVariable('dest_postal_code');
        
        $this->condition->setAggregator($this->aggregatorTrue);
        $this->condition->setValue('GB');
        $this->rateRequest->setData('dest_postcode', 'BA1 1EF');
        $this->assertTrue($this->condition->evaluate($this->rateRequest, array(array(
            'parser' => '/^([A-Z]{1,2})(\d{2}|\d[A-Z]?)(\d)([A-Z]{2})$/',
            'parts'  => array('str', 'str', 'b36', 'b10', 'b26'),
            'value'  => 'GB'
        ))));
        
        $this->condition->setAggregator($this->aggregatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest, array(array(
            'parser' => '/^([A-Z]{1,2})(\d{2}|\d[A-Z]?)(\d)([A-Z]{2})$/',
            'parts'  => array('str', 'str', 'b36', 'b10', 'b26'),
            'value'  => 'GB'
        ))));
        
        $this->assertEquals('BA11EF', $this->rateRequest->getData('dest_postal_code_full'));
        $this->assertEquals('BA', $this->rateRequest->getData('dest_postal_code_part1'));
        $this->assertEquals('1', $this->rateRequest->getData('dest_postal_code_part2'));
        $this->assertEquals('1', $this->rateRequest->getData('dest_postal_code_part3'));
        $this->assertEquals('EF', $this->rateRequest->getData('dest_postal_code_part4'));
    }
}