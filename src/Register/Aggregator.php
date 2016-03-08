<?php
class Register_Aggregator extends Register_Abstract
{
    use Singleton_Trait;

    /** @var Aggregator_Abstract[] $children */
    protected $children = array();

    /**
     * [__contruct description]
     * @todo
     */
    private function __construct()
    {
        $this->add('summative', new Aggregator_Summative);
        $this->add('conjunctive', new Aggregator_Conjunctive);
        $this->add('disjunctive', new Aggregator_Disjunctive);
    }

    /**
     * {@inheritdoc}
     * @todo
     * @implementation Register_Abstract
     * @param  mixed   $child [description]
     * @return boolean        [description]
     */
    protected function isValidChild($child)
    {
        return $child instanceof Aggregator_Abstract;
    }

}
