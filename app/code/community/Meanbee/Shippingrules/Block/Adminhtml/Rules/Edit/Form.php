<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Edit_Form extends Mage_Adminhtml_Block_Widget_Form {
    protected function _construct() {
        parent::_construct();
        $this->setTemplate('meanbee/shippingrules/rules/form.phtml');
    }

    protected function _prepareForm() {
        $data = Mage::registry('meanship_data');

        $form = new Varien_Data_Form(array(
            'id' => 'edit_form',
            'action' => $this->getUrl('*/*/save', array('id' => $this->getRequest()->getParam('id'))),
            'method' => 'post',
            'enctype' => 'multipart/form-data',
        ));

        $form->setUseContainer(true);

        $this->setForm($form);

        $fieldset = $form->addFieldset('meanbee_shippingrules_form', array(
            'legend' =>Mage::helper('meanship')->__('Shipping Rule Information')
        ));

        $fieldset->addField('is_active', 'select', array(
            'label'     => Mage::helper('meanship')->__('Rule Enabled?'),
            'class'     => 'required-entry',
            'required'  => true,
            'name'      => 'is_active',
            'values'    => Mage::getSingleton('adminhtml/system_config_source_yesno')->toOptionArray(),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('name', 'text', array(
            'label'     => Mage::helper('meanship')->__('Shipping Method Name'),
            'class'     => 'required-entry',
            'required'  => true,
            'name'      => 'name',
            'note'     => Mage::helper('meanship')->__('This is the name of the shipping method that will be displayed to the customer.'),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('price', 'text', array(
            'label'     => Mage::helper('meanship')->__('Shipping Method Price'),
            'class'     => 'required-entry',
            'required'  => true,
            'name'      => 'price',
            'note'     => Mage::helper('meanship')->__('This is the price that the customer will be charged.'),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('per_item', 'checkbox', array(
            'label'     => Mage::helper('meanship')->__('Per Item Pricing'),
            'name'      => 'per_item',
            'value'     => 1,
            'checked'   => $data->getPerItem() == '1',
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('notes', 'textarea', array(
            'label'     => Mage::helper('meanship')->__('Notes'),
            'name'      => 'notes',
            'note'     => Mage::helper('meanship')->__('For internal use.'),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('sort_order', 'text', array(
            'label'     => Mage::helper('meanship')->__('Sort Order'),
            'name'      => 'sort_order',
            'note'     => Mage::helper('meanship')->__('<em>Optional</em>. Rules are sorted ascending, so lower values will be checked first.'),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('display_sort_order', 'text', array(
            'label'     => Mage::helper('meanship')->__('Display Sort Order'),
            'name'      => 'display_sort_order',
            'note'     => Mage::helper('meanship')->__('<em>Optional</em>. Specifies the order in which the rules are displayed to the customer.'),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('stop_rules_processing', 'checkbox', array(
            'label'     => Mage::helper('meanship')->__('Stop rule processing if matched'),
            'name'      => 'stop_rules_processing',
            'value'     => 1,
            'checked'   => $data->getStopRulesProcessing() == '1',
            'note'     => Mage::helper('meanship')->__("<em>Optional</em>. Stop processing rules sharing this rule's shipping method name if it matches."),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('stop_all_rules_processing', 'checkbox', array(
            'label'     => Mage::helper('meanship')->__('Stop all rule processing if matched'),
            'name'      => 'stop_all_rules_processing',
            'value'     => 1,
            'checked'   => $data->getStopAllRulesProcessing() == '1',
            'note'     => Mage::helper('meanship')->__("<em>Optional</em>. Stop processing rules regardless of method name if it matches."),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $fieldset->addField('cost', 'text', array(
            'label'     => Mage::helper('meanship')->__('Shipping Method Cost'),
            'name'      => 'cost',
            'note'     => Mage::helper('meanship')->__('<em>Optional</em>. The actual cost incurred by the store owner when the customer uses this method.'),
            'disabled'  => !$this->isAllowedToWrite()
        ));

        $renderer = Mage::getBlockSingleton('adminhtml/widget_form_renderer_fieldset')
            ->setTemplate('promo/fieldset.phtml')
            ->setNewChildUrl($this->getUrl('*/*/newConditionHtml/form/rule_conditions_fieldset'));

        $conditions_fieldset = $form->addFieldset('conditions_fieldset', array(
            'legend' => Mage::helper('meanship')->__('Cart Conditions')
        ))->setRenderer($renderer);

        $conditions_fieldset->addField('conditions', 'text', array(
            'name'  => 'conditions',
            'label' => Mage::helper('meanship')->__('Conditions'),
            'title' => Mage::helper('meanship')->__('Conditions'),
            'required' => true
        ))->setRule($data)->setRenderer(Mage::getBlockSingleton('rule/conditions'));

        if ($data) {
            /**
             * The value of the checkbox represents it's value *if it's checked*, therefore should always be one.  We
             * use the 'checked' array option when we create the field to do the 'checking'.
             */
            $data['per_item'] = 1;
            $data['stop_rules_processing'] = 1;
            $data['stop_all_rules_processing'] = 1;
            $form->setValues($data);
        }

        return parent::_prepareForm();
    }

    public function isAllowedToWrite() {
        return Mage::helper('meanship/acl')->isAllowedToWrite();
    }
}
