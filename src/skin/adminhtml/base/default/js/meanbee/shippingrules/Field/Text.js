import Field from '../Field';

export default class Text extends Field
{
    render() {
        let me = this;
        return (<input type="text" id={`${me.idPrefix}-value`} value={me.value} onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
            me.valueChangeHandler(event);
            Meanbee.ShippingRules.history.pushState();
        }} />);
    }
}