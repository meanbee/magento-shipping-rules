<?php
class Meanbee_Shippingrules_Calculator_Register_Aggregator
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    /** @var Meanbee_Shippingrules_Calculator_Aggregator_Abstract[] $children */
    protected $children = array();

    public function init()
    {
        $this->add('summative', new Meanbee_Shippingrules_Calculator_Aggregator_Summative);
        $this->add('conjunctive', new Meanbee_Shippingrules_Calculator_Aggregator_Conjunctive);
        $this->add('disjunctive', new Meanbee_Shippingrules_Calculator_Aggregator_Disjunctive);
        $this->add('intersectional', new Meanbee_Shippingrules_Calculator_Aggregator_Intersectional);
        $this->add('unional', new Meanbee_Shippingrules_Calculator_Aggregator_Unional);
    }

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Register_Abstract
     * @param  mixed   $child Potential child
     * @return boolean
     */
    protected function isValidChild($child)
    {
        return $child instanceof Meanbee_Shippingrules_Calculator_Aggregator_Abstract;
    }

}
