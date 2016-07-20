<?php
class Calculator_Aggregator_SummativeTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;

    /** @var Meanbee_Shippingrules_Calculator_Aggregator_Summative */
    private $aggregator;

    private $termThousandth;
    private $termHundredth;
    private $termTenth;
    private $termUnit;
    private $termTen;
    private $termHundred;

    /** @var Varien_Object */
    private $rateRequest;
    
    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->aggregator = new Meanbee_Shippingrules_Calculator_Aggregator_Summative($this->registers);

        $this->termThousandth = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->termThousandth->method('init')
                             ->will($this->returnSelf());
        $this->termThousandth->method('evaluate')
                             ->willReturn(0.001);

        $this->termHundredth = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->termHundredth->method('init')
                            ->will($this->returnSelf());
        $this->termHundredth->method('evaluate')
                            ->willReturn(0.01);

        $this->termTenth = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->termTenth->method('init')
                        ->will($this->returnSelf());
        $this->termTenth->method('evaluate')
                        ->willReturn(0.1);

        $this->termUnit = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->termUnit->method('init')
                       ->will($this->returnSelf());
        $this->termUnit->method('evaluate')
                       ->willReturn(1);

        $this->termTen = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->termTen->method('init')
                      ->will($this->returnSelf());
        $this->termTen->method('evaluate')
                      ->willReturn(10);

        $this->termHundred = $this->createMock(Meanbee_Shippingrules_Calculator_Term_Abstract::class);
        $this->termHundred->method('init')
                          ->will($this->returnSelf());
        $this->termHundred->method('evaluate')
                          ->willReturn(100);

        $this->rateRequest = new Varien_Object;
        $this->rateRequest->setAllItems(array('Test Product'));
    }

    public function testInitialisation() {
        $this->registers->getComparatorRegister()->add('_test_term', $this->termHundred);
        $this->assertEquals($this->aggregator, $this->aggregator->init(array(
            'children' => array(array('register' => 'Term', 'key' => '_test_term')),
        ), $this->registers));
    }

    public function test0()
    {
        $this->assertEquals(0, $this->aggregator->evaluate($this->rateRequest));
    }

    public function testPoint001()
    {
        $this->aggregator->add($this->termThousandth);
        $this->assertEquals(0.001, $this->aggregator->evaluate($this->rateRequest));
    }

    public function testPoint011()
    {
        $this->aggregator->add($this->termThousandth);
        $this->aggregator->add($this->termHundredth);
        $this->assertEquals(0.011, $this->aggregator->evaluate($this->rateRequest));
    }

    public function testPoint111()
    {
        $this->aggregator->add($this->termThousandth);
        $this->aggregator->add($this->termHundredth);
        $this->aggregator->add($this->termTenth);
        $this->assertEquals(0.111, $this->aggregator->evaluate($this->rateRequest));
    }

    public function test1Point111()
    {
        $this->aggregator->add($this->termThousandth);
        $this->aggregator->add($this->termHundredth);
        $this->aggregator->add($this->termTenth);
        $this->aggregator->add($this->termUnit);
        $this->assertEquals(1.111, $this->aggregator->evaluate($this->rateRequest));
    }

    public function test11Point111()
    {
        $this->aggregator->add($this->termThousandth);
        $this->aggregator->add($this->termHundredth);
        $this->aggregator->add($this->termTenth);
        $this->aggregator->add($this->termUnit);
        $this->aggregator->add($this->termTen);
        $this->assertEquals(11.111, $this->aggregator->evaluate($this->rateRequest));
    }

    public function test111Point111()
    {
        $this->aggregator->add($this->termThousandth);
        $this->aggregator->add($this->termHundredth);
        $this->aggregator->add($this->termTenth);
        $this->aggregator->add($this->termUnit);
        $this->aggregator->add($this->termTen);
        $this->aggregator->add($this->termHundred);
        $this->assertEquals(111.111, $this->aggregator->evaluate($this->rateRequest));
    }
}