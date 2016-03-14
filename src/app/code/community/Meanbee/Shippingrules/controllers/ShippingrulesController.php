<?php
class Meanbee_Shippingrules_ShippingrulesController
    extends Mage_Adminhtml_Controller_Action
{
    public function indexAction()
    {
        $this->loadLayout()
             ->_setActiveMenu('catalog/meanbee_shippingrules')
             ->_setTitle('Manage Shipping Rules')
             ->renderLayout();
    }

    public function newAction()
    {
        $this->_forward('edit');
    }

    public function deleteAction()
    {
        if ($id = $this->getRequest()->getParam('id')) {
            try {
                Mage::getModel('meanbee_shippingrules/rule')->setId($id)->delete();
                $this->_addSuccess('The shipping rule has been deleted.')
                     ->_redirect('*/*/');
                return;
            } catch (Exception $e) {
                $this->_addError($e->getMessage())
                     ->_redirect('*/*/edit', array('id' => $id));
                return;
            }
        }
        $this->_addError('Unable to find the shipping rule to delete.')
             ->_redirect('*/*/');
    }

    public function duplicateAction()
    {
        if ($id = $this->getRequest()->getParam('id')) {
            $model = Mage::getModel('meanbee_shippingrules/rule')->load($id);
            if ($model->getId()) {
                $new_rule = $model->duplicate();
                $this->_addSuccess('Your rule has been successfully duplicated. You can edit your newly created rule below.')
                     ->_redirect('*/*/edit', array('id' => $new_rule->getId()));
                return;
            } else {
                $this->_addError("Couldn't load the rule to be duplicated");
            }
        }

        $this->_redirect('*/*');
    }

    public function massEnableAction()
    {
        $this->_massAction('enable', 'enabled', 'enabling', function ($rule) {
            $rule->setIsActive(true)
                 ->save();
        });
    }

    public function massDisableAction()
    {
        $this->_massAction('disable', 'disabled', 'disabling', function ($rule) {
            $rule->setIsActive(false)
                 ->save();
        });
    }

    public function massDeleteAction()
    {
        $this->_massAction('delete', 'deleted', 'deleting', function ($rule) {
            $rule->delete();
        });
    }

    protected function _massAction($infinitive, $past, $present, $callback)
    {
        if ($this->getRequest()->isPost()) {
            $rule_ids = $this->getRequest()->getParam('rule_id');
            $count = count($rule_ids);
            if ($count > 0) {
                $rules = Mage::getModel('meanbee_shippingrules/rule')->getCollection()
                                                                     ->addFieldToFilter('rule_id', array('in' => $rule_ids));
                foreach ($rules as $rule) {
                    try {
                        $callback($rule);
                    } catch (Exception $err) {
                        $this->_addError('Unable to ' . $infinitive . 'rule' . ($count > 1 ? 's' : ''));
                    }
                }
                $this->_addSuccess('Successfully ' . $past . ' shipping rule' . ($count > 1 ? 's' : ''));
            } else {
                $this->_addNotice('No rules were selected for ' . $present);
            }
        }
        $this->_redirect('*/*');
    }

    protected function _setTitle($title)
    {
        $this->getLayout()->getBlock('head')->setTitle(Mage::helper('meanbee_shippingrules')->__($title));
        return $this;
    }

    protected function _addSuccess($message)
    {
        Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('meanbee_shippingrules')->__($message));
        return $this;
    }

    protected function _addError($message)
    {
        Mage::getSingleton('adminhtml/session')->addError(Mage::helper('meanbee_shippingrules')->__($message));
        return $this;
    }

    protected function _addNotice($message)
    {
        Mage::getSingleton('adminhtml/session')->addNotice(Mage::helper('meanbee_shippingrules')->__($message));
        return $this;
    }

}
