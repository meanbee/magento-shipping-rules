import Field from '../Field';

export default class Select extends Field
{
    constructor(condition, value) {
        super(condition, value);
        let conditionDescriptor = condition.toJSON();
        this.dataKey = `${conditionDescriptor.register.toLowerCase()}/${conditionDescriptor.key.toLowerCase()}/options/${condition.variable}`;
        Meanbee.ShippingRules.util.loadData(this.dataKey);
    }
    render() {
        let me = this;
        return (<select id={`${me.idPrefix}-value`} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
            me.valueChangeHandler(event);
            Meanbee.ShippingRules.history.pushState();
        }}>
            {Meanbee.ShippingRules.data[me.dataKey] ? Meanbee.ShippingRules.data[me.dataKey].map((optionDesc) => {
                let option = <option value={optionDesc.value}>{optionDesc.label}</option>
                if (optionDesc.value === me.value) option.selected = true;
                return option;
            }) : []}
        </select>);
    }
}