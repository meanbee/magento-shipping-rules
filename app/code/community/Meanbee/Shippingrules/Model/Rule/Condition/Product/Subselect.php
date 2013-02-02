<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Product_Subselect extends Mage_SalesRule_Model_Rule_Condition_Product_Subselect {
    public function __construct() {
        parent::__construct();
        $this->setType('meanship/rule_condition_product_subselect')
            ->setValue(null);
    }

    /**
     * validate
     *
     * @param Varien_Object $object Quote
     * @return boolean
     */
    public function validate(Varien_Object $object) {
        if (!$this->getConditions()) {
            return false;
        }

        $attr = $this->getAttribute();
        $total = 0;
        foreach ($object->getData('all_items') as $item) {
            if ($this->_validateItem($item)) {
                $total += $item->getData($attr);
            }
        }

        return $this->validateAttribute($total);
    }

    /**
     * From Mage_Rule_Model_Condition_Combine::validate().
     *
     * @param Varien_Object $object
     *
     * @return bool
     */
    protected function _validateItem(Varien_Object $object) {
        if (!$this->getConditions()) {
            return true;
        }

        $all    = $this->getAggregator() === 'all';
        $true   = (bool)$this->getValue();

        foreach ($this->getConditions() as $cond) {
            $validated = $cond->validate($object);

            if ($all && $validated !== $true) {
                return false;
            } elseif (!$all && $validated === $true) {
                return true;
            }
        }
        return $all ? true : false;
    }
}