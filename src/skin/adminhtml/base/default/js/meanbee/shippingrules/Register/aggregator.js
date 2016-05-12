'use strict';
(function (ShippingRules) {

    ShippingRules.Register.aggregator = new ShippingRules.Register;
    ShippingRules.Register.aggregator.add = function (key, child) {
        if (!this.has(key) && (new child) instanceof ShippingRules.Aggregator) {
            this.children[key] = child;
        }
        return this;
    };

})(Meanbee.ShippingRules);