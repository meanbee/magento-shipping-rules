import Field from '../Field';

export default class NumberList extends Field
{
    render() {
        let me = this;
        return (<input type="text" id={`${me.idPrefix}-value`} pattern="[0-9, ]" value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
            me.valueChangeHandler(event);
            Meanbee.ShippingRules.history.pushState();
        }} />);
    }

    valueChangeHandler(event) {
        event.target.value = event.target.value.toUpperCase();
        super.valueChangeHandler(event);
    }
}