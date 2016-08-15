import Field from '../Field';
import util from '../util';

export default class Multiselect extends Field
{
    constructor(condition, value) {
        super(condition, value);
        let conditionDescriptor = condition.toJSON();
        this.dataKey = `${conditionDescriptor.register.toLowerCase()}/${conditionDescriptor.key.toLowerCase()}/options/${condition.variable}`;
        util.loadData(this.dataKey);
    }
    render() {
        let me = this;
        return (<span id={`${me.idPrefix}-value-container`}>
            <select id={`${me.idPrefix}-value`} multiple="multiple" size="5" onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                Meanbee.ShippingRules.history.pushState();
            }}>
                {Meanbee.ShippingRules.data[me.dataKey] ? Meanbee.ShippingRules.data[me.dataKey].map((optionDesc) => {
                    let option = <option value={optionDesc.value}>{me.decorator ? me.decorator(optionDesc.value, optionDesc.label) : optionDesc.label}</option>
                    if (me.value.indexOf(optionDesc.value)) option.selected = true;
                    return option;
                }) : []}
            </select>
            <output id={`${me.idPrefix}-value-output`} onClick={() => document.getElementById(`${me.idPrefix}-value`).focus()}>{(function () {
                return (Meanbee.ShippingRules.data[me.dataKey] ? Meanbee.ShippingRules.data[me.dataKey].filter(optionDesc => ~me.value.indexOf(optionDesc.value)).map(optionDesc => me.decorator ? me.decorator(optionDesc.value, optionDesc.label) : optionDesc.label).join(', ') : '') || '[SELECT]';
            })()}</output>
        </span>);
    }

    valueChangeHandler() {
        this.value = Array.from(document.getElementById(`${this.idPrefix}-value`).selectedOptions).map(option => option.value);
        this.condition.valueChangeHandler(this.value);
        document.getElementById(`${this.idPrefix}-value-output`).innerHTML = (Meanbee.ShippingRules.data[this.dataKey] ? Meanbee.ShippingRules.data[this.dataKey].filter(optionDesc => ~this.value.indexOf(optionDesc.value)).map(optionDesc => this.decorator ? this.decorator(optionDesc.value, optionDesc.label) : optionDesc.label).join(', ') : '') || '[SELECT]';
    }
}