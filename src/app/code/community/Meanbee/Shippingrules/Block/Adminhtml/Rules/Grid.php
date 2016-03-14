<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Grid
    extends Mage_Adminhtml_Block_Widget_Grid
{
    public function __construct()
    {
        parent::__construct();
        $this->setId('meanbee_shippingrules_grid');
        $this->setDefaultSort('name');
        $this->setDefaultDir(Varien_Data_Collection::SORT_ORDER_ASC);
        $this->setSaveParametersInSession(true);

        $this->addExportType('*/*/exportCSV', 'CSV');
    }

    protected function _prepareCollection()
    {
        $collection = Mage::getModel('meanbee_shippingrules/rule')->getCollection();
        $this->setCollection($collection);
        return parent::_prepareCollection();
    }

    protected function _prepareColumns()
    {
        if ($this->_isExport) {
            $this->_prepareExportColumns();
        } else {
            $this->_prepareUserColumns();
        }
        return parent::_prepareColumns();
    }

    protected function _prepareUserColumns()
    {
        $fields = array(
            'rule_id'    => array('frame_callback' => array($this, 'decorateuserValue')),
            'name'       => array('width' => '250px'),
            'notes'      => array('width' => '250px'),
            'price'      => array(
                'sortable' => false,
                'width'    => '100px'
            ),
            'cost'       => array(
                'sortable' => false,
                'width'    => '100px'
            ),
            'conditions' => array(
                'sortable' => false,
                'width'    => '100px'
            ),
            'sort_order' => array(
                'align'    => 'center',
                'type'     => 'range'
            ),
            'display_sort_order' => array(
                'align'    => 'center',
                'type'     => 'range'
            ),
            'is_active'  => array(
                'align'    => 'center',
                'type'     => 'options'
            ),
            'per_item'   => array(
                'align'    => 'center',
                'type'     => 'options'
            ),
            'stop_rules_processing' => array(
                'align'    => 'center',
                'type'     => 'options'
            ),
            'stop_all_rules_processing' => array(
                'align'    => 'center',
                'type'     => 'options'
            )
        );

        $selectedFields = Mage::helper('meanbee_shippingrules/config')->getGridFields();
        foreach ($selectedFields as $field) {
            $this->addColumn($field, array_merge(array(
                'header'  => Mage::getSingleton('meanbee_shippingrules/config_source_ruleFields')->getLabelByValue($field),
                'index'   => $field,
                'options' => array($this->__('No'), $this->__('Yes')),
                'width'   => '50px'
            ), $fields[$field]));
        }
    }

    protected function _prepareExportColumns()
    {
        $columns = array(
            'rule_id', 'name', 'price', 'cost', 'per_item', 'conditions_serialized', 'stop_rules_processing',
            'stop_all_rules_processing', 'notes', 'sort_order', 'is_active', 'version'
        );
        foreach ($columns as $column) {
            $this->addColumn($column, array(
                'header'    => $column,
                'index'     => $column,
                'frame_callback' => array($this, 'decorateExportValue')
            ));
        }
    }

    public function decorateUserValue($value, $row, $column, $isExport)
    {
        if ($column->getIndex() == 'rule_id') {
            return sprintf("%s_%s", Mage::helper('meanbee_shippingrules/config')->getMethodCodePrefix(), $value);
        }
        return $value;
    }

    public function decorateExportValue($value, $row, $column, $isExport)
    {
        if ($isExport) {
            if ($column->getIndex() == 'conditions') {
                return base64_encode($value);
            }
        }

        return $value;
    }

    protected function _prepareMassaction()
    {
        $this->setMassactionIdField('rule_id');
        $this->getMassactionBlock()->setFormFieldName('rule_id');
        $this->getMassactionBlock()->addItem('delete', array(
            'label'=> Mage::helper('meanbee_shippingrules')->__('Delete Shipping Rules'),
            'url'  => $this->getUrl('*/*/massDelete', array('' => '')),
            'confirm' => Mage::helper('meanbee_shippingrules')->__('Are you sure you want to delete the selected rules?')
        ));

        $this->getMassactionBlock()->addItem('disable', array(
            'label'=> Mage::helper('meanbee_shippingrules')->__('Disable Shipping Rules'),
            'url'  => $this->getUrl('*/*/massDisable', array('' => '')),
            'confirm' => Mage::helper('meanbee_shippingrules')->__('Are you sure you want to disable the selected rules?')
        ));

        $this->getMassactionBlock()->addItem('enabled', array(
            'label'=> Mage::helper('meanbee_shippingrules')->__('Enable Shipping Rules'),
            'url'  => $this->getUrl('*/*/massEnable', array('' => '')),
            'confirm' => Mage::helper('meanbee_shippingrules')->__('Are you sure you want to enable the selected rules?')
        ));
        return $this;
    }

    public function getRowUrl($row)
    {
        return $this->getUrl('*/*/edit', array('id' => $row->getId()));
    }
}
