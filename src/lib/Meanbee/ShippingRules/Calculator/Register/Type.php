<?php
class Meanbee_Shippingrules_Calculator_Register_Type
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    /** @var Meanbee_Shippingrules_Calculator_Type_Abstract[] $children */
    protected $children = array();

    public function init()
    {
        $this->add('boolean', new Meanbee_Shippingrules_Calculator_Type_Boolean($this->registers));
        $this->add('enum', new Meanbee_Shippingrules_Calculator_Type_Enum($this->registers));
        $this->add('number', new Meanbee_Shippingrules_Calculator_Type_Number($this->registers));
        $this->add('number_base26', new Meanbee_Shippingrules_Calculator_Type_NumberBase26($this->registers));
        $this->add('number_base36', new Meanbee_Shippingrules_Calculator_Type_NumberBase36($this->registers));
        $this->add('string', new Meanbee_Shippingrules_Calculator_Type_String($this->registers));
    }
    
    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Register_Abstract
     * @param  mixed   $child Potential child
     * @return bool
     */
    protected function isValidChild($child)
    {
        return $child instanceof Meanbee_Shippingrules_Calculator_Type_Abstract;
    }

    public function newInstanceOf($key, $args)
    {
        // NO-OP
        return null;
    }
}
