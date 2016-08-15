<?php
abstract class Meanbee_Shippingrules_Calculator_Condition_Abstract
    implements Meanbee_Shippingrules_Calculator_Boolean
{
    /** @var mixed|null $value */
    private $value = null;

    /** @var Meanbee_Shippingrules_Calculator_Comparator_Abstract|null $comparator */
    private $comparator = null;

    /** @var string|null $variable */
    private $variable = null;

    /**
     * Accessor method to get variable descriptors.
     * @return array[] Variable descriptorrs.
     */
    public abstract function getVariables();

    /**
     * Retrieves the currently set value.
     * @return mixed|null
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Sets the value to use.
     * @param mixed $value
     * @return $this
     */
    public function setValue($value)
    {
        if(!is_null($value)) {
            $this->value = $value;
        }
        return $this;
    }

    /**
     * Retrieves the currently set comparator.
     * @return Meanbee_Shippingrules_Calculator_Comparator_Abstract|null
     */
    public function getComparator()
    {
        return $this->comparator;
    }

    /**
     * Sets the comparator to use.
     * @param Meanbee_Shippingrules_Calculator_Comparator_Abstract $comparator
     * @return $this
     */
    public function setComparator($comparator)
    {
        if ($comparator instanceof Meanbee_Shippingrules_Calculator_Comparator_Abstract) {
            $this->comparator = $comparator;
        }
        return $this;
    }

    /**
     * Sets the variable to use.
     * @param string $variable
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
     * Retrieves the currently set variable.
     *
     * @return string|null
     */
    public function getVariable()
    {
        return $this->variable;
    }

    public function getType() {
        return $this->getVariables()[$this->variable]['type'];
    }

    /**
     * Called to add variable data to shipping rate request.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request)
    {
        return $request;
    }

    /**
    * Evaluates the truth of the condition
    * @implementation Meanbee_Shippingrules_Calculator_Boolean
    * @param Mage_Shipping_Model_Rate_Request $request
    * @return boolean
    */
    public function evaluate($request)
    {
        $result = $this->getComparator()->evaluate(
            $this->getValue(),
            $request->getData($this->getVariable()),
            $this->getType()
        );
        return $result;
    }

    /**
     * Initialises condition with desccriptor array.
     * @param  Array                                      $obj       Descriptor array.
     * @param  Meanbee_Shippingrules_Calculator_Registers $registers
     * @return $this
     */
    public function init($obj, $registers) {
        return $this->setVariable($obj['variable'])
                    ->setComparator(
                        $registers->getComparatorRegister()->newInstanceOf(
                            $obj['comparator']['key'],
                            $this->getVariables()[$obj['variable']]
                        )
                    )
                    ->setValue($obj['value']);
    }
}
