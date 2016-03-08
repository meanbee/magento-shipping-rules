<?php
class Term_Constant extends Term_Abstract
{
    /** @var int|float|null */
    private $value = null;

    /**
     * Retrieves the currently set value.
     * @return int|float|null
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
     * [evaluate description]
     * @todo
     * @implementation Term_Abstract
     * @param  Mage_Shipping_Model_Rate_Request $request [description]
     * @return int|float                                 [description]
     */
    public function evaluate($request)
    {
        return $this->getValue();
    }

    /**
     * [init description]
     * @todo
     * @implementation Term_Abstract
     * @param  [type] $obj [description]
     * @return $this       [description]
     */
    public function init($obj, $context)
    {
        $this->setValue($obj['value']);
        return $this;
    }
}
