'use strict';
(function (ShippingRules) {
    ShippingRules.Field.Text = class extends ShippingRules.Field
    {
        render() {
            let me = this;
            return (<input type="text" id={`${me.idPrefix}-value`} value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                ShippingRules.history.pushState();
            }} />);
        }
    }

    ShippingRules.Register.field.add('Text', ShippingRules.Field.Text);
})(Meanbee.ShippingRules);