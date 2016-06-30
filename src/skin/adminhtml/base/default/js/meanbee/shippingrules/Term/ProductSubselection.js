'use strict';
(function (ShippingRules) {
    ShippingRules.Term.ProductSubselection = class extends ShippingRules.Term
    {
        constructor(index, parent) {
            super(index, parent);
            this.aggregator = new ShippingRules.Aggregator.ProductSet(0, this);
            this.aggregator.context = this;
            this.value = 1;
            this.attribute = null;
        }

        renderValue() {
            let me = this;
            return (<input id={`${me.id}-value`} type="number" value={me.value} onKeyDown={event => me.value = event.target.value} onChange={event => {
                me.value = event.target.value;
                me.root.rerender()
            }} />);
        }

        renderAttributeSelector() {
            let me = this;
            if (!ShippingRules.data.productAttributes) return (<select id={`${me.id}-attribute`}></select>);
            return (<select id={`${me.id}-attribute`} onChange={event => {
                me.attribute = event.target.value;
                me.root.rerender();
            }}>
                <option disabled="disabled" selected="selected">[SELECT]</option>
                {Object.keys(ShippingRules.data.productAttributes)
                    .filter((id) => ~ShippingRules.data.productAttributes[id].type.indexOf('number'))
                    .map((id) => {
                        let option = (<option value={id}>{ShippingRules.data.productAttributes[id].label}</option>);
                        if (me.attribute === id) option.selected = true;
                        return option;
                    })}
            </select>);
        }

        render() {
            let me = this;
            return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} tabIndex={0}>
                Sum of {me.renderAttributeSelector()} ✕ {me.renderValue()} for a subselection of items in cart where {me.aggregator.renderCombinator()} of these conditions are {me.aggregator.renderValue()}: {me.renderRemoveButton()}
                {me.aggregator.renderChildren()}
            </li>);
        }

        refresh() {
            super.refresh();
            this.aggregator.refresh();
        }

        init(obj) {
            this.attribute = obj.attribute;
            this.value = obj.value;
            this.aggregator.init(obj.aggregator);
        }

        toJSON() {
            let obj = super.toJSON();
            obj.key = 'Product_Subselection';
            obj.attribute = this.attribute;
            obj.aggregator = this.aggregator;
            return obj;
        }

        static name() {
            return 'Product Subselection';
        }
    }
    
    ShippingRules.Register.term.add('Product_Subselection', ShippingRules.Term.ProductSubselection);
})(Meanbee.ShippingRules);