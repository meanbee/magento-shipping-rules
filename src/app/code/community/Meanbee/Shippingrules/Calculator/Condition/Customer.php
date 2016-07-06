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
            'customer_group' => array('label' => 'Customer Group', 'type' => array('enumerated'), 'options' => array())
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
        $request->setData('customer_group', $this->getCustomerGroupId());
        
        return $request;
    }

    /**
     * Gets the ID of the customer group to which the current customer belongs.
     * @return int
     */
    protected function getCustomerGroupId() {
        if (Mage::getSingleton('adminhtml/session_quote')->getCustomer()->hasData()) {
            return +Mage::getSingleton('adminhtml/session_quote')->getCustomer()->getGroupId();
        }
        if (Mage::helper('customer')->getCustomer()->hasData()) {
            return +Mage::helper('customer')->getCustomer()->getGroupId();
        }
        return +Mage_Customer_Model_Group::NOT_LOGGED_IN_ID;
    }
}
