<?php
class Aggregator_Summative extends Aggregator_Abstract implements Numeric
{
    /** @var Term_Abstract[] $terms */
    private $terms = array();

    /**
     * [add description]
     * @todo
     * @implementation Aggregator_Abstract
     * @param  Term_Abstract $term [description]
     * @return $this
     */
    public function add($term)
    {
        if ($term instanceof Numeric) {
            array_push($this->terms, $term);
        }
        return $this;
    }

    /**
     * [evaluate description]
     * @todo
     * @implementation Aggregator_Abstract
     * @param  Mage_Shipping_Model_Rate_Request $request [description]
     * @return int|float                                 [description]
     */
    public function evaluate($request)
    {
        $sum = 0;
        foreach ($this->terms as $term) {
            $sum += $term->evaluate($request);
        }
        return $sum;
    }
}
