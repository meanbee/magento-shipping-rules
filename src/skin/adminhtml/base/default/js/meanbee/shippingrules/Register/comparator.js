'use strict';
(function (ShippingRules) {

    ShippingRules.Register.comparator = new ShippingRules.Register;
    ShippingRules.Register.comparator.add = function (key, child) {
        if (!this.has(key) && (new child) instanceof ShippingRules.Comparator) {
            this.children[key] = child;
        }
        return this;
    };
    ShippingRules.Register.comparator.getByType = function (type) {
        return Object.keys(this.children).reduce((accumulator, key) => {
            if (this.children[key].canHandleType(type)) {
                accumulator[key] = this.children[key];
            }
            return accumulator;
        }, {});
    };
    ShippingRules.Register.comparator.getAsOptions = function (type, selectedName) {
        let options = type ? this.getByType(type) : this.children;
        return Object.keys(options).map(key => (<option value={key} selected={options[key].name(type) === selectedName}>{options[key].name(type)}</option>));
    };

})(Meanbee.ShippingRules);