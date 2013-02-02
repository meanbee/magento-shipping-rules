<?php
class Meanbee_Shippingrules_Test_Model_Rule_Condition_Product_Subselect extends EcomDev_PHPUnit_Test_Case {
    /** @var Meanbee_Shippingrules_Model_Rule_Product_Subselect */
    protected $_obj = null;

    public function setUp() {
        $this->_obj = Mage::getModel('meanship/rule_condition_product_subselect');
    }

    public function tearDown() {
        $this->_obj = null;
    }

    /**
     * @test
     */
    public function testModelConstructed() {
        $this->assertInstanceOf('Meanbee_Shippingrules_Model_Rule_Condition_Product_Subselect', $this->_obj);
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testValidate($rate_request, $aggregator, $attribute, $qty, $operator, $value, $result) {
        $this->_obj->setData(array(
            'operator'           => $operator,
            'value'              => $value,
            'attribute'          => $attribute,
            'aggregator'         => $aggregator,
            'qty'                => $qty,
            'is_value_processed' => 0,
            'rule'               => Mage::getModel('meanship/rule')
        ));

        $this->assertEquals($result == 'true', $this->_obj->validate(new Varien_Object($rate_request)), "Operator: $operator, Value: $value, Request: " . json_encode($rate_request));
    }
}