<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Grid extends Mage_Adminhtml_Block_Widget_Grid {
    public function __construct() {
        parent::__construct();

        $this->setId('meanbee_shippingrules_grid');
        $this->setDefaultSort('name');
        $this->setDefaultDir(Varien_Data_Collection::SORT_ORDER_ASC);
        $this->setSaveParametersInSession(true);
    }

    protected function _prepareCollection() {
        $collection = Mage::getModel('meanship/rule')->getCollection();
        $this->setCollection($collection);
        return parent::_prepareCollection();
    }

    protected function _prepareColumns() {
        $this->addColumn('is_active', array(
            'header'    => Mage::helper('meanship')->__('Enabled'),
            'align'     => 'center',
            'index'     => 'is_active',
            'type'      => 'options',
            'width'     => '50px',
            'options'   => array(
                0 => $this->__('No'),
                1 => $this->__('Yes')
            )
        ));

        $this->addColumn('name', array(
            'header'    => Mage::helper('meanship')->__('Name'),
            'align'     =>'left',
            'index'     => 'name',
            'width'     => '250px'
        ));

        $this->addColumn('conditions', array(
            'header'    => Mage::helper('meanship')->__('Rule Condition Summary'),
            'align'     =>'left',
            'getter'    => 'getConditionsHtml',
            'filter'    => false
        ));

        $this->addColumn('price', array(
            'header'    => Mage::helper('meanship')->__('Price'),
            'align'     =>'left',
            'index'     => 'price',
            'type'      => 'price',
            /**
             * There's always an error generated when you attempt to search with price as an active or even inactive
             * filter.
             */
            'filter'    => false
        ));

        $this->addColumn('sort_order', array(
            'header'    => Mage::helper('meanship')->__('Sort Order'),
            'align'     => 'center',
            'index'     => 'sort_order',
            'width'     => '50px',
            'type'      => 'range'
        ));

        return parent::_prepareColumns();
    }

    protected function _prepareMassaction() {
        $this->setMassactionIdField('rule_id');
        $this->getMassactionBlock()->setFormFieldName('rule_id');

        if ($this->isAllowedToWrite()) {
            $this->getMassactionBlock()->addItem('delete', array(
                'label'=> Mage::helper('meanship')->__('Delete Shipping Rules'),
                'url'  => $this->getUrl('*/*/massDelete', array('' => '')),
                'confirm' => Mage::helper('meanship')->__('Are you sure?')
            ));

            $this->getMassactionBlock()->addItem('disable', array(
                'label'=> Mage::helper('meanship')->__('Disable Shipping Rules'),
                'url'  => $this->getUrl('*/*/massDisable', array('' => '')),
                'confirm' => Mage::helper('meanship')->__('Are you sure?')
            ));

            $this->getMassactionBlock()->addItem('enabled', array(
                'label'=> Mage::helper('meanship')->__('Enable Shipping Rules'),
                'url'  => $this->getUrl('*/*/massEnable', array('' => '')),
                'confirm' => Mage::helper('meanship')->__('Are you sure?')
            ));
        }

        return $this;
    }

    public function getRowUrl($row) {
        return $this->getUrl('*/*/edit', array('id' => $row->getId()));
    }

    public function isAllowedToWrite() {
        return Mage::helper('meanship/acl')->isAllowedToWrite();
    }
}
