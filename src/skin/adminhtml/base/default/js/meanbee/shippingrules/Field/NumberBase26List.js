import Field from '../Field';

export default class NumberBase26List extends Field
{
    render() {
        let me = this;
        return (<input type="text" id={`${me.idPrefix}-value`} pattern="[A-Z, ]" value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
            me.valueChangeHandler(event);
            Meanbee.ShippingRules.history.pushState();
        }} />);
    }

    valueChangeHandler(event) {
        event.target.value = event.target.value.toUpperCase();
        super.valueChangeHandler(event);
    }
}