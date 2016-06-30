'use strict';
(function (ShippingRules) {
    ShippingRules.Aggregator.ProductSet = class extends ShippingRules.Aggregator
    {
        constructor(index, parent = null, container) {
            super(index, parent, container);
            this.combinator = this.constructor.INTERSECTIONAL;
            this.value = true;
        }

        set combinator(param) {
            if (~[this.constructor.INTERSECTIONAL, this.constructor.UNIONAL].indexOf(param)) {
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
                return this.children[index];
            } else {
                console.error(`ShippingRules: ProductSet Aggregators only accept Conditions and Boolean Aggregators: ${childClass} passed.`);
            }
        }

        replaceChildByIndex(newChildClass, index, ...params) {
            this.removeChildByIndex(index);
            this.addChild(newChildClass, index, ...params);
            return this;
        }

        renderCombinator() {
            let me = this;
            return (<select id={`${me.id}-combinator`} onChange={event => {
                me.combinator = event.target.value;
                me.root.rerender();
            }}>
                {[{ label: 'ALL', value: me.constructor.INTERSECTIONAL},
                    { label: 'ANY', value: me.constructor.UNIONAL}].map(combinator => {
                        let option = (<option value={combinator.value}>{combinator.label}</option>);
                        if (me.combinator === combinator.value) option.selected = true;
                        return option;
                    })}
            </select>);
        }

        renderValue() {
            let me = this;
            return (<select id={`${me.id}-value`} onChange={event => {
                me.value = !!+event.target.value
                me.root.rerender();
            }}>
                {[{ label: 'TRUE', value: 1}, { label: 'FALSE', value: 0}].map(value => {
                    let option = (<option value={value.value}>{value.label}</option>);
                    if (me.value === value.value) option.selected = true;
                    return option;
                })}
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
                        id = me.addChild(me.constructor).id;
                    } else {
                        id = me.addChild(ShippingRules.Register.condition.get(registerKey), void 0, variable).id;
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

        init(obj) {
            super.init(obj);
            this.value = (typeof obj.value) === 'boolean' ? obj.value : true;
            if (obj.children) {
                obj.children.forEach(child => {
                    if (child.register === 'Condition') {
                        this.addChild(ShippingRules.Register.condition.get(child.key)).init(child);
                    } else if (child.register === 'Aggregator') {
                        this.addChild(ShippingRules.Register.aggregator.get(child.key)).init(child);
                    }
                });
            }
        }

        toJSON() {
            let obj = super.toJSON();
            obj.value = this.value;
            return obj;
        }
    }
    Object.defineProperties(ShippingRules.Aggregator.ProductSet, {
        INTERSECTIONAL: {
            value: 'Intersectional'
        },
        UNIONAL: {
            value: 'Unional'
        }
    });

    ShippingRules.Register.aggregator.add(ShippingRules.Aggregator.ProductSet.INTERSECTIONAL, ShippingRules.Aggregator.ProductSet);
    ShippingRules.Register.aggregator.add(ShippingRules.Aggregator.ProductSet.UNIONAL, ShippingRules.Aggregator.ProductSet);
})(Meanbee.ShippingRules);