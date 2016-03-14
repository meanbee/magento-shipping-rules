<?php
class Meanbee_Shippingrules_Model_Config_Source_RuleFields
{
    public function toOptionArray()
    {
        return array(
            array(
                'label' => $this->__('Enabled'),
                'value' => 'is_active'
            ),
            array(
                'label' => $this->__('Method Code'),
                'value' => 'rule_id'
            ),
            array(
                'label' => $this->__('Name'),
                'value'     => 'name'
            ),
            array(
                'label' => $this->__('Price'),
                'value'     => 'price'
            ),
            array(
                'label' => $this->__('Cost'),
                'value'     => 'cost'
            ),
            array(
                'label' => $this->__('Conditions'),
                'value'     => 'conditions'
            ),
            array(
                'label' => $this->__('Per Item'),
                'value'     => 'per_item'
            ),
            array(
                'label' => $this->__('Stop Processing'),
                'value'     => 'stop_rules_processing'
            ),
            array(
                'label' => $this->__('Stop All Processing'),
                'value'     => 'stop_all_rules_processing'
            ),
            array(
                'label' => $this->__('Notes'),
                'value'     => 'notes'
            ),
            array(
                'label' => $this->__('Sort Order'),
                'value'     => 'sort_order'
            ),
            array(
                'label' => $this->__('Display Sort Order'),
                'value'     => 'display_sort_order'
            )
        );
    }

    public function getLabelByValue($value)
    {
        $options = $this->toOptionArray();
        foreach ($options as $option) {
            if ($option['value'] === $value) {
                return $option['label'];
            }
        }
        return null;
    }

    private function __($string)
    {
        return Mage::helper('meanbee_shippingrules')->__($string);
    }
}
