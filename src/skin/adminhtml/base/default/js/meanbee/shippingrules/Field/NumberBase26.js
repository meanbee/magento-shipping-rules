'use strict';
(function (ShippingRules) {
    ShippingRules.Field.NumberBase26 = class extends ShippingRules.Field
    {
        render() {
            let me = this;
            return (<input type="text" id={`${me.idPrefix}-value`} pattern="[A-Z]" value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                ShippingRules.history.pushState();
            }} />);
        }

        valueChangeHandler(event) {
            event.target.value = event.target.value.toUpperCase();
            super.valueChangeHandler(event);
        }
    }

    ShippingRules.Register.field.add('NumberBase26', ShippingRules.Field.NumberBase26);
})(Meanbee.ShippingRules);