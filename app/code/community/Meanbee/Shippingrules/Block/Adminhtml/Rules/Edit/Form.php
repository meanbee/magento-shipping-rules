<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Edit_Form extends Mage_Adminhtml_Block_Widget_Form {
    protected function _construct() {
        parent::_construct();
        $this->setTemplate('meanbee/shippingrules/rules/form.phtml');
    }

    protected function _prepareForm() {
        $form = new Varien_Data_Form(array(
            'id' => 'edit_form',
            'action' => $this->getUrl('*/*/save', array('id' => $this->getRequest()->getParam('id'))),
            'method' => 'post',
            'enctype' => 'multipart/form-data',
        ));

        $form->setUseContainer(true);

        $this->setForm($form);

        $fieldset = $form->addFieldset('example_form', array(
            'legend' =>Mage::helper('meanship')->__('Shipping Rule Information')
        ));

        $fieldset->addField('name', 'text', array(
            'label'     => Mage::helper('meanship')->__('Shipping Method Name'),
            'class'     => 'required-entry',
            'required'  => true,
            'name'      => 'name',
            'note'     => Mage::helper('meanship')->__('This is the name of the shipping method that will be displayed to the customer.'),
        ));

        $fieldset->addField('price', 'text', array(
            'label'     => Mage::helper('meanship')->__('Shipping Method Price'),
            'class'     => 'required-entry',
            'required'  => true,
            'name'      => 'price',
            'note'     => Mage::helper('meanship')->__('This is the price that the customer will be charged.'),
        ));

        $model = Mage::getModel('meanship/rule');

        $renderer = Mage::getBlockSingleton('adminhtml/widget_form_renderer_fieldset')
            ->setTemplate('promo/fieldset.phtml')
            ->setNewChildUrl($this->getUrl('*/*/newConditionHtml/form/rule_conditions_fieldset'));

        $conditions_fieldset = $form->addFieldset('conditions_fieldset', array(
            'legend' => Mage::helper('meanship')->__('Cart Conditions'))
        )->setRenderer($renderer);

        $conditions_fieldset->addField('conditions', 'text', array(
            'name'  => 'conditions',
            'label' => Mage::helper('meanship')->__('Conditions'),
            'title' => Mage::helper('meanship')->__('Conditions'),
            'required' => true,
        ))->setRule($model)->setRenderer(Mage::getBlockSingleton('rule/conditions'));

        if ($data = Mage::registry('meanship_data')) {
            $form->setValues($data);
        }

        return parent::_prepareForm();
    }
}