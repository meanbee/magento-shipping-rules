<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Edit
    extends Mage_Adminhtml_Block_Widget_Form_Container
{
    public function __construct()
    {
        parent::__construct();

        $this->_objectId = 'id';
        $this->_blockGroup = 'meanbee_shippingrules';
        $this->_controller = 'adminhtml_rules';
        $this->_mode = 'edit';

        if ($rule_id = Mage::registry('meanbee_shippingrules_data')->getId()) {
            $duplicate_url = $this->getUrl('*/*/duplicate', array('id' => $rule_id));
            $this->_addButton('duplicate', array(
                'label'   => Mage::helper('meanbee_shippingrules')->__('Duplicate Shipping Rule'),
                'onclick' => "confirm('Are you sure you want to duplicate this rule? All unsaved changes will be lost.') && setLocation('$duplicate_url')",
                'class'   => 'add'
            ));
        }
        $this->_addButton('save_and_continue', array(
            'label'   => Mage::helper('adminhtml')->__('Save And Continue Edit'),
            'onclick' => 'editForm.submit(\'' . $this->getUrl('*/*/save', array(
                'id'   => $this->getRequest()->getParam('id'),
                'back' => 'edit'
            )) . '\')',
            'class'   => 'save'
        ), -100);
        $this->_updateButton('save', 'label', Mage::helper('meanbee_shippingrules')->__('Save Shipping Rule'));
    }

    public function getHeaderText()
    {
        $rule = Mage::registry('meanbee_shippingrules_data') ? Mage::registry('meanbee_shippingrules_data') : null;
        if ($rule && $rule->getId()) {
            return Mage::helper('meanbee_shippingrules')->__('Edit Shipping Rule: "%s"', $this->escapeHtml($rule->getName()));
        } else {
            return Mage::helper('meanbee_shippingrules')->__('New Shipping Rule');
        }
    }

    public function getHeaderCssClass()
    {
        return 'head-shipping-method ' . parent::getHeaderCssClass();
    }
}
