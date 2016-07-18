import Field from '../Field';

export default class NumberBase26X2 extends Field
{
    render() {
        let me = this;
        return (<span id={`${me.idPrefix}-value`}>
            <input type="text" id={`${me.idPrefix}-value-0`} pattern="[A-Z]" value={me.value[0] || ''} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                Meanbee.ShippingRules.history.pushState();
            }} />
            and
            <input type="text" id={`${me.idPrefix}-value-1`} pattern="[A-Z]" value={me.value[1] || ''} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                Meanbee.ShippingRules.history.pushState();
            }} />
        </span>);
    }

    valueChangeHandler(event) {
        event.target.value = event.target.value.toUpperCase();
        this.value = [document.getElementById(`${this.idPrefix}-value-0`).value, document.getElementById(`${this.idPrefix}-value-1`).value]
        this.condition.valueChangeHandler(this.value);
    }
}
