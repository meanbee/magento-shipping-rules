import Condition from '../Condition';

export default class Time extends Condition
{
    constructor(index, parent, variable) {
        super(index, parent, variable);
    }

    static getCategory(context) { // eslint-disable-line no-unused-vars
        return 'Time Conditions';
    }

    static getVariables(context) {
        let variables = {};
        if (!context) {
            variables['time_time_of_day'] = { label: 'Time of Day', type: ['time'] };
            variables['time_day_of_week'] = { label: 'Day of Week', type: ['enum'] };
        }
        return variables;
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Time';
        return obj;
    }
}