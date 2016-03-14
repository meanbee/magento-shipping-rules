<?php
class Meanbee_Shippingrules_Block_Adminhtml_Version
    extends Mage_Adminhtml_Block_System_Config_Form_Field
{
    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element)
    {
        return Mage::helper('meanbee_shippingrules/config')->getVersion();
    }
}
