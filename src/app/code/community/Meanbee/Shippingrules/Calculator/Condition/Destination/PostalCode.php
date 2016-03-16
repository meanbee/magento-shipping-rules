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
     * @todo
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return string [description]
     */
    public function getCategory() {
        return 'Shipping Destination Conditions';
    }

    /**
     * {@inheritdoc}
     * @todo
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return array[] [description]
     */
    public function getVariables($context) {
        $variables = array();
        if (!isset($context['group']) || is_null($context)) {
            $variables = array_merge($variables, array(
                'dest_postal_code'       => array('label' => 'Shipping Postal Code', 'type' => array('enumerated'), 'options' => array())
            ));
        }
        if ((isset($context['group']) && $context['group'] === 'PostalCode') || is_null($context)) {
            $variables = array_merge($variables, array(
                'dest_postal_code_full'  => array('label' => 'Entire Postal Code', 'type' => array('numeber_base36')),
                'dest_postal_code_part1' => array('label' => 'Part 1',             'type' => array('numeber_base36')),
                'dest_postal_code_part2' => array('label' => 'Part 2',             'type' => array('numeber_base36')),
                'dest_postal_code_part3' => array('label' => 'Part 3',             'type' => array('numeber_base36')),
                'dest_postal_code_part4' => array('label' => 'Part 4',             'type' => array('numeber_base36'))
            ));
        }
        return $variables;
    }

    /**
    * [evaluate description]
    * @todo
    * @override
    * @param Mage_Shipping_Model_Rate_Request $request [description]
    * @return boolean [description]
    */
    public function evaluate($request) {
        if ($this->getVariable() === 'dest_postal_code') {
            return parent::evaluate($request) && $this->getAggregator->evaluate($request);
        }
         return parent::evaluate($request);
    }

    public function init($obj, $context) {
        $this->setVariable($obj['attribute'])
             ->setComparator(
                Meanbee_Shippingrules_Calculator_Register_Comparator::instance()->newInstanceOf(
                    '===',
                    $this->getVariables($context)[$obj['attribute']],
                    $context
                )
             )
             ->setValue($obj['value']);
        if ($this->getVariable() === 'dest_postal_code') {
            $this->setAggregator(
                Meanbee_Shippingrules_Calculator_Register_Aggregator::instance()->newInstanceOf(
                    $obj['aggregator']['aggregator'],
                    $obj['aggregator'],
                    array('group' => 'PostalCode', 'format' => $this->getValue())
                )
            );
        }
        return $this;
    }
}
