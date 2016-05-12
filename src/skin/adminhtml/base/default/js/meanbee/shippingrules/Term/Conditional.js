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
            return (<input id={`${me.id}-value`} type="number" value={me.value} onKeyDown={event => me.value = event.target.value} />);
        }

        render() {
            let me = this;
            return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} tabIndex={0}>
                Constant value of {me.renderValue()}
                <span id={me.aggregator.id}>
                    if {me.aggregator.renderCombinator()} of these conditions are {me.aggregator.renderValue()}: {me.renderRemoveButton()}
                    {me.aggregator.renderChildren()}
                </span>
            </li>);
        }

        toJSON() {
            let obj = super.toJSON();
            obj.aggregator = this.aggregator;
            return obj;
        }

        static name() {
            return 'Conditional Value';
        }
    }

    ShippingRules.Register.term.add('Conditional', ShippingRules.Term.Conditional);
})(Meanbee.ShippingRules);