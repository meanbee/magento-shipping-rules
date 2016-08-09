<?php
class Meanbee_Shippingrules_Model_Carrier extends Mage_Shipping_Model_Carrier_Abstract implements Mage_Shipping_Model_Carrier_Interface {
    protected $_code = 'meanship';

    /**
     * Collect and get rates
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Result|bool|null
     */
    public function collectRates(Mage_Shipping_Model_Rate_Request $request) {
        if (!$this->isActive()) {
            return false;
        }

        $resultArray = array();

        foreach ($this->_getApplicableRules($request) as $method_name =>  $rule_data) {
            $method = Mage::getModel('shipping/rate_result_method');

            $method->setCarrier($this->_code);
            $method->setCarrierTitle($this->getConfigData('title'));

            // record method information
            $method->setMethod($rule_data->getId());
            $method->setMethodTitle($method_name);

            if ($request->getFreeShipping()) {
                $method->setCost(0);
                $method->setPrice(0);
            } else {
                // rate cost is optional property to record how much it costs to vendor to ship
                if ($rule_data->getPerItem()) {
                    $method->setCost($rule_data->getCost() * $request->getData('package_qty'));
                    $method->setPrice($rule_data->getPrice() * $request->getData('package_qty'));
                } else {
                    $method->setCost($rule_data->getCost());
                    $method->setPrice($rule_data->getPrice());
                }
            }

            $resultArray[] = $method;
        }

        usort($resultArray, 'self::sortRates');
        $result = Mage::getModel('shipping/rate_result');
        foreach ($resultArray as $method) {
            $result->append($method);
        }
        return $result;
    }

    /**
     * Gets allowed shiping methods
     *
     * @implements Mage_Shipping_Model_Carrier_Interface
     *
     * @return array Allowed shipping methods.
     */
    public function getAllowedMethods() {
        $methods = array();

        /** @var $rule_collection Meanbee_Shippingrules_Model_Resource_Rule_Collection */
        $rule_collection = Mage::getModel('meanship/rule')->getCollection()
            ->addFieldToFilter('is_active', 1)
            ->setOrder('sort_order', Varien_Data_Collection::SORT_ORDER_ASC);

        foreach ($rule_collection as $rule) {
            $methods[$rule->getId()] = $rule->getName();
        }

        return $methods;
    }

    /**
     * Gets shipping methods whose rules validate when evalutaed against the shipping rate request.
     *
     * @param  Mage_Shipping_Model_Rate_Request $request
     * @return array                                     Array of rules that validated.
     */
    protected function _getApplicableRules(Mage_Shipping_Model_Rate_Request $request) {
        $methods = array();

        /** @var $rule_collection Meanbee_Shippingrules_Model_Resource_Rule_Collection */
        $rule_collection = Mage::getModel('meanship/rule')->getCollection()
            ->addFieldToFilter('is_active', 1)
            ->setOrder('sort_order', Varien_Data_Collection::SORT_ORDER_ASC);

        $request = $this->addCustomerDataToRequest($request);
        $request = $this->addAdminOrderDataToRequest($request);
        $request = $this->addPostcodePrefixToRequest($request); /** @deprecated Remove next major version. */
        $request = $this->addPostalCodePartsToRequest($request);
        $request = $this->addCountryGroupToRequest($request);
        $request = $this->addNumericPostcodesToRequest($request); /** @deprecated Remove next major version. */
        $request = $this->addPromoDataToRequest($request);
        $request = $this->addPaymentDataToRequest($request);
        $request = $this->addTimeDataToRequest($request);
        $request = $this->addStreetAddressToRequest($request);

        $stop_flag = array();

        foreach ($rule_collection as $rule) {
            /** @var $rule Meanbee_Shippingrules_Model_Rule */
            if (!$rule->validate($request)) {
                continue;
            }

            $rule_name = $rule->getName();

            if (array_key_exists($rule_name, $methods)) {
                if (!isset($stop_flag[$rule_name])) {
                    $stop_flag[$rule_name] = false;
                }

                /**
                 * We'll skip this rule if we've already matched at a cheaper price, or we've hit a stop flag.
                 */
                if ($methods[$rule_name]->getPrice() < $rule->getPrice() || $stop_flag[$rule_name]) {
                    continue;
                }
            }

            $methods[$rule_name] = new Varien_Object(array(
                'price' => $rule->getPrice(),
                'cost'  => $rule->getCost(),
                'id'    => $rule->getId(),
                'per_item' => (int) $rule->getPerItem()
            ));

            if ($rule->getStopRulesProcessing()) {
                $stop_flag[$rule_name] = true;
            }

            if ($rule->getStopAllRulesProcessing()) {
                break;
            }
        }

        return $methods;
    }

