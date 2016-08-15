<?php
interface Meanbee_Shippingrules_Calculator_Term_Conditional_Interface
{
    /**
     * Retrieves the currently set aggregator.
     * @return Meanbee_Shippingrules_Calculator_Aggregator_Abstract
     */
    public function getAggregator();

    /**
     * Sets the aggregator to use.
     * @param Meanbee_Shippingrules_Calculator_Aggregator_Abstract $aggregator
     * @return $this
     */
    public function setAggregator($aggregator);
}
