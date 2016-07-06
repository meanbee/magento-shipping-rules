'use strict';
(function (ShippingRules) {
    ShippingRules.Term.Conditional = class extends ShippingRules.Term
    {
        constructor(index, parent) {
            super(index, parent);
            this.aggregator = new ShippingRules.Aggregator.Boolean(0, this);
        }

        renderValue() {
            let me = this;
            return (<input id={`${me.id}-value`} type="number" value={me.value} onKeyDown={event => me.value = event.target.value} onChange={event => {
                me.value = event.target.value;
                me.root.rerender();
                ShippingRules.history.pushState();
            }} />);
        }

        render() {
            let me = this;
            return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} onCopy={me.copyText} tabIndex={0}>
                Constant value of {me.renderValue()}
                <span id={me.aggregator.id}>
                    if {me.aggregator.renderCombinator()} of these conditions are {me.aggregator.renderValue()}: {me.renderRemoveButton()}
                    {me.aggregator.renderChildren()}
                </span>
            </li>);
        }
        
        refresh() {
            super.refresh();
            this.aggregator.refresh();
        }

        init(obj) {
            super.init(obj);
            this.value = obj.value;
            this.aggregator.init(obj.aggregator);
        }

        toJSON() {
            let obj = super.toJSON();
            obj.key = 'Conditional';
            obj.aggregator = this.aggregator;
            return obj;
        }

        static name() {
            return 'Conditional Value';
        }
    }

    ShippingRules.Register.term.add('Conditional', ShippingRules.Term.Conditional);
})(Meanbee.ShippingRules);