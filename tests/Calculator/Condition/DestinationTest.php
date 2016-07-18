<?php
class Calculator_Condition_DestinationTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Condition_Destination */
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
        $this->condition = new Meanbee_Shippingrules_Calculator_Condition_Destination($this->registers);

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
            'variable' => 'dest_street_address_l1',
            'comparator' => array('key' => '_test_comparator'),
            'value' => '_test_value'
        ), $this->registers));

        $this->assertEquals('dest_street_address_l1', $this->condition->getVariable());
        $this->assertEquals($this->comparatorTrue, $this->condition->getComparator());
        $this->assertEquals('_test_value', $this->condition->getValue());
    }

    public function testVariables()
    {
        $this->assertArrayHasKey('dest_street_address_l1', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_street_address_l2', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_country_id', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_country_group', $this->condition->getVariables());
        $this->assertArrayHasKey('dest_region_id', $this->condition->getVariables());
    }

    public function testRequestVariables()
    {
        $this->assertEquals($this->rateRequest, $this->condition->addVariablesToRequest($this->rateRequest));
        Mage::log($this->rateRequest->getData(), Zend_Log::DEBUG, 'debug.log', true);
        $this->assertArrayHasKey('dest_street_address_l1', $this->rateRequest);
        $this->assertArrayHasKey('dest_street_address_l2', $this->rateRequest);
        $this->assertArrayHasKey('dest_country_group', $this->rateRequest);
    }

    public function testDestStreetAddressL1()
    {
        $this->condition->setVariable('dest_street_address_l1');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testDestStreetAddressL2()
    {
        $this->condition->setVariable('dest_street_address_l2');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testDestCountryId()
    {
        $this->condition->setVariable('dest_country_id');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testDestCountryGroup()
    {
        $this->condition->setVariable('dest_country_group');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testDestRegionId()
    {
        $this->condition->setVariable('dest_region_id');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }
}