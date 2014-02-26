<?php
class Meanbee_Shippingrules_Block_Adminhtml_Rules_Import extends Mage_Adminhtml_Block_Template {
    public function getPostUrl() {
        return $this->getUrl('*/*/importPost');
    }
}
