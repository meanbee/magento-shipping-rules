<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Edit_Form
    extends Mage_Adminhtml_Block_Widget_Form
{
    protected function _construct()
    {
        parent::_construct();
        $this->setTemplate('meanbee/shippingrules/rules/form.phtml');
    }

    protected function _prepareForm()
    {
        $rule = Mage::registry('meanbee_shippingrules_data');
        $form = new Varien_Data_Form(array(
            'id' => 'edit_form',
            'action' => $this->getUrl('*/*/save', array('id' => $this->getRequest()->getParam('id'))),
            'method' => 'post',
            'enctype' => 'multipart/form-data',
        ));
        $form->setUseContainer(true);
        $this->setForm($form);

        $info_fieldset = $form->addFieldset('meanbee_shippingrules_form_info', array(
            'legend' => Mage::helper('meanbee_shippingrules')->__('Shipping Method Information')
        ));
        $info_fieldset->addField('name', 'text', array(
            'label'    => Mage::helper('meanbee_shippingrules')->__('Shipping Method Name'),
            'name'     => 'name',
            'note'     => Mage::helper('meanbee_shippingrules')->__('This is the name of the shipping method that will be shown to the customer.'),
            'required' => true
        ));
        $info_fieldset->addField('display_sort_order', 'text', array(
            'label' => Mage::helper('meanbee_shippingrules')->__('Display Sort Order'),
            'name'  => 'display_sort_order',
            'note'  => Mage::helper('meanbee_shippingrules')->__('<em>Optional</em>. Methods are sorted accending, so lower values appear higher in the list.')
        ));
        $info_fieldset->addField('notes', 'textarea', array(
            'label' => Mage::helper('meanbee_shippingrules')->__('Notes'),
            'name'  => 'notes',
            'note'  => Mage::helper('meanbee_shippingrules')->__('<em>Optional</em>. For internal use, does not get shown to the customer by default.')
        ));

        $price_fieldset = $form->addFieldset('meanbee_shippingrules_form_price', array(
            'legend' => Mage::helper('meanbee_shippingrules')->__('Shipping Method Price'),
            'class'  => 'fieldset-wide'
        ));
        $price_fieldset->addField('price_per_item', 'checkbox', array(
            'checked' => $rule->getPricePerItem() == '1',
            'label'   => Mage::helper('meanbee_shippingrules')->__('Price Per Item'),
            'name'    => 'price_per_item',
            'note'    => '<em>Optional</em>. Price is multiplied by the number of items in the cart.',
            'value'   => 1
        ));
        $price_fieldset->addField('price', 'text', array(
            'label'    => Mage::helper('meanbee_shippingrules')->__('Price'),
            'name'     => 'price',
            'required' => true,
            'title'    => Mage::helper('meanbee_shippingrules')->__('Price')
        ));

        $cost_fieldset = $form->addFieldset('meanbee_shippingrules_form_cost', array(
            'legend' => Mage::helper('meanbee_shippingrules')->__('Shipping Method Cost'),
            'class'  => 'fieldset-wide'
        ));
        $cost_fieldset->addField('cost_per_item', 'checkbox', array(
            'checked' => $rule->getPricePerItem() == '1',
            'label'   => Mage::helper('meanbee_shippingrules')->__('Cost Per Item'),
            'name'    => 'cost_per_item',
            'note'    => '<em>Optional</em>. Cost is multiplied by the number of items in the cart.',
            'value'   => 1
        ));
        $cost_fieldset->addField('cost', 'text', array(
            'label'    => Mage::helper('meanbee_shippingrules')->__('Cost'),
            'name'     => 'cost',
            'required' => true,
            'title'    => Mage::helper('meanbee_shippingrules')->__('Cost')
        ));

        $exec_fieldset = $form->addFieldset('meanbee_shippingrules_form_exec', array(
            'legend' => Mage::helper('meanbee_shippingrules')->__('Shipping Rule Execution')
        ));
        $exec_fieldset->addField('is_active', 'select', array(
            'label'    => Mage::helper('meanbee_shippingrules')->__('Rule Enabled?'),
            'name'     => 'is_active',
            'required' => true,
            'values'   => Mage::getSingleton('adminhtml/system_config_source_yesno')->toOptionArray()
        ));
        $exec_fieldset->addField('sort_order', 'text', array(
            'label' => Mage::helper('meanbee_shippingrules')->__('Execution Sort Order'),
            'name'  => 'sort_order',
            'note'  => '<em>Optional</em>. Rules are sorted ascending, so lower values are considered first.'
        ));
        $exec_fieldset->addField('stop_rules_processing', 'checkbox', array(
            'checked' => $rule->getStopRulesProcessing() == '1',
            'label'   => Mage::helper('meanbee_shippingrules')->__('Stop similar rule processing if matched'),
            'name'    => 'stop_rule_processing',
            'note'    => Mage::helper('meanbee_shippingrules')->__('<em>Optional</em>. When matched no further rules that share the same method name are considered.'),
            'value'   => 1
        ));
        $exec_fieldset->addField('stop_all_rules_processing', 'checkbox', array(
            'checked' => $rule->getStopAllRulesProcessing() == '1',
            'label'   => Mage::helper('meanbee_shippingrules')->__('Stop all rule processing if matched'),
            'name'    => 'stop_all_rule_processing',
            'note'    => Mage::helper('meanbee_shippingrules')->__('<em>Optional</em>. When matches no further rules are considered regardless of method name'),
            'value'   => 1
        ));

        $cond_fieldset = $form->addFieldset('meanbee_shippingrules_form_cond', array(
            'legend' => Mage::helper('meanbee_shippingrules')->__('Shipping Rule Conditions'),
            'class'  => 'fieldset-wide'
        ));
        $cond_fieldset->addField('conditions', 'text', array(
            'label'    => Mage::helper('meanbee_shippingrules')->__('Conditions'),
            'name'     => 'conditions',
            'required' => true,
            'title'    => Mage::helper('meanbee_shippingrules')->__('Conditions')
        ));

        if ($rule) {
            $form->setValues($rule);
        }
        return parent::_prepareForm();
    }
}
