<?php
class Meanbee_Shippingrules_Calculator_Term_Multiple
    extends Meanbee_Shippingrules_Calculator_Term_Variable
{
    /**
     * [evaluate description]
     * @todo
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request [description]
     * @return int|float                                 [description]
     */
    public function evaluate($request)
    {
        return parent::evaluate($request) * $this->getValue();
    }

    /**
     * [init description]
     * @todo
     * @override
     * @param  [type] $obj [description]
     * @return $this       [description]
     */
    public function init($obj, $context)
    {
        return parent::init($obj, $context)->setValue($obj['multiplier']);
    }
}
