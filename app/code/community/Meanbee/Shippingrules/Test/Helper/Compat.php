<?php
class Meanbee_Shippingrules_Test_Helper_Compat extends EcomDev_PHPUnit_Test_Case {
    /** @var  Meanbee_Shippingrules_Helper_Compat */
    protected $_helper;

    public function setUp() {
        parent::setUp();
        $this->_helper = new Meanbee_Shippingrules_Helper_Compat();
    }

    public function tearDown() {
        $this->_helper = null;
        parent::tearDown();
    }

    /**
     * @test
     * @dataProvider dataProvider
     */
    public function testIsEuCountrySupported($version, $is_supported) {
        if ($is_supported) {
            $this->assertTrue($this->_helper->isEuCountrySupported($version), "Expected $version to support");
        } else {
            $this->assertFalse($this->_helper->isEuCountrySupported($version), "Expected $version to not support");
        }
    }
}
