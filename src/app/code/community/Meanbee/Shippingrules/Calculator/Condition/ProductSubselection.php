<?php
class Meanbee_Shippingrules_Calculator_Condition_ProductSubselection
    extends Meanbee_Shippingrules_Calculator_Condition_Abstract
{
    /** @var Meanbee_Shippingrules_Calculator_Term_Abstract $term */
    private $term = null;

    /**
     * Retrieves the currently set term.
     * @return Meanbee_Shippingrules_Calculator_Term_Abstract
     */
    public function getTerm()
    {
        return $this->term;
    }

    /**
     * Sets the term to use.
     * @param Meanbee_Shippingrules_Calculator_Term_Abstract $term
     * @return $this
     */
    public function setTerm($term)
    {
        if ($term instanceof Meanbee_Shippingrules_Calculator_Term_Abstract) {
        	$this->term = $term;
        }
        return $this;
    }
    /**
     * {@inheritdoc}
     * @implementation Meanbee_Shippingrules_Calculator_Condition_Abstract
     * @return array[] Variable descriptors.
     */
    public function getVariables() {
        return array_merge($this->ajaxAttributes(), array(
            'product_subselection' => array('label' => 'Product Subselection', 'type' => array('number'))
        ));
    }

    public function ajaxAttributes() {
        $attributes = array(
            'qty' => array('label' => 'Quantity in Cart', 'type' => array('number')),
            'price' => array('label' => 'Price in Cart', type => array('number'))
        );
        $productAttributes = Mage::getResourceSingleton('catalog/product')
            ->loadAllAttributes()
            ->getAttributesByCode();

        foreach ($productAttributes as $attribute) {
            /** @var Mage_Catalog_Model_Resource_Eav_Attribute $attribute */
            if ($attribute->getDataUsingMethod('is_used_for_promo_rules')) {
                switch($attribute->getFrontendInput()) {
                    case 'boolean':
                    case 'date':
                        $attributeType = $attribute->getFrontendInput();
                        break;
                    case 'price':
                        $attributeType = 'currency';
                        break;
                    default:
                        switch ($attribute->getFrontendClass()) {
                            case 'validate-number':
                                $attributeType = 'number';
                                break;
                            case 'validate-digits':
                                $attributeType = 'numeric_b10';
                                break;
                            default:
                                $attributeType = 'string';
                        }
                        break;
                }

                $attributes[$attribute->getAttributeCode()] = array(
                    'label' => $attribute->getFrontendLabel(),
                    'type' => array($attributeType)
                );
            }
        }
        asort($attributes);
        return $attributes;
    }

    /**
     * {@inheritdoc}
     * @override
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return boolean
     */
    public function evaluate($request) {
        $comp = @end(explode('_', get_class($this->getComparator())));
        if ($this->getVariable() === 'product_subselection') {
            $result = $this->getComparator()->evaluate(
                $this->getValue(),
                $this->getTerm()->evaluate($request),
                $this->getType()
            );
        } else {
            $result = $this->getComparator()->evaluate(
                $this->getValue(),
                $request->getData('current_item')->getProduct()->getData($this->getVariable()) ?: $request->getData('current_item')->getData($this->getVariable()),
                $this->getType()
            );
        }
        return $result;
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Array $obj Descriptor array.
     * @return $this
     */
    public function init($obj, $registers) {
        parent::init($obj, $registers);
        if ($this->getVariable() === 'product_subselection') {
            $this->setTerm($registers->getTermRegister()->newInstanceOf('product_subselection', $obj['term']));
        }
        return $this;
    }
}