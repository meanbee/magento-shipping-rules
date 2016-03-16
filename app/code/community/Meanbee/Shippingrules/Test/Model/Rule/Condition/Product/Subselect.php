<?php
class Meanbee_Shippingrules_Test_Model_Rule_Condition_Product_Subselect extends EcomDev_PHPUnit_Test_Case {
    /** @var Meanbee_Shippingrules_Model_Rule_Condition_Product_Subselect */
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
     * Set the returned catalog/product to have the attribute set id set to the value of the
     * first argument.
     *
     * @return Varien_Object
     */
    public function productMockCallback() {
        $id = func_get_arg(0);
        return  Mage::getModel('catalog/product')->setData(array(
            'entity_id' => $id,
            'attribute_set_id' => $id
        ));
    }

    protected function _getProductCondition($attribute, $operator, $value) {
        return Mage::getModel('salesrule/rule_condition_product')->setData(array(
            'attribute' => $attribute,
            'operator'  => $operator,
            'value'     => $value,
            'is_value_processed' => 0,
        ));
    }

    /**
     * @test
     */
    public function testValidateAllOneMatch() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 1
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'qty',
            'operator'           => '==',
            'value'              => 100,
            'aggregator'         => 'all',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition_1 = $this->_getProductCondition('attribute_set_id', '==', 1);

        $this->_obj->setConditions(array($condition_1));

        $this->assertTrue($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateAllOneNoMatch() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 1
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'qty',
            'operator'           => '==',
            'value'              => 100,
            'aggregator'         => 'all',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition_1 = $this->_getProductCondition('attribute_set_id', '!=', 1);

        $this->_obj->setConditions(array($condition_1));

        $this->assertFalse($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateAllTwoMatch() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 1
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'qty',
            'operator'           => '==',
            'value'              => 100,
            'aggregator'         => 'all',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition_1 = $this->_getProductCondition('attribute_set_id', '==', 1);
        $condition_2 = $this->_getProductCondition('attribute_set_id', '!=', 2);

        $this->_obj->setConditions(array($condition_1, $condition_2));

        $this->assertTrue($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateAllTwoNoMatch() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 1
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'qty',
            'operator'           => '==',
            'value'              => 100,
            'aggregator'         => 'all',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition_1 = $this->_getProductCondition('attribute_set_id', '==', 2);
        $condition_2 = $this->_getProductCondition('attribute_set_id', '==', 3);

        $this->_obj->setConditions(array($condition_1, $condition_2));

        $this->assertFalse($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateMultipleCartAll_1() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 1
                    ))
                )),

                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 2
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'qty',
            'operator'           => '==',
            'value'              => 100,
            'aggregator'         => 'all',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition_1 = $this->_getProductCondition('attribute_set_id', '==', 2);

        $this->_obj->setConditions(array($condition_1));

        $this->assertTrue($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateMultipleCartAll_2() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 1
                    ))
                )),

                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 2
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'qty',
            'operator'           => '==',
            'value'              => 200,
            'aggregator'         => 'all',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition_1 = $this->_getProductCondition('attribute_set_id', '==', 1);

        $this->_obj->setConditions(array($condition_1));

        $this->assertFalse($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateMultipleCartAny_1() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 1
                    ))
                )),

                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 2
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'qty',
            'operator'           => '==',
            'value'              => 200,
            'aggregator'         => 'any',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition_1 = $this->_getProductCondition('attribute_set_id', '==', 1);
        $condition_2 = $this->_getProductCondition('attribute_set_id', '==', 2);

        $this->_obj->setConditions(array($condition_1, $condition_2));

        $this->assertTrue($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateMultipleCartAny_2() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 1
                    ))
                )),

                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 100,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 2
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'qty',
            'operator'           => '==',
            'value'              => 100,
            'aggregator'         => 'any',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition_1 = $this->_getProductCondition('attribute_set_id', '!=', 1);
        $condition_2 = $this->_getProductCondition('attribute_set_id', '==', 2);

        $this->_obj->setConditions(array($condition_1, $condition_2));

        $this->assertTrue($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateSummingOfAttributes() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 1,
                    'weight' => 2,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 2,
                    ))
                )),

                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 2,
                    'weight' => 2,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 2,
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'weight',
            'operator'           => '>',
            'value'              => 5,
            'aggregator'         => 'any',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition = $this->_getProductCondition('attribute_set_id', '==', 2);

        $this->_obj->setConditions(array($condition));

        $this->assertTrue($this->_obj->validate(new Varien_Object($rate_request)));
    }

    /**
     * @test
     */
    public function testValidateSummingOfAttributes_2() {
        $rate_request = array(
            'all_items' => array(
                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 1,
                    'weight' => 2,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 2,
                    ))
                )),

                Mage::getModel('sales/quote_item')->setData(array(
                    'qty' => 1,
                    'weight' => 2,
                    'product' => Mage::getModel('catalog/product')->setData(array(
                        'attribute_set_id' => 2,
                    ))
                ))
            )
        );

        /** @var $rule Meanbee_Shippingrules_Model_Rule */
        $rule = Mage::getModel('meanship/rule');

        $this->_obj->setData(array(
            'attribute'          => 'weight',
            'operator'           => '>',
            'value'              => 5,
            'aggregator'         => 'any',
            'is_value_processed' => 0,
            'prefix'             => '123123',
            'rule'               => $rule
        ));

        $condition = $this->_getProductCondition('attribute_set_id', '==', 2);

        $this->_obj->setConditions(array($condition));

        $this->assertFalse($this->_obj->validate(new Varien_Object($rate_request)));
    }
}