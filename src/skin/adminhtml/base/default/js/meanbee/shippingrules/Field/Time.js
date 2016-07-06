'use strict';
(function (ShippingRules) {
    ShippingRules.Field.Time = class extends ShippingRules.Field
    {
        render() {
            let me = this;
            return (<input type="time" id={`${me.idPrefix}-value`} value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                ShippingRules.history.pushState();
            }} />);
        }
    }

    ShippingRules.Register.field.add('Time', ShippingRules.Field.Time);
})(Meanbee.ShippingRules);