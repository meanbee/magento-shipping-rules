<?php
class Calculator_Type_BooleanTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Type_Boolean */
    private $type;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->type = new Meanbee_Shippingrules_Calculator_Type_Boolean($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Type_Abstract', $this->type);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getTypeRegister()->get('boolean')), get_class($this->type));
    }

    public function testComparators()
    {
        $this->assertTrue($this->type->canBeHandledByComparator('equal'));
        $this->assertTrue($this->type->canBeHandledByComparator('notequal'));
    }

    public function testValidValue()
    {
        $this->assertEquals($this->type->sanitizeValidValue(1), true);
        $this->assertEquals($this->type->sanitizeValidValue(0), false);
        $this->assertEquals($this->type->sanitizeValidValue(true), true);
        $this->assertEquals($this->type->sanitizeValidValue(false), false);
        $this->assertEquals($this->type->sanitizeValidValue('1'), true);
        $this->assertEquals($this->type->sanitizeValidValue('0'), false);
    }

    public function testVariableValue()
    {
        $this->assertEquals($this->type->sanitizeVariableValue(1), true);
        $this->assertEquals($this->type->sanitizeVariableValue(0), false);
        $this->assertEquals($this->type->sanitizeVariableValue(true), true);
        $this->assertEquals($this->type->sanitizeVariableValue(false), false);
        $this->assertEquals($this->type->sanitizeVariableValue('1'), true);
        $this->assertEquals($this->type->sanitizeVariableValue('0'), false);
    }

    public function testExtensibility()
    {
        $this->type->addComparator('_testcomparator');
        $this->assertTrue($this->type->canBeHandledByComparator('_testcomparator', false));
        $this->type->removeComparator('_testcomparator', false);
        $this->assertFalse($this->type->canBeHandledByComparator('_testcomparator', false));
    }
}