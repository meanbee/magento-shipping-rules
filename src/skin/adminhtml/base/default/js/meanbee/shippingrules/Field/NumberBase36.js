'use strict';
(function (ShippingRules) {
    ShippingRules.Field.NumberBase36 = class extends ShippingRules.Field
    {
        render() {
            let me = this;
            return (<input type="text" id={`${me.idPrefix}-value`} pattern="[0-9A-Z]" value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                ShippingRules.history.pushState();
            }} />);
        }

        valueChangeHandler(event) {
            event.target.value = event.target.value.toUpperCase();
            super.valueChangeHandler(event);
        }
    }

    ShippingRules.Register.field.add('NumberBase36', ShippingRules.Field.NumberBase36);
})(Meanbee.ShippingRules);