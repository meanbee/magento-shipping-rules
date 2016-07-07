<?php
class Model_CarrierTest extends PHPUnit_Framework_TestCase
{
    /** @var Meanbee_Shippingrules_Model_Carrier */
    private $carrier;

    public function setUp()
    {
        require_once('src/app/Mage.php');
        Mage::app();
        
        $this->carrier = Mage::getModel('meanbee_shippingrules/carrier');
    }

    public function testInstance()
    {
        $this->assertInstanceOf(Mage_Shipping_Model_Carrier_Interface::class, $this->carrier);
        $this->assertInstanceOf(Mage_Shipping_Model_Carrier_Abstract::class, $this->carrier);
    }

    public function testCarrierMethods()
    {
        $this->assertContainsOnly('string', $this->carrier->getAllowedMethods(), true);
        $this->assertInstanceOf(Mage_Shipping_Model_Rate_Result::class, $this->carrier->collectRates(Mage::getModel('shipping/rate_request')));
    }
}