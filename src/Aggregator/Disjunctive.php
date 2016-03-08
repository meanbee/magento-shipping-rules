<?php
class Aggregator_Disjunctive extends Aggregator_Abstract implements Boolean
{
    /** @var Condition_Abstract $conditions */
    private $conditions = array();

    /** @var boolean $value */
    private $value = true;

    /**
     * [add description]
     * @todo
     * @implementation Aggregator_Abstract
     * @param  Condition_Abstract $condition [description]
     * @return $this
     */
    public function add($condition)
    {
        if ($condition instanceof Boolean) {
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
     * @implementation Aggregator_Abstract
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
