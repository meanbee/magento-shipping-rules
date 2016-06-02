<?php
class Meanbee_Shippingrules_Calculator_Register_Term
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    use Meanbee_Shippingrules_Calculator_Singleton_Trait;

    /** @var Meanbee_Shippingrules_Calculator_Term_Abstract[] $children */
    protected $children = array();

    public function init()
    {
        $this->add('constant', new Meanbee_Shippingrules_Calculator_Term_Constant);
        $this->add('conditionalMultiple', new Meanbee_Shippingrules_Calculator_Term_Conditional_Multiple);
    }

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Register_Abstract
     * @param  mixed   $child Potential child
     * @return boolean
     */
    protected function isValidChild($child)
    {
        return $child instanceof Meanbee_Shippingrules_Calculator_Term_Abstract;
    }
}
