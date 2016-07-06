'use strict';
(function (ShippingRules) {
    ShippingRules.Field.Select = class extends ShippingRules.Field
    {
        constructor(condition, value) {
            super(condition, value);
            let conditionDescriptor = condition.toJSON();
            this.dataKey = `${conditionDescriptor.register.toLowerCase()}/${conditionDescriptor.key.toLowerCase()}/options/${condition.variable}`;
            ShippingRules.util.loadData(this.dataKey);
        }
        render() {
            let me = this;
            return (<select id={`${me.idPrefix}-value`} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                ShippingRules.history.pushState();
            }}>
                {ShippingRules.data[me.dataKey] ? ShippingRules.data[me.dataKey].map((optionDesc) => {
                    let option = <option value={optionDesc.value}>{optionDesc.label}</option>
                    if (optionDesc.value === me.value) option.selected = true;
                    return option;
                }) : []}
            </select>);
        }
    }

    ShippingRules.Register.field.add('Select', ShippingRules.Field.Select);
})(Meanbee.ShippingRules);