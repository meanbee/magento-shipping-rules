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
            'dest_country_id'        => array('label' => 'Shipping Country',       'type' => array('enumerated')),
            'dest_country_group'     => array('label' => 'Shipping Country Group', 'type' => array('enumerated')),
            'dest_region_id'         => array('label' => 'Shipping State',         'type' => array('enumerated'))
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
                $street[0] = isset($street[0]) ? $street[0] : false;
                $street[1] = isset($street[1]) ? $street[1] : false;
                return $street;
            }
        }
        return array(false, false);
    }

    /**
     * Gets country group of destination country.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return string
     */
    protected function getCountryGroup($request) {
        $destination_country = $request->getDestCountryId();
        $destination_country_group = false;
        if (version_compare(Mage::getVersion(), '1.7', '>=') && Mage::helper('core')->isCountryInEU($destination_country)) {
            $destination_country_group = 'eu';
        }
        return $destination_country_group;
    }

    public function ajaxOptions($variable) {
        switch ($variable) {
            case 'dest_country_id':
                return Mage::getResourceModel('directory/country_collection')->loadData()->toOptionArray(false);
            case 'dest_region_id':
                return Mage::getResourceModel('directory/region_collection')->loadData()->toOptionArray(false);
            case 'dest_country_group':
                return array(
                    array('label' => Mage::helper('meanbee_shippingrules')->__('European Union'), 'value' => 'eu')
                );
        }
    }
}
