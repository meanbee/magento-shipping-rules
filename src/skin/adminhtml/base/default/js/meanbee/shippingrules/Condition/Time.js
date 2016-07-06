'use strict';
(function (ShippingRules) {
    ShippingRules.Condition.Time = class extends ShippingRules.Condition
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

    ShippingRules.Register.condition.add('Time', ShippingRules.Condition.Time);
})(Meanbee.ShippingRules);