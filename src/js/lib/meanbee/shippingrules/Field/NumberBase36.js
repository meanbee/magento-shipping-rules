import Field from '../Field';

export default class NumberBase36 extends Field
{
    render() {
        let me = this;
        return (<input type="text" id={`${me.idPrefix}-value`} pattern="[0-9A-Z]" value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
            me.valueChangeHandler(event);
            Meanbee.ShippingRules.history.pushState();
        }} />);
    }

    valueChangeHandler(event) {
        event.target.value = event.target.value.toUpperCase();
        super.valueChangeHandler(event);
    }
}