<?php
class Meanbee_Shippingrules_Calculator_Condition_Destination
    extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return array[] Variable descriptors.
     */
    public function getVariables() {
        return array(
            'dest_street_address_l1' => array('label' => 'Street Address, Line 1', 'type' => array('string')),
            'dest_street_address_l2' => array('label' => 'Street Address, Line 2', 'type' => array('string')),
            'dest_country_id'        => array('label' => 'Shipping Country',       'type' => array('enumerated'), 'options' => array()),
            'dest_country_group'     => array('label' => 'Shipping Country Group', 'type' => array('enumerated'), 'options' => array()),
            'dest_region_id'         => array('label' => 'Shipping State',         'type' => array('enumerated'), 'options' => array())
        );
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request) {
        $streetAddressLines = $this->getStreetAddressLines($request);

        $request->setData('dest_street_address_l1', $streetAddressLines[0]);
        $request->setData('dest_street_address_l2', $streetAddressLines[1]);
        $request->setData('dest_country_group', $this->getCountryGroup($request));

        return $request;
    }

    /**
     * Gets street address as array of lines.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return string[]                                  2 element array.
     */
    protected function getStreetAddressLines($request) {
        $requestItems = $request->getAllItems();
        if (count($requestItems) > 0) {
            $quote = $requestItems[0]->getQuote();
            if(null != $quote->getShippingAddress()) {
                $street = $quote->getShippingAddress()->getData('street');
                $street = explode("\n", $street, 2);
                $street[0] = isset($street[0]) ? $street[0] : null;
                $street[1] = isset($street[1]) ? $street[1] : null;
                return $street;
            }
        }
        return array(null, null);
    }

    /**
     * Gets country group of destination country.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return string
     */
    protected function getCountryGroup($request) {
        $destination_country = $request->getDestCountryId();
        $destination_country_group = null;
        if (version_compare(Mage::getVersion(), '1.7', '>=') && Mage::helper('core')->isCountryInEU($destination_country)) {
            $destination_country_group = 'eu';
        }
        return $destination_country_group;
    }
}
