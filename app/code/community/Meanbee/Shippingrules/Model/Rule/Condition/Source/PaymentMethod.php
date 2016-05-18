<?php
class Meanbee_Shippingrules_Model_Rule_Condition_Source_PaymentMethod {
    public function toOptionArray() {
        $payments = Mage::getSingleton('payment/config')->getAllMethods();
        $paymentMethods = array();

        foreach ($payments as $paymentCode => $paymentModel) {
            $paymentMethods[] = array(
                'label' => $paymentModel->getTitle(),
                'value' => $paymentCode
            );
        }

        return $paymentMethods;
    }
}
