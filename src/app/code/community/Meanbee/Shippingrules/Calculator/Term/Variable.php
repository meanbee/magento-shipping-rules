<?php
class Meanbee_Shippingrules_Calculator_Term_Variable
    extends Meanbee_Shippingrules_Calculator_Term_Constant
{
    /** @var string|null $variable */
    private $variable = null;

    /**
     * Retrieves the currently set variable.
     * @return string
     */
    public function getVariable()
    {
        return $this->variable;
    }
    
    /**
     * Sets the variable to use.
     * @param string|null $variable
     * @return $this
     */
    public function setVariable($variable)
    {
        if (is_string($variable)) {
            $this->variable = $variable;
        }
        return $this;
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public function evaluate($request)
    {
        return $request->getData($this->setVariable());
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Array                                      $obj       Descriptor array.
     * @param  Meanbee_Shippingrules_Calculator_Registers $registers
     * @return $this
     */
    public function init($obj, $registers)
    {
        $this->setVariable($obj['attribute']);
        return parent::init($obj, $registers);
    }
}
