<?php
class Meanbee_Shippingrules_Test_Helper_Postcode extends EcomDev_PHPUnit_Test_Case {

    /** @var  Meanbee_Shippingrules_Helper_Postcode */
    protected $_helper;

    public function setUp() {
        parent::setUp();
        $this->_helper = new Meanbee_Shippingrules_Helper_Postcode();
    }

    public function tearDown() {
        $this->_helper = null;
        parent::tearDown();
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testExtractUKPostcodePrefix($postcode, $expected) {
        $this->assertEquals($expected, $this->_helper->extractUKPostcodePrefix($postcode));
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testIsValidPostcode($postcode, $expected) {
        if ($expected) {
            $this->assertTrue($this->_helper->isValidPostcode($postcode));
        } else {
            $this->assertFalse($this->_helper->isValidPostcode($postcode));
        }
    }
}
