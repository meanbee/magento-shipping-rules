<?php
class Meanbee_Shippingrules_Model_Rule extends Meanbee_Shippingrules_Model_Rule_Abstract {

    protected function _construct() {
        $this->_init('meanship/rule');
    }

    /**
     * Getter for rule combine conditions instance
     *
     * @return Mage_Rule_Model_Condition_Combine
     */
    public function getConditionsInstance() {
        return Mage::getModel('meanship/rule_condition_combine');
    }

    /**
     * Getter for rule actions collection instance
     *
     * @return Mage_Rule_Model_Action_Collection
     */
    public function getActionsInstance() {
        return Mage::getModel('catalogrule/rule_action_collection');
    }

    /**
     * Make a copy of the current rule object, save it and return.
     *
     * @return Meanbee_Shippingrules_Model_Rule
     */
    public function duplicate() {
        if (!$this->getId()) {
            Mage::throwException("Can't duplicate a rule that hasn't been saved");
        }

        $new_rule = Mage::getModel('meanship/rule')
            ->setData($this->getData())
            ->setId(null);

        $new_rule->save();

        return $new_rule;
    }
}
