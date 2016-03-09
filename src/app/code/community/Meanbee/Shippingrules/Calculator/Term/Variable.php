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
     * [evaluate description]
     * @todo
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request [description]
     * @return int|float                                 [description]
     */
    public function evaluate($request)
    {
        return $request->getData($this->setVariable());
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
        $this->setVariable($obj['attribute']);
        return parent::init($obj, $context);
    }
}
