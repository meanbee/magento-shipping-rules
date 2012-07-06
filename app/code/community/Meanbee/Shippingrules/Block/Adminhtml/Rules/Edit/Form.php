<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Edit_Form extends Mage_Adminhtml_Block_Widget_Form {
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
            'legend' =>Mage::helper('meanship')->__('Example Information')
        ));

        $fieldset->addField('name', 'text', array(
            'label'     => Mage::helper('meanship')->__('Name'),
            'class'     => 'required-entry',
            'required'  => true,
            'name'      => 'name',
            'note'     => Mage::helper('meanship')->__('The name of the example.'),
        ));

        $fieldset->addField('description', 'text', array(
            'label'     => Mage::helper('meanship')->__('Description'),
            'class'     => 'required-entry',
            'required'  => true,
            'name'      => 'description',
        ));

        $fieldset->addField('other', 'text', array(
            'label'     => Mage::helper('meanship')->__('Other'),
            'class'     => 'required-entry',
            'required'  => true,
            'name'      => 'other',
        ));

//        $form->setValues($data);

        return parent::_prepareForm();
    }
}