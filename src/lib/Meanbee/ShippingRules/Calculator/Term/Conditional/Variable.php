<?php
class Meanbee_Shippingrules_Calculator_Term_Conditional_Variable
    extends Meanbee_Shippingrules_Calculator_Term_Variable
    implements Meanbee_Shippingrules_Calculator_Term_Conditional_Interface
{
    use Meanbee_Shippingrules_Calculator_Term_Conditional_Trait;

    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public function evaluate($request)
    {
        $this->setProducts($this->getAggregator()->evaluate($request));
        return parent::evaluate($request);
    }
}
