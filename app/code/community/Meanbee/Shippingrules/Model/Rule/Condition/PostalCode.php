<?php
class Meanbee_Shippingrules_Model_Rule_Condition_PostalCode extends Mage_Rule_Model_Condition_Combine
{
    public function __construct()
    {
        parent::__construct();
        $this->setType('meanship/rule_condition_postalCode');
    }

    public function getNewChildSelectOptions()
    {
        $conditions = parent::getNewChildSelectOptions();
        $types = array('str', 'b26', 'b10', 'b36');
        foreach ($types as $type) {
            $conditions[] = array(
                'label' => 'Entire Postal Code',
                'value' => "meanship/rule_condition|dest_postal_code_p0_{$type}"
            );
        }
        foreach ($types as $type) {
            $conditions[] = array(
                'label' => '1st Part',
                'value' => "meanship/rule_condition|dest_postal_code_p1_{$type}"
            );
        }
        foreach ($types as $type) {
            $conditions[] = array(
                'label' => '2nd Part',
                'value' => "meanship/rule_condition|dest_postal_code_p2_{$type}"
            );
        }
        foreach ($types as $type) {
            $conditions[] = array(
                'label' => '3rd Part',
                'value' => "meanship/rule_condition|dest_postal_code_p3_{$type}"
            );
        }
        foreach ($types as $type) {
            $conditions[] = array(
                'label' => '4th Part',
                'value' => "meanship/rule_condition|dest_postal_code_p4_{$type}"
            );
        }
        return $conditions;
    }

    public function loadValueOptions()
    {
        $valueOptions = array();
        foreach (Meanbee_Shippingrules_Helper_Postcode::$POSTAL_CODES as $postalCodeData) {
            $valueOptions[$postalCodeData['code']] = Mage::helper('meanship/country')->toRegionalIndicatorSymbols($postalCodeData['code']) . ' '
                                                    . $postalCodeData['name']
                                                    . (isset($postalCodeData['prefix']) ? '  ['.$postalCodeData['prefix'].']' : '');
        }
        $this->setValueOptions($valueOptions);
        return $this;
    }

    public function getValueName()
    {
        $value = $this->getValue();
        if (is_null($value) || '' === $value) {
            return '...';
        }
        $options = $this->getValueOptions();
        if (!empty($options)) {
            foreach ($options as $v => $label) {
                if ($v == $value) {
                    return $label;
                }
            }
        }
    }

    public function getValueElement()
    {
        $this->loadValueOptions();
        return $this->getForm()->addField("{$this->getPrefix()}__{$this->getId()}__value", 'select', array(
            'name'    => "rule[{$this->getPrefix()}][{$this->getId()}][value]",
            'value'   => $this->getValue(),
            'values'  => array_merge(array('Please choose a country...'), $this->getValueOptions()),
            'value_name' => $this->getValueName(),
            'after_element_html' => $this->getValueAfterElementHtml(),
            'explicit_apply'     => $this->getExplicitApply()
        ))->setRenderer(Mage::getBlockSingleton('rule/editable'));
    }

    public function asHtml()
    {
        return $this->getTypeElement()->getHtml().Mage::helper('meanship')->__('Postal Code of %s matches %s of these conditions:', $this->getValueElement()->getHtml(), $this->getAggregatorElement()->getHtml()).$this->getRemoveLinkHtml();
    }

    public function asString()
    {
        return Mage::helper('meanship')->__('Postal Code of %s matches %s of these conditions:', $this->getValueName(), strtoupper($this->getAggregator()));
    }
}
