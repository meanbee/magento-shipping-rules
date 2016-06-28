'use strict';
(function (ShippingRules) {

    ShippingRules.Register.field = new ShippingRules.Register;
    ShippingRules.Register.field.add = function (key, child) {
        if (!this.has(key) && child.prototype instanceof ShippingRules.Field) {
            this.children[key] = child;
        }
        return this;
    };

})(Meanbee.ShippingRules);