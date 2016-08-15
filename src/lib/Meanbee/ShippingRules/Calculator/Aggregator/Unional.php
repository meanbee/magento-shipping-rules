<?php
class Meanbee_Shippingrules_Calculator_Aggregator_Unional
    extends Meanbee_Shippingrules_Calculator_Aggregator_Abstract
    implements Meanbee_Shippingrules_Calculator_ProductSet
{
    /** @var Meanbee_Shippingrules_Calculator_Condition_Abstract[] $conditions */
    private $conditions = array();

    /** @var boolean $value */
    private $value = true;

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Aggregator_Abstract
     * @param  Meanbee_Shippingrules_Calculator_Boolean $condition Child
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
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Aggregator_Abstract
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return boolean                                   Aggregated value
     */
    public function evaluate($request)
    {
        $result = array();
        $products = $request->getAllItems() ?: array();
        if (!empty($products)) {
            foreach ($products as $product) {
                $request->setData('current_item', $product);
                if ($this->evaluateOverProduct($request)) {
                    $result[] = $product;
                }
            }
        }
        return $result;
    }

    /**
     * Evaluate the conditions on the current product.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return boolean                                   Product matches conditions.
     */
    protected function evaluateOverProduct($request) {
        foreach ($this->conditions as $condition) {
            if ($condition->evaluate($request) === $this->getValue()) {
                return true;
            }
        }
        return false;
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Array $obj Descriptor array
     * @return $this
     */
    public function init($obj, $registers)
    {
        return parent::init($obj, $registers)->setValue($obj['value']);
    }
}