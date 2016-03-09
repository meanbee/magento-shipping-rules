<?php
class Meanbee_Shippingrules_Calculator_Register_Type
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    use Meanbee_Shippingrules_Calculator_Singleton_Trait;

    /** @var Meanbee_Shippingrules_Calculator_Type_Abstract[] $children */
    protected $children = array();

    /**
     * {@inheritdoc}
     * @todo
     * @implementation Meanbee_Shippingrules_Calculator_Register_Abstract
     * @param  mixed   $child [description]
     * @return boolean        [description]
     */
    protected function isValidChild($child)
    {
        return $child instanceof Meanbee_Shippingrules_Calculator_Type_Abstract;
    }

    /**
     * [newInstanceOf description]
     * @override
     * @param  string $key  [description]
     * @param  array  $args [description]
     * @return null         [description]
     */
    public function newInstanceOf($key, $args)
    {
        // NO-OP
        return null;
    }

}
