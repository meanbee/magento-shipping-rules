<?php
class Register_Term extends Register_Abstract
{
    use Singleton_Trait;

    /** @var Term_Abstract[] $children */
    protected $children = array();

    private function __construct()
    {
        $this->add('constant', new Term_Constant);
        $this->add('conditionalMultiple', new Term_Conditional_Multiple);
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
        return $child instanceof Term_Abstract;
    }
}
