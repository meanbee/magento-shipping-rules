<?php
class Meanbee_Shippingrules_Calculator_Register_Condition
    extends Meanbee_Shippingrules_Calculator_Register_Abstract
{
    /** @var Meanbee_Shippingrules_Calculator_Condition_Abstract[] $children */
    protected $children = array();

    public function init()
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
     * @implementation Meanbee_Shippingrules_Calculator_Register_Abstract
     * @param  mixed   $child Potential child
     * @return boolean
     */
    protected function isValidChild($child)
    {
        return $child instanceof Meanbee_Shippingrules_Calculator_Condition_Abstract;
    }

    /**
     * Called to add variable data to shipping rate request.
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return mage_Shipping_Model_Rate_Request
     */
    public function addVariablesToRequest($request) {
        foreach ($this->children as $key => $child) {
            $request = $child->addVariablesToRequest($request);
        }
        return $request;
    }
}