    /**
     * Establish whether or not the destination country is in a country group and add the country group
     * to the request if so.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addCountryGroupToRequest(Mage_Shipping_Model_Rate_Request $request) {

        $destination_country = $request->getDestCountryId();
        $destination_country_group = null;

        if (Mage::helper('meanship/compat')->isEuCountrySupported() && Mage::helper('core')->isCountryInEU($destination_country)) {
            $destination_country_group = 'eu';
        }

        if ($destination_country_group) {
            $request->setData('dest_country_group', $destination_country_group);
        }

        return $request;
    }

    /**
     * The customer doesn't come to us through $request, so we need to check for it manually.  This following will
     * work on the frontend checkout.
     *
     * @param $request Mage_Shipping_Model_Rate_Request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addCustomerDataToRequest(Mage_Shipping_Model_Rate_Request $request) {
        if (Mage::getSingleton('adminhtml/session_quote')->getCustomer()->hasData()) {
            $customer = Mage::getSingleton('adminhtml/session_quote')->getCustomer();
            $request->setCustomer($customer);
            $request->setCustomerGroupId($customer->getGroupId());
        } elseif (Mage::helper('customer')->getCustomer()->hasData()) {
            $customer = Mage::helper('customer')->getCustomer();
            $request->setCustomer($customer);
            $request->setCustomerGroupId($customer->getGroupId());
        } else {
            $request->setCustomer(null);
            $request->setCustomerGroupId(Mage_Customer_Model_Group::NOT_LOGGED_IN_ID);
        }

        return $request;
    }

    /**
     * Determine whether or not this is an order placed in the admin area.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addAdminOrderDataToRequest(Mage_Shipping_Model_Rate_Request $request) {
        if (Mage::getSingleton('adminhtml/session_quote')->hasData('quote_id')) {
            $request->setIsAdminOrder(true);
        } else {
            $request->setIsAdminOrder(false);
        }

        return $request;
    }

    /**
     * Extract the postcode prefix from the destination postcode if available.
     *
     * @deprecated Remove next major version.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addPostcodePrefixToRequest(Mage_Shipping_Model_Rate_Request $request) {
        $postcode = $request->getDestPostcode();
        $postcode_prefix = null;

        if ($postcode) {
            $postcode_prefix = Mage::helper('meanship/postcode')->extractUKPostcodePrefix($postcode);
        }

        if ($postcode_prefix) {
            $request->setData('dest_postcode_prefix', $postcode_prefix);
        }

        return $request;
    }

    /**
     * Extract the postcode parts from the destination postal code if available.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addPostalCodePartsToRequest(Mage_Shipping_Model_Rate_Request $request) {
        $postalCodeHelper = Mage::helper('meanship/postcode');
        $postalCode = $request->getDestPostcode();
        $countryCode = $request->getDestCountryId();

        $matches = array();
        $valid = $postalCodeHelper->isValidPostalCode($postalCode, $countryCode, $matches);
        if ($valid) {
            $postalCodeData = $postalCodeHelper->getPostalCodeDataByCountryCode($countryCode);
            foreach ($postalCodeData['parts'] as $part => $type) {
                if ($type !== Meanbee_Shippingrules_Helper_Postcode::CONSTANT) {
                    $request->setData("dest_postal_code_p{$part}_{$type}", $matches[$part]);
                }
            }
        } else if ($valid === null) {
            $request->setData('dest_postal_code_p0_str', $postalCodeHelper->sanitisePostcode($postalCode));
            $request->setData('dest_postal_code_p0_b36', $postalCodeHelper->sanitisePostcode($postalCode));
        }
        return $request;
    }

    /**
     * If the postcode is numeric then cast to a number and store it on the request so we can perform
     * numerical operations on it in the rule conditions.
     *
     * @deprecated Remove next major version.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addNumericPostcodesToRequest(Mage_Shipping_Model_Rate_Request $request) {

        if ($request->hasData('dest_postcode')) {
            $postcode = preg_replace('/\s*/', '', $request->getData('dest_postcode'));

