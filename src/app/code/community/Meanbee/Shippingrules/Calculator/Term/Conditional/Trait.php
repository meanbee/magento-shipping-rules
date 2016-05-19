<?php
/**
 * @extends Meanbee_Shippingrules_Calculator_Term_Constant
 * @implements Meanbee_Shippingrules_Calculator_Term_Conditional_Interface
 */
trait Term_Conditional_Trait
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
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Array                              $obj    Descriptor array
     * @param  Meanbee_Shippingrules_Calculator_* $parent Parent object in evaluation tree.
     * @return $this
     */
    public function init($obj, $context)
    {
        return parent::init($obj, $context)->setAggregator(Meanbee_Shippingrules_Calculator_Register_Aggregator::instance()->newInstanceOf($obj['aggregator']['aggregator'], $obj['aggregator'], $context));
    }
}
