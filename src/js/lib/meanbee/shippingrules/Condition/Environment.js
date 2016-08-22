import Condition from '../Condition';

export default class Environment extends Condition
{
    constructor(index, parent, variable) {
        super(index, parent, variable);
    }

    static getCategory(context) { // eslint-disable-line no-unused-vars
        return 'Environment Conditions';
    }

    static getVariables(context) {
        let variables = {};
        if (!context) {
            variables['store_id'] = { label: 'Magento Store', type: ['enum'] };
            variables['website_id'] = { label: 'Magento Website', type: ['enum'] };
            variables['is_admin_order'] = { label: 'Is an admin order?', type: ['boolean'] };
        }
        return variables;
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Environment';
        return obj;
    }
}