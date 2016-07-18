<?php
class Calculator_Condition_PromotionTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Condition_Promotion */
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
        $this->condition = new Meanbee_Shippingrules_Calculator_Condition_Promotion($this->registers);

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
            'variable' => 'promo_free_shipping',
            'comparator' => array('key' => '_test_comparator'),
            'value' => '_test_value'
        ), $this->registers));

        $this->assertEquals('promo_free_shipping', $this->condition->getVariable());
        $this->assertEquals($this->comparatorTrue, $this->condition->getComparator());
        $this->assertEquals('_test_value', $this->condition->getValue());
    }

    public function testVariables()
    {
        $this->assertArrayHasKey('promo_free_shipping', $this->condition->getVariables());
        $this->assertArrayHasKey('promo_coupon_code', $this->condition->getVariables());
        $this->assertArrayHasKey('promo_applied_rule_ids', $this->condition->getVariables());
    }

    public function testRequestVariables()
    {
        $this->assertEquals($this->rateRequest, $this->condition->addVariablesToRequest($this->rateRequest));
        $this->assertArrayHasKey('promo_free_shipping', $this->rateRequest);
        $this->assertArrayHasKey('promo_coupon_code', $this->rateRequest);
        $this->assertArrayHasKey('promo_applied_rule_ids', $this->rateRequest);
    }

    public function testPromoFreeShipping()
    {
        $this->condition->setVariable('promo_free_shipping');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testPromoCouponCode()
    {
        $this->condition->setVariable('promo_coupon_code');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }

    public function testPromoAppliedRuleIds()
    {
        $this->condition->setVariable('promo_applied_rule_ids');
        
        $this->condition->setComparator($this->comparatorTrue);
        $this->assertTrue($this->condition->evaluate($this->rateRequest));

        $this->condition->setComparator($this->comparatorFalse);
        $this->assertFalse($this->condition->evaluate($this->rateRequest));
    }
}