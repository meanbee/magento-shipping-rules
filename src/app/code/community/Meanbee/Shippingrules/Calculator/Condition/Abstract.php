<?php
abstract class Meanbee_Shippingrules_Calculator_Condition_Abstract
    implements Meanbee_Shippingrules_Calculator_Boolean
{
    /** @var Meanbee_Shippingrules_Calculator_* $parent */
    public $parent;

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

    /**
    * Evaluates the truth of the condition
    * @implementation Meanbee_Shippingrules_Calculator_Boolean
    * @param Mage_Shipping_Model_Rate_Request $request
    * @return boolean
    */
    public function evaluate($request)
    {
        return $this->getComparator()->evaluate(
            $this->getValue(),
            $this->getType($this->getVariable()),
            $request->getData($this->getVariable())
        );
    }

    /**
     * Initialises condition with desccriptor array.
     * @param  Array $obj Descriptor array.
     * @param  Meanbee_Shippingrules_Calculator_* $parent Parent object in evaluation tree.
     * @return $this
     */
    public function init($obj, &$parent) {
        $this->parent = $parent;
        return $this->setVariable($obj['attribute'])
                    ->setComparator(
                        Meanbee_Shippingrules_Calculator_Register_Comparator::instance()->newInstanceOf(
                            $obj['comparator'],
                            $this->getVariables($context)[$obj['attribute']],
                            $context
                        )
                    )
                    ->setValue($obj['value']);
    }
}
