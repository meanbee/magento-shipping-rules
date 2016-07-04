'use strict';
(function (ShippingRules) {
    ShippingRules.Field.Number = class extends ShippingRules.Field
    {
        render() {
            let me = this;
            return (<input type="number" id={`${me.idPrefix}-value`} value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                ShippingRules.history.pushState();
            }} />);
        }
    }

    ShippingRules.Register.field.add('Number', ShippingRules.Field.Number);
})(Meanbee.ShippingRules);