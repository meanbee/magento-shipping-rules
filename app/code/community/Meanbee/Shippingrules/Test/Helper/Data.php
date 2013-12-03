<?php

class Meanbee_Shippingrules_Test_Helper_Data extends EcomDev_PHPUnit_Test_Case {

    /**
     * @dataProvider dataProvider
     * @loadExpectation
     *
     */
    public function testIsValidRegex($testId, $regex) {
        $expVal = $this->expected('t-%s', $testId)->getValue();

        $result = Mage::helper('meanship')->isValidRegex($regex);

        $this->assertEquals($expVal, $result);
    }
}
