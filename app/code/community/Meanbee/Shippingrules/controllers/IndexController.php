<?php
class Meanbee_Shippingrules_IndexController extends Mage_Adminhtml_Controller_Action {
    public function indexAction() {
        $this->loadLayout();

        $this->_setActiveMenu('catalog/meanbee_shippingrules');

        $this->renderLayout();
    }
}