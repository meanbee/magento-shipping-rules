'use strict';
(function (ShippingRules) {
    ShippingRules.Condition.ProductSubselection = class extends ShippingRules.Condition
    {
        constructor(index, parent, variable) {
            super(index, parent, variable);
            this.term = new ShippingRules.Term.ProductSubselection(0, this);
            this.term.aggregator.context = this;
        }
        
        static getCategory(context) {
            if (context instanceof this || context instanceof ShippingRules.Term.ProductSubselection) return 'Product Attributes';
            return 'Product Conditions';
        }

        static getVariables(context) {
            let variables = {};
            if (!context) {
                variables['product_subselection'] = { label: 'Product Subselection', type: ['number'] };
            } else if ((context instanceof this || context instanceof ShippingRules.Term.ProductSubselection) && ShippingRules.data['condition/product_subselection/attributes']) {
                variables = Object.assign(variables, ShippingRules.data['condition/product_subselection/attributes']);
            }
            return variables;
        }

        render() {
            if (this.parent.context instanceof this.constructor || this.parent.context instanceof ShippingRules.Term.ProductSubselection) return super.render();
            let me = this;
            return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} onCopy={me.copyText} tabIndex={0}>
                If sum of {me.term.renderAttributeSelector()} {me.renderComparator()} {me.valueField.render ? me.valueField.render() : []} for a subselection of items in cart where {me.term.aggregator.renderCombinator()} of these conditions are {me.term.aggregator.renderValue()}: {me.renderRemoveButton()}
                {me.term.aggregator.renderChildren()}
            </li>);
        }

        refresh() {
            super.refresh();
            this.term.refresh();
        }

        init(obj) {
            super.init(obj);
            if (this.parent.context instanceof this.constructor || this.parent.context instanceof ShippingRules.Term.ProductSubselection) return;
            this.term.init(obj.term);
        }

        toJSON() {
            let obj = super.toJSON();
            obj.key = 'Product_Subselection';
            obj.term = this.term;
            return obj;
        }

        static name() {
            return 'Product Subselection';
        }
    }

    ShippingRules.util.loadData('condition/product_subselection/attributes');
    ShippingRules.Register.condition.add('Product_Subselection', ShippingRules.Condition.ProductSubselection);
})(Meanbee.ShippingRules);