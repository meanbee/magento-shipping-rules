<?php
class Calculator_Type_NumberBase36Test extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Calculator_Registers */
    private $registers;
    
    /** @var Meanbee_Shippingrules_Calculator_Type_NumberBase36 */
    private $type;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();

        $this->registers = new Meanbee_Shippingrules_Calculator_Registers;
        $this->type = new Meanbee_Shippingrules_Calculator_Type_NumberBase36($this->registers);
    }

    public function testInstance()
    {
        $this->assertInstanceOf('Meanbee_Shippingrules_Calculator_Type_Abstract', $this->type);
    }

    public function testRegister()
    {
        $this->assertEquals(get_class($this->registers->getTypeRegister()->get('number_base36')), get_class($this->type));
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
        $this->assertEquals($this->type->sanitizeValidValue('0123456789ABCDEFGH'), 8419938611012682648060488);
        $this->assertEquals($this->type->sanitizeValidValue('IJKLMNOPQRSTUVWXYZ'), 5312981263549003226460404006);
    }

    public function testVariableValue()
    {
        $this->assertEquals($this->type->sanitizeVariableValue('0123456789ABCDEFGH'), 8419938611012682648060488);
        $this->assertEquals($this->type->sanitizeVariableValue('IJKLMNOPQRSTUVWXYZ'), 5312981263549003226460404006);
    }

    public function testExtensibility()
    {
        $this->type->addComparator('_testcomparator');
        $this->assertTrue($this->type->canBeHandledByComparator('_testcomparator', false));
        $this->type->removeComparator('_testcomparator', false);
        $this->assertFalse($this->type->canBeHandledByComparator('_testcomparator', false));
    }
}