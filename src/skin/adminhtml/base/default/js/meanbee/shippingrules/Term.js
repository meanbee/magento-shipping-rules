'use strict';
(function (ShippingRules) {
    ShippingRules.Term = class extends ShippingRules.Base
    {
        constructor(index, parent) {
            super(index, parent)
            this._value = 0;
        }

        set value(param) {
            if (!isNaN(parseInt(param, 10))) {
                this._value = parseInt(param, 10);
            }
            return this;
        }

        get value() {
            return this._value;
        }

        toJSON() {
            return {
                register: 'Term',
                value:    this.value
            };
        }
    }
})(Meanbee.ShippingRules);