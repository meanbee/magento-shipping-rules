'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.PostalCodeCondition = function (calculator, group, postalCodeGroup, prefix = '', id = 0) {
        this.calculator = calculator;
        this.group = group;
        this.postalCodeGroup = postalCodeGroup;
        this.format = this.group.format;
        this.id = id;
        this.prefix = prefix;
        this.attribute = null;
        this.inputType = global.Meanbee.ShippingRules.ajax.getPostalCodeConditionFields(this.postalCodeGroup.format)[0].inputType;
        this.comparator = global.Meanbee.ShippingRules.ajax.getComparators(this.inputType)[0].value;
        this.value = null;
        this.render = function () {
            var me = this;
            return (<li id={`${me.prefix}-c${me.id}`} tabIndex="0" onKeyUp={(event) => {
                switch (event.which || event.keyCode) {
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
                    me.inputType = event.target.selectedOptions[0].dataset.inputType;
                    if (/^compound_.*$/.test(me.attribute)) {
                        var condition = me.attribute.substring(8).replace(/_(\w)/g, matches => matches[1].toUpperCase());
                        me.group.replaceCondition(me.id, new global.Meanbee.ShippingRules[condition](me.calculator, me.group, me.postalCodeGroup, me.prefix, me.id));
                    }
                    me.calculator.focusedElement = `${me.prefix}-c${me.id}`;
                    me.calculator.render();
                }}>{global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getPostalCodeConditionFields(me.postalCodeGroup.format))}</select>
                <select id={`${me.prefix}-c${me.id}-comparator`} value={me.comparator} onChange={event => {
                    me.comparator = event.target.value;
                    me.calculator.render();
                }}>{global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getComparators(me.inputType))}</select>
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
                comparator: this.comparator,
                value     : this.value
            };
        };
    };

})(window);
