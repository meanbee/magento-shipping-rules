<?php
abstract class Aggregator_Abstract
{
    /**
     * [evaluate description]
     * @todo
     * @param  Mage_Shipping_Model_Rate_Request $request [description]
     * @return bool|int|float                            [description]
     */
    public abstract function evaluate($request);

    /**
     * [add description]
     * @todo
     * @param  Aggregator_Abstract|Condition_Abstract|Term_Abstract $child [description]
     * @return $this
     */
    public abstract function add($child);

    /**
     * [init description]
     * @todo
     * @param  [type] $obj [description]
     * @return $this       [description]
     */
    public function init($obj, $context) {
        foreach ($obj['children'] as $child) {
            switch ($child['@type']) {
                case 'Aggregator':
                    $this->add(Register_Aggregator::instance()->newInstanceOf($child['aggregator'], $child, $context));
                    break;
                case 'Condition':
                    $this->add(Register_Condition::instance()->newInstanceOf($child['conditionType'], $child, $context));
                    break;
                case 'Term':
                    $this->add(Register_Term::instance()->newInstanceOf($child['term'], $child, $context));
                    break;
            }
        }
        return $this;
    }
}
