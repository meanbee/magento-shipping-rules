'use strict';
(function (ShippingRules) {
    ShippingRules.Field.NumberX2 = class extends ShippingRules.Field
    {
        render() {
            let me = this;
            return (<span id={`${me.idPrefix}-value`}>
                <input type="number" id={`${me.idPrefix}-value-0`} value={me.value[0] || ''} onChange={me.valueChangeHandler.bind(me)} />
                and
                <input type="number" id={`${me.idPrefix}-value-1`} value={me.value[1] || ''} onChange={me.valueChangeHandler.bind(me)} />
            </span>);
        }

        valueChangeHandler(event) {
            this.value = [document.getElementById(`${this.idPrefix}-value-0`).value, document.getElementById(`${this.idPrefix}-value-1`).value]
            this.condition.valueChangeHandler(this.value);
        }
    }

    ShippingRules.Register.field.add('NumberX2', ShippingRules.Field.NumberX2);
})(Meanbee.ShippingRules);