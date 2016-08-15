<?php
class Calculator_Type_EnumTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Type_Enum */
    private $type;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->type = new Meanbee_Shippingrules_Calculator_Type_Enum($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Type_Abstract', $this->type);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getTypeRegister()->get('enum')), get_class($this->type));
    }

    public function testComparators()
    {
        $this->assertTrue($this->type->canBeHandledByComparator('oneof'));
        $this->assertTrue($this->type->canBeHandledByComparator('notoneof'));
    }

    public function testValidValue()
    {
        $this->assertEquals($this->type->sanitizeValidValue(4), 4);
        $this->assertEquals($this->type->sanitizeValidValue('5'), '5');
        $this->assertEquals($this->type->sanitizeValidValue('06'), '06');
        $this->assertEquals($this->type->sanitizeValidValue(-7), -7);
        $this->assertEquals($this->type->sanitizeValidValue('+8'), '+8');
    }

    public function testVariableValue()
    {
        $this->assertEquals($this->type->sanitizeVariableValue(4), 4);
        $this->assertEquals($this->type->sanitizeVariableValue('5'), '5');
        $this->assertEquals($this->type->sanitizeVariableValue('06'), '06');
        $this->assertEquals($this->type->sanitizeVariableValue(-7), -7);
        $this->assertEquals($this->type->sanitizeVariableValue('+8'), '+8');
    }

    public function testExtensibility()
    {
        $this->type->addComparator('_testcomparator');
        $this->assertTrue($this->type->canBeHandledByComparator('_testcomparator', false));
        $this->type->removeComparator('_testcomparator', false);
        $this->assertFalse($this->type->canBeHandledByComparator('_testcomparator', false));
    }
}