<?php
interface Term_Conditional_Interface
{
    /**
     * Retrieves the currently set aggregator.
     * @return Aggregator_Abstract
     */
    public function getAggregator();

    /**
     * Sets the aggregator to use.
     * @param Aggregator_Abstract $aggregator
     * @return $this
     */
    public function setAggregator($aggregator);
}
