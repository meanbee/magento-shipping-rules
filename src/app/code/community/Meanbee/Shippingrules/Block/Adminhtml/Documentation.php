<?php
class Meanbee_Shippingrules_Block_Adminhtml_Documentation
    extends Mage_Adminhtml_Block_System_Config_Form_Field
{
    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element)
    {
        return '<a href="' . Mage::helper('meanbee_shippingrules/config')->getDocumentationURL() . '" target="_blank">Meanbee\'s Shipping Rules Documentation</a>';
    }
}
