<?php
class Register_Condition extends Register_Abstract
{
    use Singleton_Trait;

    /** @var Condition_Abstract[] $children */
    protected $children = array();

    private function __construct()
    {
        $this->add('cart', new Condition_Cart);
        $this->add('customer', new Condition_Customer);
        $this->add('destination', new Condition_Destination);
        $this->add('destination_postalcode', new Condition_Destination_PostalCode);
        $this->add('environment', new Condition_Environment);
        $this->add('product', new Condition_Product);
        $this->add('promotion', new Condition_Promotion);
        $this->add('time', new Condition_Time);
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
        return $child instanceof Condition_Abstract;
    }

    public function getConditions($context) {
        $collectedConditions = array();
        foreach ($this->children as $registerKey => $conditionGroup) {
            $conditions = $conditionGroup->getVariables($context);
            if (!empty($conditions)) {
                $key = $conditionGroup->getCategory();
                $collectedConditions[$key] = array_merge(
                    isset($collectedConditions[$key]) ? $collectedConditions[$key] : array(),
                    array_map(function ($condition) use ($registerKey) {
                        return array_merge(array('registerKey' => $registerKey), $condition);
                    }, $conditions)
                );
            }
        }
        return $collectedConditions;
    }
}
