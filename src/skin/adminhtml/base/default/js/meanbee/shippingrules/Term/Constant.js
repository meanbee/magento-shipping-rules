'use strict';
(function (ShippingRules) {
    ShippingRules.Term.Constant = class extends ShippingRules.Term
    {
        constructor(index, parent) {
            super(index, parent);
        }

        renderValue() {
            let me = this;
            return (<input id={`${me.id}-value`} type="number" value={me.value} onKeyDown={event => me.value = event.target.value} />);
        }

        render() {
            let me = this;
            return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} tabIndex={0}>Constant value of {me.renderValue()} {me.renderRemoveButton()}</li>);
        }

        toJSON() {
            let obj = super.toJSON();
            obj.type = 'Conditional';
            return obj;
        }

        static name() {
            return 'Constant Value';
        }
    }

    ShippingRules.Register.term.add('Constant', ShippingRules.Term.Constant);
})(Meanbee.ShippingRules);