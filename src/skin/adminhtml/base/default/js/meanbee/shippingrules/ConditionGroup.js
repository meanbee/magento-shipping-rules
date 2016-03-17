'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.ConditionGroup = function (calculator, group, prefix = '', id = 0) {
        if (calculator instanceof global.Meanbee.ShippingRules.Calculator) {
            this.calculator = calculator;
        } else {
            this.container = calculator;
        }
        this.group = group;
        this.id = id;
        this.prefix = prefix;
        this.conditions = [];
        this.aggregator = null;
        this.value = null;
        this.focusedElement = null;
        this.addCondition = function () {
            this.conditions.push(new global.Meanbee.ShippingRules.Condition(this.calculator, this, `${this.prefix}-c${this.id}`, this.conditions.length));
        };
        this.removeCondition = function (id) {
            this.conditions.splice(id, 1);
            this.conditions.forEach((c, i) => c.id = i);
            this.calculator.focusedElement = (id < this.conditions.length && `${this.prefix}-c${this.id}-c${id}`)                    ||
                                             (this.conditions.length && `${this.prefix}-c${this.id}-c${this.conditions.length - 1}`) ||
                                             `${this.prefix}-c${this.id}`;
        };
        this.replaceCondition = function (id, condition) {
            this.conditions[id] = condition;
        };
        this.render = function () {
            var me = this;
            return (<li id={`${me.prefix}-c${me.id}`} tabIndex="0" onKeyUp={event => {
                switch (event.which || event.keyCode) {
                case 187: // = (+)
                    event.stopPropagation();
                    me.addCondition();
                    me.calculator.render();
                    break;
                case 189: // -
                    event.stopPropagation();
                    me.group.removeCondition(me.id);
                    me.calculator.render();
                    break;
                default:
                    // NO-OP
                }
            }}>
                If
                <select id={`${me.prefix}-c${me.id}-aggregator`} value={me.aggregator} onChange={event => me.aggregator = event.target.value}>
                    {global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getAggregators(), me.aggregator)}
                </select>
                of these conditions are
                <select id={`${me.prefix}-c${me.id}-value`} value={me.value} onChange={event => me.value = event.target.value}>
                    {global.Meanbee.ShippingRules.util.toOptions([{label: 'false', value: '0'}, {label: 'true', value: '1'}], me.value)}
                </select>:
                {global.Meanbee.ShippingRules.util.removeButton(me, () => {
                    me.calculator.group.removeCondition(me.calculator.id);
                    me.calculator.render();
                })}
                <ul>
                    {me.conditions.map(c => c.render())}
                    <li>{global.Meanbee.ShippingRules.util.addButton(me, () => {
                        me.calculator.focusedElement = `${me.prefix}-t${me.id}-c${me.conditions.length}`;
                        me.addCondition();
                        me.calculator.render();
                    })}</li>
                </ul>
            </li>);
        };
        this.toJSON = function () {
            return {
                '@type'   : 'Aggregator',
                id        : this.id,
                aggregator: this.aggregator,
                value     : this.value,
                children  : this.conditions
            };
        };
    };

})(window);
