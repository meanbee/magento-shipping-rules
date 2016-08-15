<?php
class Meanbee_Shippingrules_Calculator_Register_Script
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    /** @var string[] $children */
    protected $children = array();

    public function init()
    {
    }
    
    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Register_Abstract
     * @param  mixed   $child Potential child
     * @return bool
     */
    protected function isValidChild($child)
    {
        return is_string($child);
    }

    public function newInstanceOf($key, $args)
    {
        // NO-OP
        return null;
    }

    public function addScriptsToBlock($block) {
        foreach ($this->children as $key => $url) {
            $block->addJs($url);
        }
    }
}
