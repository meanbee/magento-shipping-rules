'use strict';
(function (ShippingRules) {
    ShippingRules.Condition = class extends ShippingRules.Base
    {
        constructor(index, parent, variable) {
            super(index, parent);
            this.variable = variable;
            let validComparators = ShippingRules.Register.comparator.getByType(this.type);
            let comparator = validComparators[Object.keys(validComparators)[0]];
            this.comparator = comparator ? new comparator(this.type) : null;
            this.value = '';
            this.valueField = comparator ? new (ShippingRules.Register.field.get(this.comparator.getField()))(this, this.value) : null;
        }

        static getCategory(context) { // eslint-disable-line no-unused-vars
            return null;
        }

        static getVariables(context) { // eslint-disable-line no-unused-vars
            return {};
        }

        get label() {
            let variable = this.constructor.getVariables(this.parent && this.parent.context)[this.variable];
            return variable ? variable.label : '';
        }

        get type() {
            let variable = this.constructor.getVariables(this.parent && this.parent.context)[this.variable];
            return variable ? variable.type : [];
        }

        renderComparator() {
            let me = this;
            return (<select id={`${me.id}-comparator`} onChange={event => {
                me.comparator = new (ShippingRules.Register.comparator.get(event.target.value))(this.type);
                me.valueField = new (ShippingRules.Register.field.get(me.comparator.getField()))(me, me.value);
                me.root.rerender();
                ShippingRules.history.pushState();
            }}>
                {ShippingRules.Register.comparator.getAsOptions(me.type, me.comparator.name)}
            </select>);
        }

        valueChangeHandler(value) {
            this.value = value;
            this.root.updateJSON();
        }

        render() {
            let me = this;
            return (<li id={me.id} tabIndex={0} onCopy={me.copyText}>
                {me.label || ' '}
                {me.renderComparator()}
                {me.valueField.render ? me.valueField.render() : []}
                {me.renderRemoveButton()}
            </li>);
        }

        refresh() {
            super.refresh();
            if (this.type.length) {
                this.comparator.type = this.type;
                this.valueField = new (ShippingRules.Register.field.get(this.comparator.getField()))(this, this.value);
            }
        }

        init(obj) {
            this.variable = obj.variable;
            this.value = obj.value;
            this.comparator = new (ShippingRules.Register.comparator.get(obj.comparator.key))(this.type);
            if (this.type.length) this.valueField = new (ShippingRules.Register.field.get(this.comparator.getField()))(this, this.value);
        }

        toJSON() {
            return {
                register: 'Condition',
                variable: this.variable,
                comparator: this.comparator,
                value: this.value
            }
        }
    }
})(Meanbee.ShippingRules);