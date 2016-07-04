'use strict';
(function (ShippingRules) {
    ShippingRules.Field.NumberBase36X2 = class extends ShippingRules.Field
    {
        render() {
            let me = this;
            return (<span id={`${me.idPrefix}-value`}>
                <input type="text" id={`${me.idPrefix}-value-0`} pattern="[0-9A-Z]" value={me.value[0] || ''} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                    me.valueChangeHandler(event);
                    ShippingRules.history.pushState();
                }} />
                and
                <input type="text" id={`${me.idPrefix}-value-1`} pattern="[0-9A-Z]" value={me.value[1] || ''} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                    me.valueChangeHandler(event);
                    ShippingRules.history.pushState();
                }} />
            </span>);
        }

        valueChangeHandler(event) {
            event.target.value = event.target.value.toUpperCase();
            this.value = [document.getElementById(`${this.idPrefix}-value-0`).value, document.getElementById(`${this.idPrefix}-value-1`).value]
            this.condition.valueChangeHandler(this.value);
        }
    }

    ShippingRules.Register.field.add('NumberBase36X2', ShippingRules.Field.NumberBase36X2);
})(Meanbee.ShippingRules);