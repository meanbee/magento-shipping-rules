<?php
class Register_Comparator extends Register_Abstract
{
    use Singleton_Trait;

    /** @var Comparator_Abstract[] $children */
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
        return $child instanceof Comparator_Abstract;
    }
}
