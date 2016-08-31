<?php
class Meanbee_Shippingrules_Calculator_Condition_Customer
    extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return array[] Vaaaaaaariable descriptors.
     */
    public function getVariables() {
        return array(
            'customer_group' => array('label' => 'Customer Group', 'type' => array('enum'))
        );
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request)
    {
        $request->setData('customer_group', $this->getCustomerGroupId($request));
        
        return $request;
    }

    /**
     * Gets the ID of the customer group to which the current customer belongs.
     * @return int
     */
    protected function getCustomerGroupId($request) {
        $requestItems = $request->getAllItems();
        if (count($requestItems) > 0) {
            $quote = $requestItems[0]->getQuote();
            return +$quote->getCustomerGroupId();
        }
        return +Mage_Customer_Model_Group::NOT_LOGGED_IN_ID;
    }

    public function ajaxOptions($variable) {
        switch ($variable) {
            case 'customer_group':
                return Mage::getModel('customer/group')->getCollection()->toOptionArray();
        }
    }
}
