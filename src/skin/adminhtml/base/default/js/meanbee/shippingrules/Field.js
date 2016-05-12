'use strict';
(function (ShippingRules) {
    ShippingRules.Field = class
    {
        constructor(condition, value) {
            this.condition = condition;
            this.idPrefix = condition ? condition.id : null;
            this.value = value;
        }

        valueChangeHandler(event) {
            this.condition.valueChangeHandler(event.target.value);
        }
    }
})(Meanbee.ShippingRules);