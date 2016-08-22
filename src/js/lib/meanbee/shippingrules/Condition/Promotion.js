import Condition from '../Condition';

export default class Promotion extends Condition
{
    constructor(index, parent, variable) {
        super(index, parent, variable);
    }

    static getCategory(context) { // eslint-disable-line no-unused-vars
        return 'Promotion Conditions';
    }

    static getVariables(context) {
        let variables = {};
        if (!context) {
            variables['promo_free_shipping'] = { label: 'Free Shipping', type: ['boolean'] };
            variables['promo_coupon_code'] = { label: 'Coupon', type: ['enum'] };
            variables['promo_applied_rule_ids'] = { label: 'Applied Cart Price Rules', type: ['enum'] };
        }
        return variables;
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Promotion';
        return obj;
    }
}