'use strict';
(function (ShippingRules) {
    ShippingRules.Condition.Customer = class extends ShippingRules.Condition
    {
        constructor(index, parent, variable) {
            super(index, parent, variable);
        }

        static getCategory(context) { // eslint-disable-line no-unused-vars
            return 'Customer Conditions';
        }

        static getVariables(context) {
            let variables = {};
            if (!context) {
                variables['customer_group'] = { label: 'Customer Group', type: ['number'] };
            }
            return variables;
        }
    }

    ShippingRules.Register.condition.add('Customer', ShippingRules.Condition.Customer);
})(Meanbee.ShippingRules);