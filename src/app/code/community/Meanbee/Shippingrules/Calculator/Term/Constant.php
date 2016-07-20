<?php
class Meanbee_Shippingrules_Calculator_Term_Constant
    extends Meanbee_Shippingrules_Calculator_Term_Abstract
{
    /** @var int|float */
    private $value = 0;

    /**
     * Retrieves the currently set value.
     * @return int|float
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Sets the value to use.
     * @param int|float $value
     * @return $this
     */
    public function setValue($value)
    {
        if (is_numeric($value)) {
            $this->value = $value * 1;
        }
        return $this;
    }

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Term_Abstract
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public function evaluate($request)
    {
        return $this->getValue();
    }

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Term_Abstract
     * @param  Array                                      $obj       Descriptor array.
     * @param  Meanbee_Shippingrules_Calculator_Registers $registers
     * @return $this
     */
    public function init($obj, $registers)
    {
        parent::init($obj, $registers);
        $this->setValue($obj['value']);
        return $this;
    }
}
