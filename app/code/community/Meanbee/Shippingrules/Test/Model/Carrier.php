<?php
class Meanbee_Shippingrules_Test_Model_Carrier extends EcomDev_PHPUnit_Test_Case {
    /** @var Meanbee_Shippingrules_Model_Carrier */
    protected $_obj = null;

    public function setUp() {
        $this->_obj = Mage::getModel('meanship/carrier');
    }

    public function tearDown() {
        $this->_obj = null;
    }

    /**
     * @test
     */
    public function testModelConstructed() {
        $this->assertInstanceOf('Meanbee_Shippingrules_Model_Carrier', $this->_obj);
    }

    /**
     * @test
     * @loadFixture
     * @dataProvider dataProvider
     */
    public function testCollectRates($id, $request_data) {
        $adminhtml_session_quote = $this->mockSession('adminhtml/session_quote', array('hasData'));
        $this->replaceByMock('singleton', 'adminhtml/session_quote', $adminhtml_session_quote);

        $customer_session = $this->mockSession('customer/session', array('hasData'));
        $this->replaceByMock('singleton', 'customer/session', $customer_session);

        $expected_methods = $this->expected($id);

        $request_obj = $this->_buildRequestObj($request_data);
        $result_obj = $this->_obj->collectRates($request_obj);

        $rates = $result_obj->getAllRates();

        $this->assertEquals(count($expected_methods), count($rates), "The number of rates returned did not match the number of expected rates");

        foreach ($rates as $method) {
            /** @var Mage_Shipping_Model_Rate_Result_Method $method */
            $method_code = sprintf("%s_%s", $method->getCarrier(), $method->getMethod());
            $this->assertContains($method_code, $expected_methods, sprintf("Could not find %s in expected methods", $method_code), true, false);
        }
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testAddNumericPostcodesToRequest($input_request, $output_request) {
        $request_obj = $this->_buildRequestObj($input_request);
        $request_obj = $this->_obj->addNumericPostcodesToRequest($request_obj);

        foreach ($output_request as $key => $value) {
            $this->assertTrue($request_obj->hasData($key), sprintf("Response did not contain %s", $key));
            $this->assertEquals($request_obj->getData($key), $value, sprintf("Response %s value was %s, expected %s", $key, $request_obj->getData($key), $value));
        }
    }

    /**
     * @param $request_data
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    protected function _buildRequestObj($request_data) {
        $result = Mage::getModel('shipping/rate_request')->addData($request_data);
        return $result;
    }
}
