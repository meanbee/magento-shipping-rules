<?php
class Meanbee_Shippingrules_Calculator_Type_Number
    extends Meanbee_Shippingrules_Calculator_Type_Abstract
{
    /**
     * {@inheritdoc}
     * @param  mixed $validValue Configured value
     * @return mixed             Sanitised value
     */
    public function sanitiseValidValue($validValue) {
        return floatval($validValue);
    }

    /**
     * {@inheritdoc}
     * @param  mixed $variableValue Customer value
     * @return mixed                Sanitised value
     */
    public function sanitiseVariableValue($variableValue) {
        return floatval($variableValue);
    }
}