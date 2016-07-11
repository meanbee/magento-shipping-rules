<?php
class Calculator_Type_NumberBase26Test extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Type_NumberBase26 */
    private $type;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->type = new Meanbee_Shippingrules_Calculator_Type_NumberBase26($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Type_Abstract', $this->type);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getTypeRegister()->get('number_base26')), get_class($this->type));
    }

    public function testComparators()
    {
        $this->assertTrue($this->type->canBeHandledByComparator('equal'));
        $this->assertTrue($this->type->canBeHandledByComparator('notequal'));
        $this->assertTrue($this->type->canBeHandledByComparator('lessthan'));
        $this->assertTrue($this->type->canBeHandledByComparator('greaterthan'));
        $this->assertTrue($this->type->canBeHandledByComparator('lessthanorequal'));
        $this->assertTrue($this->type->canBeHandledByComparator('greaterthanorequal'));
        $this->assertTrue($this->type->canBeHandledByComparator('between'));
    }

    public function testValidValue()
    {
        $this->assertEquals($this->type->sanitizeValidValue('ABCDEFGHIJKLM'), 3969844597125978);
        $this->assertEquals($this->type->sanitizeValidValue('NOPQRSTUVWXYZ'), 1294169338663068997);
    }

    public function testVariableValue()
    {
        $this->assertEquals($this->type->sanitizeVariableValue('ABCDEFGHIJKLM'), 3969844597125978);
        $this->assertEquals($this->type->sanitizeVariableValue('NOPQRSTUVWXYZ'), 1294169338663068997);
    }

    public function testExtensibility()
    {
        $this->type->addComparator('_testcomparator');
        $this->assertTrue($this->type->canBeHandledByComparator('_testcomparator', false));
        $this->type->removeComparator('_testcomparator', false);
        $this->assertFalse($this->type->canBeHandledByComparator('_testcomparator', false));
    }
}