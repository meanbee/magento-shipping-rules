<?php
class Meanbee_Shippingrules_Calculator_Condition_Destination_PostalCode
    extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
    /** @var Meanbee_Shippingrules_Calculator_Aggregator_Abstract(implements:Boolean) $aggregator */
    private $aggregator = null;

    /**
     * Retrieves the currently set aggregator.
     * @return Meanbee_Shippingrules_Calculator_Aggregator_Abstract(implements:Boolean)
     */
    public function getAggregator()
    {
        return $this->aggregator;
    }

    /**
     * Sets the aggregator to use.
     * @param Meanbee_Shippingrules_Calculator_Aggregator_Abstract(implements:Boolean) $aggregator
     * @return $this
     */
    public function setAggregator($aggregator)
    {
        if (
            $aggregator instanceof Meanbee_Shippingrules_Calculator_Aggregator_Abstract &&
            $aggregator instanceof Meanbee_Shippingrules_Calculator_Boolean
        ) {
        	$this->aggregator = $aggregator;
        }
        return $this;
    }

    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return array[] Variable descriptors.
     */
    public function getVariables()
    {
        return array(
            'dest_postal_code'       => array('label' => 'Shipping Postal Code', 'type' => array('enumerated'), 'options' => array()),
            'dest_postal_code_full'  => array('label' => 'Entire Postal Code',   'type' => array('number_base36')),
            'dest_postal_code_part1' => array('label' => 'Part 1',               'type' => array('number_base36')),
            'dest_postal_code_part2' => array('label' => 'Part 2',               'type' => array('number_base36')),
            'dest_postal_code_part3' => array('label' => 'Part 3',               'type' => array('number_base36')),
            'dest_postal_code_part4' => array('label' => 'Part 4',               'type' => array('number_base36'))
        );
    }

    /**
    * Evaluates the truth of the condition and associated aggregator.
    * @override
    * @param Mage_Shipping_Model_Rate_Request $request
    * @return boolean
    */
    public function evaluate($request)
    {
        if ($this->getVariable() === 'dest_postal_code') {
            return $this->evaluatePostalCode($request) && $this->getAggregator()->evaluate($request);
        }
         return parent::evaluate($request);
    }

    private function evaluatePostalCode(&$request)
    {
        $postalCodeFormatsPath = implode(DIRECTORY_SEPARATOR, array($_SERVER['DOCUMENT_ROOT'],'js','lib','Meanbee','ShippingRulesLibrary','data','postal_code_formats.json'));
        $postalCodeFormats = json_decode(file_get_contents($postalCodeFormatsPath), true);
        $formatData = array_filter($postalCodeFormats, array($this, 'filterPostalCodeFormatData'));
        foreach ($formatData as $format) {
            $matches = array();
            $result = preg_match($format['parser'], preg_replace('/\s|­|–|‑|—|-|‒|‐|:/', '', $request->getData('dest_postcode')), $matches);
            if (!$result) {
                continue;
            }
            foreach ($format['parts'] as $part => $type) {
                if (!$type) {
                     continue;
                }
                $request->setData($part ? 'dest_postal_code_part'.$part : 'dest_postal_code_full', $matches[$part]);
            }
            Mage::log(json_encode($request->getData(), JSON_PRETTY_PRINT), Zend_Log::DEBUG, 'meanbee_shippingrules.log', true);
            return true;
        }
        return false;
    }

    private function filterPostalCodeFormatData($format)
    {
        return isset($format['value']) && ($format['value'] === $this->getValue());
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Array $obj Descriptor array.
     * @return $this
     */
    public function init($obj, $registers) {
        $this->setVariable($obj['variable'])
             ->setComparator(
                $registers->getComparatorRegister()->newInstanceOf(
                    ($obj['variable'] === 'dest_postal_code') ? 'equal' : $obj['comparator']['key'],
                    $this->getVariables()[$obj['variable']],
                    $registers
                )
            )->setValue($obj['value']);
        if ($this->getVariable() === 'dest_postal_code') {
            $this->setAggregator(
                $registers->getAggregatorRegister()->newInstanceOf($obj['aggregator']['key'], $obj['aggregator'])
            );
        }
        return $this;
    }
}
