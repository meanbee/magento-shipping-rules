'use strict';
(function (ShippingRules) {
    ShippingRules.Condition.Cart = class extends ShippingRules.Condition
    {
        constructor(index, parent, variable) {
            super(index, parent, variable);
        }

        static getCategory(context) { // eslint-disable-line no-unused-vars
            return 'Cart Conditions';
        }

        static getVariables(context) {
            let variables = {};
            if (!context) {
                variables['package_weight'] = { label: 'Total Weight', type: ['number'] };
                variables['package_quantity'] = { label: 'Total Items Quantity', type: ['number'] };
                variables['package_value'] = { label: 'Subtotal excl. Tax', type: ['currency'] };
                variables['base_subtotal_incl_tax'] = { label: 'Subtotal incl. Tax', type: ['currency'] };
                variables['package_value_with_discount'] = { label: 'Subtotal after Discount', type: ['currency'] };
            }
            return variables;
        }

        toJSON() {
            let obj = super.toJSON();
            obj.key = 'Cart';
            return obj;
        }
    }

    ShippingRules.Register.condition.add('Cart', ShippingRules.Condition.Cart);
})(Meanbee.ShippingRules);