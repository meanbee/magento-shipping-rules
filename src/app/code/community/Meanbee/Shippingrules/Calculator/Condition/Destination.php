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
        // TODO: Street Address, Line 1 [dest_street_address_l1]
        // TODO: Street Address, Line 2 [dest_street_address_l2]
        // TODO: Shipping Country Group [dest_country_group]
        return $request;
    }
}
