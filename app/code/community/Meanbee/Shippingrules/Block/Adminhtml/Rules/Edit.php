<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Edit extends Mage_Adminhtml_Block_Widget_Form_Container {
    public function __construct() {
        parent::__construct();

        $this->_objectId = 'id';
        $this->_blockGroup = 'meanship';
        $this->_controller = 'adminhtml_rules';
        $this->_mode = 'edit';

        if ($this->isAllowedToWrite()) {
            if ($rule_id = Mage::registry('meanship_data')->getId()) {
                $duplicate_url = $this->getUrl('*/*/duplicate', array(
                    'id' => $rule_id
                ));

                $this->_addButton('duplicate', array(
                    'label' => Mage::helper('meanship')->__('Duplicate Shipping Rule'),
                    'onclick' => "confirm('Are you sure you want to duplicate this rule? All unsaved changes will be lost.') && setLocation('$duplicate_url')",
                    'class' => 'add'
                ));
            }

            $this->_addButton('save_and_continue', array(
                'label' => Mage::helper('adminhtml')->__('Save And Continue Edit'),
                'onclick' => 'editForm.submit($(\'edit_form\').action + \'back/edit/\')',
                'class' => 'save',
            ), -100);

            $this->_updateButton('save', 'label', Mage::helper('meanship')->__('Save Shipping Rule'));
        } else {
            $this->_removeButton('save');
            $this->_removeButton('delete');
            $this->_removeButton('reset');
        }
    }

    public function getHeaderText() {
        if (Mage::registry('meanship_data') && Mage::registry('meanship_data')->getId()) {
            return Mage::helper('meanship')->__('Edit Shipping Rule "%s"', $this->escapeHtml(Mage::registry('meanship_data')->getName()));
        } else {
            return Mage::helper('meanship')->__('New Shipping Rule');
        }
    }

    public function getHeaderCssClass() {
        return 'head-shipping-method ' . parent::getHeaderCssClass();
    }

    public function isAllowedToWrite() {
        return Mage::helper('meanship/acl')->isAllowedToWrite();
    }
}
