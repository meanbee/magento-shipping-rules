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
            'store_id'       => array('label' => 'Magento Store',   'type' => array('enumerated', 'string')),
            'website_id'     => array('label' => 'Magento Website', 'type' => array('enumerated', 'string')),
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
        $request->setData('is_admin_order', $this->getIsAdminOrder($request));

        return $request;
    }

    /**
     * Gets whether or not the order has been made by an administrator.
     * @return boolean
     */
    protected function getIsAdminOrder($request) {
        $requestItems = $request->getAllItems();
        if (count($requestItems) > 0) {
            $quote = $requestItems[0]->getQuote();
            return !!$quote->getIsSuperMode();
        }
        return false;
    }

    public function ajaxOptions($variable) {
        switch ($variable) {
            case 'store_id':
                return Mage::getResourceModel('core/store_collection')->toOptionArray();
            case 'website_id':
                return Mage::getResourceModel('core/website_collection')->toOptionArray();
        }
    }
}
