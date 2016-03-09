'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.Term = function (calculator, prefix = '', id = 0, constant = false) {
        this.calculator = calculator;
        this.id = id;
        this.prefix = prefix;
        this.value = constant ? 0 : true;
        this.attribute = null;
        this.aggregator = global.Meanbee.ShippingRules.ajax.getAggregators()[0].value;
        this.multiplier = 1;
        this.conditions = [];
        this.addCondition = function () {
            this.conditions.push(new global.Meanbee.ShippingRules.Condition(this.calculator, this, `${this.prefix}-t${this.id}`, this.conditions.length));
        };
        this.removeCondition = function (id) {
            this.conditions.splice(id, 1);
            this.conditions.forEach((c, i) => c.id = i);
            this.calculator.focusedElement = (id < this.conditions.length && `${this.prefix}-t${this.id}-c${id}`)                    ||
                                             (this.conditions.length && `${this.prefix}-t${this.id}-c${this.conditions.length - 1}`) ||
                                             `${this.prefix}-t${this.id}`;
        };
        this.replaceCondition = function (id, condition) {
            this.conditions[id] = condition;
        };
        this.render = function () {
            var me = this;
            return (<li id={`${me.prefix}-t${me.id}`} tabIndex="0" onKeyUp={event => {
                switch (event.which || event.keyCode) {
                case 187: // = (+)
                    event.stopPropagation();
                    me.calculator.focusedElement = `${me.prefix}-t${me.id}-c${me.conditions.length}`;
                    me.addCondition();
                    me.calculator.render();
                    break;
                case 189: // -
                    event.stopPropagation();
                    me.calculator.removeTerm(me.id);
                    me.calculator.render();
                    break;
                default:
                    // NO-OP
                }
            }}>
                {(function () {
                    if (constant) {
                        return (<span>
                            Base Price of
                            <input id={`${me.prefix}-t${me.id}-value`} type="number" value={me.value} onKeyUp={event => me.value = event.target.value} />
                        </span>);
                    } else {
                        return (<span>
                            +
                            <select id={`${me.prefix}-t${me.id}-attribute`} value={me.attribute} onChange={event => me.attribute = event.target.attribute}>
                                {global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getTermFields())}
                            </select>
                            ×
                            <input id={`${me.prefix}-t${me.id}-multiplier`} type="number" value={me.multiplier} onKeyUp={event => me.multiplier = event.target.value} />
                            if
                            <select id={`${me.prefix}-t${me.id}-aggregator`} value={me.aggreator} onChange={event => me.aggregator = event.target.value}>
                                {global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getAggregators())}
                            </select>
                            of these conditions are
                            <select id={`${me.prefix}-t${me.id}-value`} value={me.value} onChange={event => me.value= event.target.value}>
                                {global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getBoolean())}
                            </select>:
                            <button id={`${me.prefix}-t${me.id}-remove`} type="button" class="remove" onClick={() => {
                                me.calculator.removeTerm(me.id);
                                me.calculator.render();
                            }}>-</button>
                            <ul>
                                {me.conditions.map(c => c.render())}
                                <li><button id={`${me.prefix}-t${me.id}-add`} type="button" class="add" onClick={() => {
                                    me.calculator.focusedElement = `${me.prefix}-t${me.id}-c${me.conditions.length}`;
                                    me.addCondition();
                                    me.calculator.render();
                                }}>+</button></li>
                            </ul>
                        </span>);
                    }
                })()}
            </li>);
        };
        this.toJSON = function () {
            return {
                '@type'   : 'Term',
                term      : constant ? 'Constant' : 'ConditionalMultiple',
                attribute : this.attribute,
                multiplier: this.multiplier,
                value     : this.value,
                aggregator: {
                    '@type'   : 'Aggregator',
                    aggregator: this.aggregator,
                    value     : this.value,
                    children : this.conditions
                }
            };
        };
    };
})(window);
