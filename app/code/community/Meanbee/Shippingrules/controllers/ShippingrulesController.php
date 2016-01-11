<?php
class Meanbee_Shippingrules_ShippingrulesController extends Mage_Adminhtml_Controller_Action {

    protected static $_READ_ACTIONS = array(
        'index',
        'edit',
        'exportCsv'
    );

    protected function _isAllowed() {
        $requires_write_permission = !in_array($this->getRequest()->getActionName(), self::$_READ_ACTIONS);

        if ($requires_write_permission) {
            return Mage::helper('meanship/acl')->isAllowedToWrite();
        } else {
            return Mage::helper('meanship/acl')->isAllowedToRead();
        }
    }

    public function indexAction() {
        $this->loadLayout();
        $this->_setActiveMenu('catalog/meanbee_shippingrules');
        $this->_setTitle('Manage Shipping Rules');
        $this->renderLayout();
    }

    public function newAction() {
        $this->_forward('edit');
    }

    public function editAction() {
        $id = $this->getRequest()->getParam('id', null);
        $model = Mage::getModel('meanship/rule');

        if ($id) {
            $model->load((int) $id);
            if ($model->getId()) {
                $data = Mage::getSingleton('adminhtml/session')->getFormData(true);
                if ($data) {
                    $model->setData($data)->setId($id);
                }

                $model->getConditions()->setJsFormObject('conditions_fieldset');

            } else {
                Mage::getSingleton('adminhtml/session')->addError(Mage::helper('meanship')->__('Shipping rule does not exist'));
                $this->_redirect('*/*/');
            }
        }
        Mage::register('meanship_data', $model);

        $this->loadLayout();
        $this->_setActiveMenu('catalog/meanbee_shippingrules');
        $this->getLayout()->getBlock('head')->setCanLoadExtJs(true);


        if ($id) {
            $this->_setTitle('Edit Shipping Rule');
        } else {
            $this->_setTitle('New Shipping Rule');
        }

        $this->renderLayout();
    }

