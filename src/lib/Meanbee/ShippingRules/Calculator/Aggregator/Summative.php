<?php
class Meanbee_Shippingrules_Calculator_Aggregator_Summative
    extends Meanbee_Shippingrules_Calculator_Aggregator_Abstract
    implements Meanbee_Shippingrules_Calculator_Numeric
{
    /** @var Term_Abstract[] $terms */
    private $terms = array();

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Numeric
     * @param  Meanbee_Shippingrules_Calculator_Term_Abstract $term Child
     * @return $this
     */
    public function add($term)
    {
        if ($term instanceof Meanbee_Shippingrules_Calculator_Numeric) {
            array_push($this->terms, $term);
        }
        return $this;
    }

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Aggregator_Abstract
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float                                 Aggregated value
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
