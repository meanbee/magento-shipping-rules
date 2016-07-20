<?php
/**
 * @extends Meanbee_Shippingrules_Calculator_Term_Constant
 * @implements Meanbee_Shippingrules_Calculator_Term_Conditional_Interface
 */
trait Meanbee_Shippingrules_Calculator_Term_Conditional_Trait
{
    /** @var Meanbee_Shippingrules_Calculator_Aggregator_Abstract $aggregator */
    private $aggregator = null;

    /**
     * {@inheritdoc}
     * @return Meanbee_Shippingrules_Calculator_Aggregator_Abstract
     */
    public function getAggregator()
    {
        return $this->aggregator;
    }

    /**
     * {@inheritdoc}
     * @param Meanbee_Shippingrules_Calculator_Aggregator_Abstract $aggregator
     * @return $this
     */
    public function setAggregator($aggregator)
    {
        if ($aggregator instanceof Meanbee_Shippingrules_Calculator_Aggregator_Abstract) {
            $this->aggregator = $aggregator;
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
        if ($this->getAggregator()->evaluate($request)) {
            return parent::evaluate($request);
        }
        return 0;
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Array                              $obj    Descriptor array
     * @return $this
     */
    public function init($obj, $registers)
    {
        return parent::init($obj, $registers)->setAggregator($registers->getAggregatorRegister()->newInstanceOf($obj['aggregator']['key'], $obj['aggregator']));
    }
}
