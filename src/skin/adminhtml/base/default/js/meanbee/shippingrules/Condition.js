'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.Condition = function (calculator, group, prefix = '', id = 0) {
        this.calculator = calculator;
        this.group = group;
        this.id = id;
        this.prefix = prefix;
        this.attribute = global.Meanbee.ShippingRules.ajax.getConditionFields()[0].value[0].value;
        this.comparator = global.Meanbee.ShippingRules.ajax.getComparators(this.attribute)[0].value;
        this.conditionType = global.Meanbee.ShippingRules.ajax.getConditionFields()[0].value[0].type;
        this.value = null;
        this.render = function () {
            var me = this;
            return (<li id={`${me.prefix}-c${me.id}`} tabIndex="0" onKeyUp={event => {
                switch (event.which || event.keyCode) {
                case 37: // Left Arrow
                    event.stopPropagation();
                    event.target.parentElement.parentElement.focus();
                    break;
                case 38: // Up Arrow
                    event.stopPropagation();
                    (event.target.previousElementSibling || event.target.parentElement.lastElementChild.previousElementSibling).focus();
                    break;
                case 40: // Down Arrow
                    event.stopPropagation();
                    (event.target.nextElementSibling.id ? event.target.nextElementSibling : event.target.parentElement.firstElementChild).focus();
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
                <select id={`${me.prefix}-c${me.id}-attribute`} value={me.attribute} onChange={event => {
                    me.attribute = event.target.value;
                    me.conditionType = event.target.dataset.type;
                    if (/^compound_.*$/.test(me.attribute)) {
                        var condition = me.attribute.substring(8).replace(/_(\w)/g, function (matches) {
                            return matches[1].toUpperCase();
                        });
                        me.group.replaceCondition(me.id, new global.Meanbee.ShippingRules[condition](me.calculator, me.group, me.prefix, me.id));
                    }
                    me.calculator.focusedElement = `${me.prefix}-c${me.id}`;
                    me.calculator.render();
                }}>{global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getConditionFields())}</select>
                <select id={`${me.prefix}-c${me.id}-comparator`} value={me.comparator} onChange={event => {
                    me.comparator = event.target.value;
                    me.calculator.render();
                }}>{global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getComparators(me.attribute))}</select>
                {global.Meanbee.ShippingRules.util.constructInputField(me)}
                <button id={`${me.prefix}-c${me.id}-remove`} type="button" class="remove" onClick={() => {
                    me.group.removeCondition(me.id);
                    me.calculator.render();
                }}>-</button>
            </li>);
        };
        this.toJSON = function () {
            return {
                '@type'   : 'Condition',
                id        : this.id,
                attribute : this.attribute,
                conditionType: this.conditionType,
                comparator: this.comparator,
                value     : this.value
            };
        };
    };

})(window);
