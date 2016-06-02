<?php
class Meanbee_Shippingrules_Calculator_Register_Comparator
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    /** @var Meanbee_Shippingrules_Calculator_Comparator_Abstract[] $children */
    protected $children = array();

    public function init()
    {
        $this->add('equal', new Meanbee_Shippingrules_Calculator_Comparator_Equal($this->registers));
    }

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Register_Abstract
     * @param  mixed   $child Potential child
     * @return boolean
     */
    protected function isValidChild($child)
    {
        return $child instanceof Meanbee_Shippingrules_Calculator_Comparator_Abstract;
    }
}
