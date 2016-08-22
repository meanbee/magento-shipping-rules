import Field from '../Field';

export default class TimeX2 extends Field
{
    render() {
        let me = this;
        return (<span id={`${me.idPrefix}-value`}>
            <input type="time" id={`${me.idPrefix}-value-0`} value={me.value[0] || ''} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                Meanbee.ShippingRules.history.pushState();
            }} />
            and
            <input type="time" id={`${me.idPrefix}-value-1`} value={me.value[1] || ''} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                Meanbee.ShippingRules.history.pushState();
            }} />
        </span>);
    }

    valueChangeHandler() {
        this.value = [document.getElementById(`${this.idPrefix}-value-0`).value, document.getElementById(`${this.idPrefix}-value-1`).value]
        this.condition.valueChangeHandler(this.value);
    }
}