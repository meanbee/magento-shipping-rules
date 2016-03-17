'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.Subselection = function (calculator, group, prefix = '', id = 0) {
        this.calculator = calculator;
        this.group = group;
        this.id = id;
        this.prefix = prefix;
        this.conditions = [];
        this.aggregateAttribute = global.Meanbee.ShippingRules.ajax.getAggregateAttributes()[0].value;
        this.comparator = global.Meanbee.ShippingRules.ajax.getComparators(this.aggregateAttribute)[0].value;
        this.attributeValue = null;
        this.aggregator = null;
        this.value = null;
        this.addCondition = function () {
            this.conditions.push(new global.Meanbee.ShippingRules.SubselectionCondition(this.calculator, this, `${this.prefix}-c${this.id}`, this.conditions.length));
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
                    me.calculator.focusedElement = `${me.prefix}-c${me.id}-c${me.conditions.length}`;
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
                <select id={`${me.prefix}-c${me.id}-aggregateAttribute`} value={me.aggregateAttribute} onChange={event => me.aggregateAttribute = event.target.value}>
                    {global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getAggregateAttributes(), me.aggregateAttribute)}
                </select>
                <select id={`${me.prefix}-c${me.id}-comparator`} value={me.comparator} onChange={event => me.comparator = event.target.value}>
                    {global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getComparators(me.attribute), me.comparator)}
                </select>
                {(function () {
                    var attributeValueField = global.Meanbee.ShippingRules.util.constructInputField(me.attribute, me.comparator, `${me.prefix}-c${me.id}`);
                    attributeValueField.addEventListener('keyup', event => me.value = event.target.value);
                    attributeValueField.id = `${me.prefix}-c${me.id}-attributeValue`;
                    attributeValueField.value = me.value;
                })()}
                for a subselection of items in cart where
                <select id={`${me.prefix}-c${me.id}-aggregator`} value={me.aggregator} onChange={event => me.aggregator = event.target.value}>
                    {global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getAggregators(), me.aggregator)}
                </select>
                of these conditions are
                <select id={`${me.prefix}-c${me.id}-value`} value={me.value} onChange={event => me.value = event.target.value}>
                    {global.Meanbee.ShippingRules.util.toOptions([{label: 'false', value: '0'}, {label: 'true', value: '1'}], me.value)}
                </select>:
                {global.Meanbee.ShippingRules.util.removeButton(me, () => {
                    me.group.removeCondition(me.id);
                    me.calculator.render();
                })}
                <ul>
                    {me.conditions.map(c => c.render())}
                    <li>{global.Meanbee.ShippingRules.util.addButton(me, () => {
                        me.calculator.focusedElement = `${me.prefix}-c${me.id}-c${me.conditions.length}`;
                        me.addCondition();
                        me.calculator.render();
                    })}</li>
                </ul>
            </li>);
        };
        this.toJSON = function () {
            return {
                '@type'           : 'Subselection',
                id                : this.id,
                format            : this.format,
                aggregateAttribute: this.aggregateAttribute,
                comparator        : this.comparator,
                aggregateValue    : this.aggregateValue,
                aggregator        : this.aggregator,
                value             : this.value,
                conditions        : this.conditions
            };
        };
    };

})(window);
