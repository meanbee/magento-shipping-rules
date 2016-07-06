'use strict';
(function (ShippingRules) {
    ShippingRules.Field.Boolean = class extends ShippingRules.Field
    {
        constructor(condition, value) {
            super(condition, value);
        }
        render() {
            let me = this;
            return (<select id={`${me.idPrefix}-value`} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                ShippingRules.history.pushState();
            }}>
                {[{value: 1, label: 'TRUE'}, {value: 0, label: 'FALSE'}].map((optionDesc) => {
                    let option = <option value={optionDesc.value}>{optionDesc.label}</option>
                    if (optionDesc.value === me.value) option.selected = true;
                    return option;
                })}
            </select>);
        }
    }

    ShippingRules.Register.field.add('Boolean', ShippingRules.Field.Boolean);
})(Meanbee.ShippingRules);