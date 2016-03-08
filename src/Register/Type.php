<?php
class Register_Type extends Register_Abstract
{
    use Singleton_Trait;

    /** @var Type_Abstract[] $children */
    protected $children = array();

    /**
     * {@inheritdoc}
     * @todo
     * @implementation Register_Abstract
     * @param  mixed   $child [description]
     * @return boolean        [description]
     */
    protected function isValidChild($child)
    {
        return $child instanceof Type_Abstract;
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
