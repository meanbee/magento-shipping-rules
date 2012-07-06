<?php
class Meanbee_Shippingrules_IndexController extends Mage_Adminhtml_Controller_Action {
    public function indexAction() {
        $this->loadLayout();
        $this->_setActiveMenu('catalog/meanbee_shippingrules');
        $this->renderLayout();
    }

    public function newAction() {
        $this->_forward('edit');
    }

    public function editAction() {
        $this->loadLayout();
        $this->_setActiveMenu('catalog/meanbee_shippingrules');
        $this->getLayout()->getBlock('head')->setCanLoadExtJs(true);
        $this->renderLayout();
    }
}