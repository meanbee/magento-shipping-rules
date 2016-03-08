<?php
abstract class Condition_Abstract implements Boolean
{
    /** @var mixed|null $value */
    private $value = null;

    /** @var Comparator_Abstract|null $comparator */
    private $comparator = null;

    /** @var string|null $variable */
    private $variable = null;

    /**
     * [getCategory description]
     * @todo
     * @return string [description]
     */
    public abstract function getCategory();

    /**
     * [getVariables description]
     * @todo
     * @param  array   $context [description]
     * @return array[]          [description]
     */
    public abstract function getVariables($context);

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
     * @return Comparator_Abstract|null
     */
    public function getComparator()
    {
        return $this->comparator;
    }

    /**
     * Sets the comparator to use.
     * @param Comparator_Abstract $comparator
     * @return $this
     */
    public function setComparator($comparator)
    {
        if ($comparator instanceof Comparator_Abstract) {
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
    * [evaluate description]
    * @todo
    * @param Mage_Shipping_Model_Rate_Request $request [description]
    * @return boolean [description]
    */
    public function evaluate($request)
    {
        return $this->getComparator()->evaluate(
            $this->getValue(),
            $this->getType($this->getVariable()),
            $request->getData($this->getVariable())
        );
    }

    public function init($obj, $context) {
        return $this->setVariable($obj['attribute'])
                    ->setComparator(
                        Register_Comparator::instance()->newInstanceOf(
                            $obj['comparator'],
                            $this->getVariables($context)[$obj['attribute']],
                            $context
                        )
                    )
                    ->setValue($obj['value']);
    }
}
