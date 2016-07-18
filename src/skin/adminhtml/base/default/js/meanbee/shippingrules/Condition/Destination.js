import Condition from '../Condition';

export default class Destination extends Condition
{
    constructor(index, parent, variable) {
        super(index, parent, variable);
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

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Destination';
        return obj;
    }
}