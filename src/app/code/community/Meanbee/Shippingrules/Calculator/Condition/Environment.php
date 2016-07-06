<?php
class Meanbee_Shippingrules_Calculator_Condition_Environment
    extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return array[] Variable descriptors.
     */
    public function getVariables() {
        return array(
            'store_id'       => array('label' => 'Magento Store',   'type' => array('enumerated', 'string'), 'options' => array()),
            'website_id'     => array('label' => 'Magento Website', 'type' => array('enumerated', 'string'), 'options' => array()),
            'is_admin_order' => array('label' => 'Is Admin Order?', 'type' => array('boolean'))
        );
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request) {
        $request->setData('is_admin_order', $this->getIsAdminOrder());

        return $request;
    }

    /**
     * Gets whether or not the order has been made by an administrator.
     * @return boolean
     */
    protected function getIsAdminOrder() {
        return Mage::getSingleton('adminhtml/session_quote')->hasData('quote_id');
    }
}
