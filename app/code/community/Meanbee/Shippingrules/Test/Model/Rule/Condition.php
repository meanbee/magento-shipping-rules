<?php
class Meanbee_Shippingrules_Test_Model_Rule_Condition extends EcomDev_PHPUnit_Test_Case {
    /** @var Meanbee_Shippingrules_Model_Rule_Condition */
    protected $_obj = null;

    public function setUp() {
        $this->_obj = Mage::getModel('meanship/rule_condition');
    }

    public function tearDown() {
        $this->_obj = null;
    }

    /**
     * @test
     */
    public function testModelConstructed() {
        $this->assertInstanceOf('Meanbee_Shippingrules_Model_Rule_Condition', $this->_obj);
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testStringOperators($a, $op, $b, $pass_str) {

        /**
         * Does $a $op $b, e.g. 1 == 2?  We need to store $b in our rule, and use $a as the
         * value we're validating, i.e. the value in the rate request.
         */

        $attribute_name = 'test_attribute';
        $pass = ($pass_str == 'true');

        $this->_obj->setData(array(
            'attribute'          => $attribute_name,
            'operator'           => $op,
            'value'              => $b,
            'is_value_processed' => 0,
            'rule'               => Mage::getModel('meanship/rule')
        ));

        $this->assertEquals($pass, $this->_obj->validate(new Varien_Object(array(
            $attribute_name => $a
        ))));
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testMulitSelectOperators($a, $op, $b, $pass_str) {

        /**
         * Does $a $op $b, e.g. 1 == 2?  We need to store $b in our rule, and use $a as the
         * value we're validating, i.e. the value in the rate request.
         */

        $attribute_name = 'customer_group_id'; // Use an attribute that's a multiselect
        $pass = ($pass_str == 'true');

        $this->_obj->setData(array(
            'attribute'          => $attribute_name,
            'operator'           => $op,
            'value'              => $b,
            'is_value_processed' => 0,
            'rule'               => Mage::getModel('meanship/rule')
        ));

        $this->assertTrue($this->_obj->isArrayOperatorType());
        $this->assertEquals('multiselect', $this->_obj->getInputType());

        $this->assertEquals($pass, $this->_obj->validate(new Varien_Object(array(
            $attribute_name => $a
        ))));
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testSanitisation($attribute_name, $input, $output) {
        $this->_obj->setData(array(
            'attribute'          => $attribute_name,
            'operator'           => '',
            'value'              => $input,
            'is_value_processed' => 0,
            'rule'               => Mage::getModel('meanship/rule')
        ));

        $this->assertEquals($output, $this->_obj->getSanitisedValue(new Varien_Object(array(
            $attribute_name => $input
        ))));
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testValueParsing($attribute_name, $input, $operator, $output) {
        $this->_obj->setData(array(
            'attribute'          => $attribute_name,
            'operator'           => $operator,
            'value'              => $input,
            'is_value_processed' => 0,
            'rule'               => Mage::getModel('meanship/rule')
        ));

        $this->assertEquals($output, $this->_obj->getValueParsed());
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testValidate($rate_request, $attribute_name, $operator, $test, $pass_str) {
        $pass = ($pass_str == 'true');


        $this->_obj->setData(array(
            'attribute'          => $attribute_name,
            'operator'           => $operator,
            'value'              => $test,
            'is_value_processed' => 0,
            'rule'               => Mage::getModel('meanship/rule')
        ));

        $this->assertEquals($pass, $this->_obj->validate(new Varien_Object($rate_request)));
    }
}
