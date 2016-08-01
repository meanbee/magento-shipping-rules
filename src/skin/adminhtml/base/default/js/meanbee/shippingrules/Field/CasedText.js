import Field from '../Field';

export default class CasedText extends Field
{
    render() {
        let me = this;
        let caseSensitiveField = (<input type="checkbox" id={`${me.idPrefix}-value-caseSensitive`} onChange={(event) => {
            me.valueChangeHandler(event);
            Meanbee.ShippingRules.history.pushState();
        }} />);
        caseSensitiveField.checked = this.value.caseSensitive || false;
        return (<span id={`${me.idPrefix}-value`}>
            <input type="text" id={`${me.idPrefix}-value-text`} value={me.value.text || ''} placeholder="RegEx" onKeyUp={me.valueChangeHandler.bind(me)} onChange={(event) => {
                me.valueChangeHandler(event);
                Meanbee.ShippingRules.history.pushState();
            }} />
            {caseSensitiveField} <label for={`${me.idPrefix}-value-caseSensitive`}>Case Sensitive</label>
        </span>);
    }

    valueChangeHandler() {
        this.value = {
            text: document.getElementById(`${this.idPrefix}-value-text`).value,
            caseSensitive: document.getElementById(`${this.idPrefix}-value-caseSensitive`).checked
        };
        this.condition.valueChangeHandler(this.value);
    }
}