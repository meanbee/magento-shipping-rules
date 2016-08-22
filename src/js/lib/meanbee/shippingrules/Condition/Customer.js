import Condition from '../Condition';

export default class Customer extends Condition
{
    constructor(index, parent, variable) {
        super(index, parent, variable);
    }

    static getCategory(context) { // eslint-disable-line no-unused-vars
        return 'Customer Conditions';
    }

    static getVariables(context) {
        let variables = {};
        if (!context) {
            variables['customer_group'] = { label: 'Customer Group', type: ['enum'] };
        }
        return variables;
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Customer';
        return obj;
    }
}