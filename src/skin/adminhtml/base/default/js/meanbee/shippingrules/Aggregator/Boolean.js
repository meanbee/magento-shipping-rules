'use strict';
(function (ShippingRules) {
    ShippingRules.Aggregator.Boolean = class extends ShippingRules.Aggregator
    {
        constructor(index, parent = null, container) {
            super(index, parent, container);
            this._combinator = ShippingRules.Aggregator.Boolean.CONJUNCTIVE;
            this.value = 1;
        }

        set combinator(param) {
            if (~[ShippingRules.Aggregator.Boolean.CONJUNCTIVE, ShippingRules.Aggregator.Boolean.DISJUNCTIVE].indexOf(param)) {
                this._combinator = param;
            }
            return this;
        }

        get combinator() {
            return this._combinator;
        }

        addChild(childClass, index, ...params) {
            index = (index === void 0 || index === null) ? this.children.length : index;
            let reindex = index !== this.children.length,
                child = new childClass(index, this, ...params);
            if (child instanceof ShippingRules.Condition || child instanceof this.constructor) {
                this.children.splice(index, 0, child);
                if (reindex) this.reindexChildren();
                return this.children[index].id;
            } else {
                console.error(`ShippingRules: Boolean Aggregators only accept Conditions and Boolean Aggregators: ${childClass} passed.`);
            }
        }

        replaceChildByIndex(newChildClass, index, ...params) {
            this.removeChildByIndex(index);
            this.addChild(newChildClass, index, ...params);
            return this;
        }

        renderCombinator() {
            let me = this;
            return (<select id={`${me.id}-combinator`} onChange={event => me.combinator = event.target.value}>
                <option value={ShippingRules.Aggregator.Boolean.CONJUNCTIVE}>ALL</option>
                <option value={ShippingRules.Aggregator.Boolean.DISJUNCTIVE}>ANY</option>
            </select>);
        }

        renderValue() {
            let me = this;
            return (<select id={`${me.id}-value`} onChange={event => me.value = +event.target.value}>
                <option value="1">TRUE</option>
                <option value="0">FALSE</option>
            </select>);
        }

        renderChildSelector() {
            let me = this;
            return (<li id={`${me.id}.${me.children.length}`} onKeyDown={me.keyHandler.bind(me)} tabIndex={0}>
                <select id={`${me.id}-childselector`} aria-label="Condition" onChange={(event) => {
                    let selected = event.target.selectedOptions[0];
                    let registerKey = selected.getAttribute('data-register-key');
                    let variable = selected.value;
                    let id;
                    if (variable === 'this') {
                        id = me.addChild(me.constructor);
                    } else {
                        id = me.addChild(ShippingRules.Register.condition.get(registerKey), void 0, variable);
                    }
                    me.root.rerender();
                    me.root.focus(id);
                }}>
                    <option disabled="disabled" selected="selected">[SELECT]</option>
                    {ShippingRules.Register.condition.getAsOptions(me.context)}
                    <option value="this">Condition Combination</option>
                </select>
            </li>)
        }

        render() {
            let me = this;
            return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} tabIndex={0}>
                If {me.renderCombinator()} of these conditions are {me.renderValue()}: {me.renderRemoveButton()}
                {me.renderChildren()}
            </li>);
        }

        toJSON() {
            let obj = super.toJSON();
            obj.value = this.value;
            return obj;
        }
    }
    Object.defineProperties(ShippingRules.Aggregator.Boolean, {
        CONJUNCTIVE: {
            value: 'Conjunctive'
        },
        DISJUNCTIVE: {
            value: 'Disjunctive'
        }
    });

    ShippingRules.Register.aggregator.add('Boolean', ShippingRules.Aggregator.Boolean);
})(Meanbee.ShippingRules);