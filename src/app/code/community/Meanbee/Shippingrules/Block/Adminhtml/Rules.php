<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules
	extends Mage_Adminhtml_Block_Widget_Grid_Container
{
	public function __construct()
	{
		parent::__construct();
		$this->_controller = 'adminhtml_rules';
		$this->_blockGroup = 'meanbee_shippingrules';
		$this->_addButtonLabel = 'Add a new Shipping Rule';
		$this->_headerText = Mage::helper('meanbee_shippingrules')->__('Manage Shipping Rules');

		$this->addButton('import', array(
			'label'   => Mage::helper('meanbee_shippingrules')->__('Import Shipping Rules'),
			'class'   => 'add',
			'onclick' => sprintf('setLocation("%s")', $this->getUrl('*/*/import'))
		));
	}

  public function getHeaderCssClass() {
      return 'head-shipping-method ' . parent::getHeaderCssClass();
  }
}
