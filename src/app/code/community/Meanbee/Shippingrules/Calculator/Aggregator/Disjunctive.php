<?php
class Meanbee_Shippingrules_Calculator_Aggregator_Disjunctive
    extends Meanbee_Shippingrules_Calculator_Aggregator_Abstract
    implements Meanbee_Shippingrules_Calculator_Boolean
{
    /** @var Meanbee_Shippingrules_Calculator_Condition_Abstract $conditions */
    private $conditions = array();

    /** @var boolean $value */
    private $value = true;

    /**
     * [add description]
     * @todo
     * @implementation Meanbee_Shippingrules_Calculator_Aggregator_Abstract
     * @param  Meanbee_Shippingrules_Calculator_Boolean $condition [description]
     * @return $this
     */
    public function add($condition)
    {
        if ($condition instanceof Meanbee_Shippingrules_Calculator_Boolean) {
            array_push($this->conditions, $condition);
        }
        return $this;
    }

    /**
     * Retrieves the currently set value.
     * @return boolean
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Sets the value to use.
     * @param boolean $value
     * @return $this
     */
    public function setValue($value)
    {
        if (is_bool($value)) {
            $this->value = $value;
        }
        return $this;
    }

    /**
     * [evaluate description]
     * @todo
     * @implementation Meanbee_Shippingrules_Calculator_Aggregator_Abstract
     * @param  Mage_Shipping_model_Rate_Request $request [description]
     * @return boolean                                   [description]
     */
    public function evaluate($request)
    {
        foreach ($this->conditions as $condition) {
            if ($condition->evaluate($request) === $this->getValue()) {
                return true;
            }
        }
        return false;
    }

    /**
     * [init description]
     * @todo
     * @override
     * @param  [type] $obj [description]
     * @return $this       [description]
     */
    public function init($obj, $context)
    {
        return parent::init($obj, $context)->setValue($obj['value']);
    }
}
