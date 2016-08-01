import Condition from '../Condition';
import util from '../util';

export default class Destination extends Condition
{
    constructor(index, parent, variable) {
        super(index, parent, variable);
        if (this.valueField) {
            this.valueField.decorator = this.variable === 'dest_country_id' ? this.fieldDecorator.bind(this) : null;
        }
    }

    static getCategory(context) { // eslint-disable-line no-unused-vars
        return 'Destination Conditions';
    }

    static getVariables(context) {
        let variables = {};
        if (!context) {
            variables['dest_street_address_l1'] = { label: 'Shipping Street Address, Line 1', type: ['string'] };
            variables['dest_street_address_l2'] = { label: 'Shipping Street Address, Line 2', type: ['string'] };
            variables['dest_country_id'] = { label: 'Shipping Country', type: ['enum'] };
            variables['dest_country_group'] = { label: 'Shipping Country Group', type: ['enum'] };
            variables['dest_region_id'] = { label: 'Shipping State', type: ['enum'] };
        }
        return variables;
    }

    refresh () {
        super.refresh();
        if (this.valueField) {
            this.valueField.decorator = this.variable === 'dest_country_id' ? this.fieldDecorator.bind(this) : null;
        }
    }

    fieldDecorator (value, label) {
        let flag = this.toRegionalIndicatorSymbols(value);
        if (util.textWidth(flag) < 2 * util.textWidth('🇦')) {
            return flag + ' ' + label;
        } else {
            return label;
        }
    }

    toRegionalIndicatorSymbols (plaintext) {
        let regionalIndicatorSymbols = '',
            strlen = plaintext.length;
        for (let i = 0; i < strlen; i++) { // For each character in string
            let codepoint = plaintext.codePointAt(i);
            if (codepoint >= ('A').codePointAt(0) && codepoint <= ('Z').codePointAt(0)) { // If character in range A-Z
                regionalIndicatorSymbols += String.fromCodePoint(127462 + codepoint - ('A').codePointAt(0)); // Create character for respective Regional Indicator Symbol
            } else { // Else
                regionalIndicatorSymbols += plaintext.charAt(i); // Use original character
            }
        }
        return regionalIndicatorSymbols;
    }

    init (obj) {
        super.init(obj);
        if (this.valueField) {
            this.valueField.decorator = this.variable === 'dest_country_id' ? this.fieldDecorator.bind(this) : null;
        }
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Destination';
        return obj;
    }
}