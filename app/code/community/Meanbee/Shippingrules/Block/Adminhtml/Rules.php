<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules extends Mage_Adminhtml_Block_Widget_Grid_Container {
    protected $_addButtonLabel = 'Add a new Shipping Rule';

    public function __construct() {
        parent::__construct();

        $this->_controller = 'adminhtml_rules';
        $this->_blockGroup = 'meanship';
        $this->_headerText = Mage::helper('meanship')->__('Shipping Rules');
    }
}