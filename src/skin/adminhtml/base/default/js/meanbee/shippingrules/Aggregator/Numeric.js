'use strict';
(function (ShippingRules) {
    ShippingRules.Aggregator.Numeric = class extends ShippingRules.Aggregator
    {
        constructor(index, parent = null, container) {
            super(index, parent, container);
            this.combinator = 'Summative';
        }

        addChild(childClass, index, ...params) {
            index = (index === void 0 || index === null) ? this.children.length : index;
            let reindex = index !== this.children.length,
                child = new childClass(index, this, ...params);
            if (child instanceof ShippingRules.Term || child instanceof this.constructor) {
                this.children.splice(index, 0, child);
                if (reindex) this.reindexChildren();
                return this.children[index].id;
            } else {
                console.error(`ShippingRules: Numeric Aggregators only accept Terms and Numeric Aggregators: ${childClass} passed.`);
            }
        }

        replaceChildByIndex(newChildClass, index, ...params) {
            this.removeChildByIndex(index);
            this.addChild(newChildClass, index, ...params);
            return this;
        }

        renderChildSelector() {
            let me = this;
            return (<li id={`${me.id}.${me.children.length}`} onKeyDown={me.keyHandler.bind(me)} tabIndex={0}>
                <select id={`${me.id}-childselector`} aria-label="Type of value" onChange={(event) => {
                    let child = (event.target.value === 'this') ? me.constructor : ShippingRules.Register.term.get(event.target.value);
                    let id = me.addChild(child);
                    me.root.rerender();
                    me.root.focus(id);
                }}>
                    <option disabled="disabled" selected="selected">[SELECT]</option>
                    {ShippingRules.Register.term.getAsOptions()}
                    <option value="this">Sum of values</option>
                </select>
            </li>);
        }

        render() {
            let me = this;
            return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} tabIndex={0}>
                Sum of these values: {me.renderRemoveButton()}
                {me.renderChildren()}
            </li>);
        }
    }

    ShippingRules.Register.aggregator.add('Numeric', ShippingRules.Aggregator.Numeric);
})(Meanbee.ShippingRules);