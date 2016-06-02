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
}
