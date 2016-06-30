<?php
class Meanbee_Shippingrules_Calculator_Term_Variable
    extends Meanbee_Shippingrules_Calculator_Term_Constant
{
    /** @var string|null $variable */
    private $variable = null;

    /** @var array|null $variable */
    private $products = null;

    /**
     * Retrieves the currently set variable.
     * @return string
     */
    public function getVariable()
    {
        return $this->variable;
    }
    
    /**
     * Sets the variable to use.
     * @param string|null $variable
     * @return $this
     */
    public function setVariable($variable)
    {
        if (is_string($variable)) {
            $this->variable = $variable;
        }
        return $this;
    }

    /**
     * Retrieves the currently set products.
     * @return array
     */
    public function getProducts()
    {
        return $this->products;
    }
    
    /**
     * Sets the products to use.
     * @param array|null $products
     * @return $this
     */
    public function setProducts($products)
    {
        if (is_array($products)) {
            $this->products = $products;
        }
        return $this;
    }


    /**
     * {@inheritdoc}
     * @override
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return int|float
     */
    public function evaluate($request)
    {
        $products = $this->getProducts() ?: $request->getAllItems();
        $sum = 0;
        foreach ($products as $product) {
            $sum += $product->getData($this->getVariable());
        }
        return $sum;
    }

    /**
     * {@inheritdoc}
     * @override
     * @param  Array                                      $obj       Descriptor array.
     * @param  Meanbee_Shippingrules_Calculator_Registers $registers
     * @return $this
     */
    public function init($obj, $registers)
    {
        return parent::init($obj, $registers)->setVariable($obj['attribute']);
    }
}
