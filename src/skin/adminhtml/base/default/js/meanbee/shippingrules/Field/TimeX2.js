'use strict';
(function (ShippingRules) {
    ShippingRules.Field.TimeX2 = class extends ShippingRules.Field
    {
        render() {
            let me = this;
            return (<span id={`${me.idPrefix}-value`}>
                <input type="time" id={`${me.idPrefix}-value-0`} value={me.value[0] || ''} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                    me.valueChangeHandler(event);
                    ShippingRules.history.pushState();
                }} />
                and
                <input type="time" id={`${me.idPrefix}-value-1`} value={me.value[1] || ''} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                    me.valueChangeHandler(event);
                    ShippingRules.history.pushState();
                }} />
            </span>);
        }

        valueChangeHandler() {
            this.value = [document.getElementById(`${this.idPrefix}-value-0`).value, document.getElementById(`${this.idPrefix}-value-1`).value]
            this.condition.valueChangeHandler(this.value);
        }
    }

    ShippingRules.Register.field.add('TimeX2', ShippingRules.Field.TimeX2);
})(Meanbee.ShippingRules);