            if (is_numeric($postcode)) {
                $request->setData('dest_postcode_numeric', (int) $postcode);
            }
        }

        return $request;
    }

    /**
     * Add promotion data to the request, so conditions can be
     * dependant on promotions.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addPromoDataToRequest(Mage_Shipping_Model_Rate_Request $request) {
        $requestItems = $request->getAllItems();
        if (count($requestItems) > 0) {
            $quote = $requestItems[0]->getQuote();
            if(null != $quote->getShippingAddress()) {
                $request->setData('promo_free_shipping', $quote->getShippingAddress()->getFreeShipping());
            }
            $request->setData('promo_coupon_code', $quote->getCouponCode());
            $request->setData('promo_applied_rule_ids', implode(',', $this->getAppliedCartPriceRules($requestItems)) ?: null);
        }
        return $request;
    }

    /**
     * Gets an array of ids of all cart price rules that have been applied to
     * the cart or any product in the cart, without duplicates, regardless of
     * whether or not the billing and delivery addresses differ.
     * @param  Array $requestItems Array of items from the
     *                             Mage_Shipping_Model_Rate_Request object.
     * @return string[]
     */
    protected function getAppliedCartPriceRules($requestItems) {
        if (count($requestItems) <= 0) {
            return array();
        }
        $quote = $requestItems[0]->getQuote();
        $quoteLevelPriceRules = explode(',', $quote->getAppliedRuleIds()) ?: array();
        $productLevelPriceRules = array_reduce($requestItems, function ($accumulator, $product) {
            return array_merge($accumulator, explode(',', $product->getAppliedRuleIds()));
        }, array());
        $allPriceRules = array_merge($quoteLevelPriceRules, $productLevelPriceRules);
        return array_filter(array_unique($allPriceRules));
    }

    /**
     * Add payment data to the request.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addPaymentDataToRequest(Mage_Shipping_Model_Rate_Request $request) {
        $requestItems = $request->getAllItems();
        if (count($requestItems) > 0) {
            $quote = $requestItems[0]->getQuote();
            $quote->setData('payment_method', $quote->getPayment()->getMethod());
        }
        return $request;
    }

    /**
     * Add temporal information to the request, so conditions can be
     * dependant on the time the request was made.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addTimeDataToRequest(Mage_Shipping_Model_Rate_Request $request) {
        $request->setData('time_timestamp', time());
        $request->setData('time_time_of_day', Mage::helper('meanship/time')->getLocalTimeOfDay());
        $request->setData('time_day_of_week', Mage::helper('meanship/time')->getLocalDayOfWeek());
        return $request;
    }

    /**
     * Add street address information to the request.
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     *
     * @return Mage_Shipping_Model_Rate_Request
     */
    public function addStreetAddressToRequest(Mage_Shipping_Model_Rate_Request $request) {
        $requestItems = $request->getAllItems();
        if (count($requestItems) > 0) {
            $quote = $requestItems[0]->getQuote();
            if(null != $quote->getShippingAddress()) {
                $street = $quote->getShippingAddress()->getData('street');
                $street = explode("\n", $street, 2);
                $request->setData('dest_street_address_l1', isset($street[0]) ? $street[0] : null);
                $request->setData('dest_street_address_l2', isset($street[1]) ? $street[1] : null);
            }
        }
        return $request;
    }

    /**
     * Sorts rates by Display Sort Order
     */
     protected static function sortRates($a, $b) {
         if ($a->getDisplaySortOrder()==$b->getDisplaySortOrder()) {
             return 0;
         }
         return ($a->getDisplaySortOrder() < $b->getDisplaySortOrder()) ? -1 : 1;
     }
}
