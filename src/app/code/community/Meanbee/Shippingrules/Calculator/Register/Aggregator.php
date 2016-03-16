<?php
class Meanbee_Shippingrules_Calculator_Register_Aggregator
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    use Meanbee_Shippingrules_Calculator_Singleton_Trait;

    /** @var Meanbee_Shippingrules_Calculator_Aggregator_Abstract[] $children */
    protected $children = array();

    /**
     * [__contruct description]
     * @todo
     */
    private function __construct()
    {
        $this->add('summative', new Meanbee_Shippingrules_Calculator_Aggregator_Summative);
        $this->add('conjunctive', new Meanbee_Shippingrules_Calculator_Aggregator_Conjunctive);
        $this->add('disjunctive', new Meanbee_Shippingrules_Calculator_Aggregator_Disjunctive);
    }

    /**
     * {@inheritdoc}
     * @todo
     * @implementation Meanbee_Shippingrules_Calculator_Register_Abstract
     * @param  mixed   $child [description]
     * @return boolean        [description]
     */
    protected function isValidChild($child)
    {
        return $child instanceof Meanbee_Shippingrules_Calculator_Aggregator_Abstract;
    }

}
