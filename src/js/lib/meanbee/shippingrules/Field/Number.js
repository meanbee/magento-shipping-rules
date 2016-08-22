import Field from '../Field';

export default class Number extends Field
{
    render() {
        let me = this;
        return (<input type="number" id={`${me.idPrefix}-value`} value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
            me.valueChangeHandler(event);
            Meanbee.ShippingRules.history.pushState();
        }} />);
    }
}