    public function saveAction() {
        if ($data = $this->getRequest()->getPost()) {
            $model = Mage::getModel('meanship/rule');
            $id = $this->getRequest()->getParam('id');
            if ($id) {
                $model->load($id);
            }

            $data['conditions'] = $data['rule']['conditions'];
            unset($data['rule']);

            $forceRedirect = $this->_validateRegexConditions($data['conditions']);

            $data['per_item'] = (int) isset($data['per_item']);
            $data['stop_rules_processing'] = (int) isset($data['stop_rules_processing']);
            $data['stop_all_rules_processing'] = (int) isset($data['stop_all_rules_processing']);

            $model->loadPost($data);

            Mage::getSingleton('adminhtml/session')->setFormData($data);
            try {
                if ($id) {
                    $model->setId($id);
                }
                $model->save();

                if (!$model->getId()) {
                    Mage::throwException(Mage::helper('meanship')->__('Error saving shipping rule'));
                }

                Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('meanship')->__('Shipping rule was successfully saved.'));
                Mage::getSingleton('adminhtml/session')->setFormData(false);

                // The following line decides if it is a "save" or "save and continue"
                // forceRedirect is a boolean we set if the conditions contain an invalid regex.
                if ($forceRedirect || $this->getRequest()->getParam('back')) {
                    $this->_redirect('*/*/edit', array('id' => $model->getId()));
                } else {
                    $this->_redirect('*/*/');
                }

            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
                if ($model && $model->getId()) {
                    $this->_redirect('*/*/edit', array('id' => $model->getId()));
                } else {
                    $this->_redirect('*/*/');
                }
            }

            return;
        }
        Mage::getSingleton('adminhtml/session')->addError(Mage::helper('meanship')->__('No data found to save'));
        $this->_redirect('*/*/');
    }

    /**
     * Validates any regex conditions have valid regex values. We want to return back to the edit rule page if there
     * are any failures so return a boolean to indicate this.
     *
     * @param $conditions
     * @return bool
     */
    protected function _validateRegexConditions($conditions) {
        $redirectBackToEditPage = false;
        foreach ($conditions as $condition) {
            if (isset($condition['operator']) && $condition['operator'] == '//') {
                if(!Mage::helper('meanship')->isValidRegex($condition['value'])) {
                    Mage::getSingleton('adminhtml/session')->addError(sprintf("'%s' is not a valid regular expression. Your shipping rule may not behave as expected.", $condition['value']));
                    $redirectBackToEditPage = true;
                }
            }
        }

        return $redirectBackToEditPage;
    }

    public function deleteAction() {
        if ($id = $this->getRequest()->getParam('id')) {
            try {
                $model = Mage::getModel('meanship/rule');
                $model->setId($id);
                $model->delete();
                Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('meanship')->__('The shipping rule has been deleted.'));
                $this->_redirect('*/*/');
                return;
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
                return;
            }
        }

        Mage::getSingleton('adminhtml/session')->addError(Mage::helper('adminhtml')->__('Unable to find the shipping rule to delete.'));
        $this->_redirect('*/*/');
    }

    public function duplicateAction() {
        if ($id = $this->getRequest()->getParam('id')) {
            $model = Mage::getModel('meanship/rule')->load($id);

            if ($model->getId()) {
                $new_rule = $model->duplicate();
                $this->_addSuccess("Your rule has been successfully duplicated.  You can edit your newly created rule below.");
                $this->_redirect('*/*/edit', array('id' => $new_rule->getId()));
                return;
            } else {
                $this->_addError("Couldn't load the rule to be duplicated");
            }
        }

        $this->_redirect('*/*');
    }

    public function newConditionHtmlAction() {
        $id = $this->getRequest()->getParam('id');
        $typeArr = explode('|', str_replace('-', '/', $this->getRequest()->getParam('type')));
        $type = $typeArr[0];

        $model = Mage::getModel($type)
            ->setId($id)
            ->setType($type)
            ->setRule(Mage::getModel('meanship/rule'))
            ->setPrefix('conditions');

        if (!empty($typeArr[1])) {
            $model->setAttribute($typeArr[1]);
        }

        if ($model instanceof Mage_Rule_Model_Condition_Abstract) {
            $model->setJsFormObject($this->getRequest()->getParam('form'));
            $html = $model->asHtmlRecursive();
        } else {
            $html = '';
        }
        $this->getResponse()->setBody($html);
    }

    public function exportCsvAction() {
        $filename = sprintf('%s.csv', $this->_getDownloadFileName());
        $data = $this->getLayout()->createBlock('meanship/adminhtml_rules_grid')->getCsv();

        return $this->_setDownloadHeaders($filename, $data);
    }

    /**
     * Return a host-name-time-specific download filename without the file
     * extension.
     *
     * @return string
     */
    protected function _getDownloadFileName() {
        $base_url_parts = parse_url(Mage::getBaseUrl());
        return sprintf(
            'meanbee_shippingrules_%s_%s',
            str_replace('.', '_', $base_url_parts['host']),
            date('Ymd\THis')
        );
    }

    /**
     * Set headers that force a download in browsers.
     *
     * @param $filename
     * @param $data
     *
     * @return Mage_Core_Controller_Response_Http
     */
    protected function _setDownloadHeaders($filename, $data) {
        $response = $this->getResponse();

        $response->setHeader('Content-Type', 'application/octet-stream');
        $response->setHeader('Content-Transfer-Encoding', 'binary');
        $response->setHeader('Content-Disposition', 'attachment; filename="' . $filename . '"');

        $response->setBody($data);

        return $response;
    }

    public function massDeleteAction() {
        if ($this->getRequest()->isPost()) {
            $rule_ids = $this->getRequest()->getParam('rule_id');

            if (count($rule_ids) > 0) {
                foreach ($rule_ids as $rule_id) {
                    try {
                        Mage::getModel('meanship/rule')->load($rule_id)->delete();
                    } catch (Exception $e) {
                        $this->_addError("Unable to delete rule");
                    }
                }

                $this->_addSuccess('Successfully deleted shipping rules');
            } else {
                $this->_addNotice('No rules were selected for deletion');
            }
        }

        $this->_redirect('*/*');
    }

    public function massEnableAction() {
        if ($this->getRequest()->isPost()) {
            $rule_ids = $this->getRequest()->getParam('rule_id');

            if (count($rule_ids) > 0) {
                foreach ($rule_ids as $rule_id) {
                    try {
                        Mage::getModel('meanship/rule')->load($rule_id)->setIsActive(true)->save();
                    } catch (Exception $e) {
                        $this->_addError("Unable to enable rule");
                    }
                }

                $this->_addSuccess('Successfully enabled shipping rules');
            } else {
                $this->_addNotice('No rules were selected for enabling');
            }
        }

        $this->_redirect('*/*');
    }

    public function massDisableAction() {
        if ($this->getRequest()->isPost()) {
            $rule_ids = $this->getRequest()->getParam('rule_id');

            if (count($rule_ids) > 0) {
                foreach ($rule_ids as $rule_id) {
                    try {
                        Mage::getModel('meanship/rule')->load($rule_id)->setIsActive(false)->save();
                    } catch (Exception $e) {
                        $this->_addError("Unable to disable rule");
                    }
                }

                $this->_addSuccess('Successfully disabled shipping rules');
            } else {
                $this->_addNotice('No rules were selected for disabling');
            }
        }

        $this->_redirect('*/*');
    }

    public function importAction() {
        $this->loadLayout();
        $this->renderLayout();
    }

    public function importPostAction() {
        try {
            $temp_file_name = sprintf('meanbee_shippingrules_import_%s_%s.csv', date('su'), md5(time()));

            $uploader = new Varien_File_Uploader('csv_import');

            $uploader->setAllowedExtensions(array('csv'));
            $uploader->setAllowCreateFolders(false);
            $uploader->setFilesDispersion(false);
            $uploader->setAllowRenameFiles(false);

            $uploader->save(Mage::getBaseDir('tmp'), $temp_file_name);

            $temp_file_name_with_path = Mage::getBaseDir('tmp') . DS . $temp_file_name;

            $import_result = Mage::helper('meanship/import')->importRulesFromFile($temp_file_name_with_path);

            if ($import_result) {
                $this->_addSuccess("Your rules have been successfully imported");
                $this->_redirect('*/*/');
            } else {
                $this->_addError("An unknown error occurred during the import process");
                $this->_redirectReferer();
            }
        } catch (Exception $e) {
            $this->_addError(sprintf("Error attempting to import CSV: %s", $e->getMessage()));
            $this->_redirectReferer();
        }
    }

    protected function _addSuccess($message) {
        Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('meanship')->__($message));
    }

    protected function _addError($message) {
        Mage::getSingleton('adminhtml/session')->addError(Mage::helper('meanship')->__($message));
    }

    protected function _addNotice($message) {
        Mage::getSingleton('adminhtml/session')->addNotice(Mage::helper('meanship')->__($message));
    }

    protected function _setTitle($title) {
        $this->getLayout()->getBlock('head')->setTitle(Mage::helper('meanship')->__($title));
    }
}
