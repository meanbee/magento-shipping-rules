<?php
class Meanbee_Shippingrules_Calculator_Register_Condition
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    use Meanbee_Shippingrules_Calculator_Singleton_Trait;

    /** @var Meanbee_Shippingrules_Calculator_Condition_Abstract[] $children */
    protected $children = array();

    private function __construct()
    {
        $this->add('cart', new Meanbee_Shippingrules_Calculator_Condition_Cart);
        $this->add('customer', new Meanbee_Shippingrules_Calculator_Condition_Customer);
        $this->add('destination', new Meanbee_Shippingrules_Calculator_Condition_Destination);
        $this->add('destination_postalcode', new Meanbee_Shippingrules_Calculator_Condition_Destination_PostalCode);
        $this->add('environment', new Meanbee_Shippingrules_Calculator_Condition_Environment);
        $this->add('product', new Meanbee_Shippingrules_Calculator_Condition_Product);
        $this->add('promotion', new Meanbee_Shippingrules_Calculator_Condition_Promotion);
        $this->add('time', new Meanbee_Shippingrules_Calculator_Condition_Time);
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
        return $child instanceof Meanbee_Shippingrules_Calculator_Condition_Abstract;
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
