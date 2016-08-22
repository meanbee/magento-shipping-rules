import Aggregator from '../Aggregator';
import Condition from '../Condition';

class BooleanAggregator extends Aggregator
{
    constructor(index, parent = null, container) {
        super(index, parent, container);
        this.combinator = this.constructor.CONJUNCTIVE;
        this.value = true;
    }

    set combinator(param) {
        if (~[this.constructor.CONJUNCTIVE, this.constructor.DISJUNCTIVE].indexOf(param)) {
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
        if (child instanceof Condition || child instanceof this.constructor) {
            this.children.splice(index, 0, child);
            if (reindex) this.reindexChildren();
            return this.children[index];
        } else {
            console.warn(`ShippingRules: Boolean Aggregators only accept Conditions and Boolean Aggregators: ${childClass} passed.`);
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
            Meanbee.ShippingRules.history.pushState();
        }}>
            {[{ label: 'ALL', value: me.constructor.CONJUNCTIVE},
                { label: 'ANY', value: me.constructor.DISJUNCTIVE}].map(combinator => {
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
            Meanbee.ShippingRules.history.pushState();
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
        return (<li id={me.id + '.' + me.children.length} onKeyDown={me.keyHandler.bind(me)} tabIndex={0}>
            <select id={`${me.id}-childselector`} aria-label="Condition" onChange={(event) => {
                let selected = event.target.selectedOptions[0];
                let registerKey = selected.getAttribute('data-register-key');
                let variable = selected.value;
                let id;
                if (variable === 'this') {
                    id = me.addChild(me.constructor).id;
                } else {
                    id = me.addChild(Meanbee.ShippingRules.registers.condition.get(registerKey), void 0, variable).id;
                }
                me.root.rerender();
                me.root.focus(id);
                Meanbee.ShippingRules.history.pushState();
            }}>
                <option disabled="disabled" selected="selected">[SELECT]</option>
                {Meanbee.ShippingRules.registers.condition.getAsOptions(me.context)}
                <option value="this">Condition Combination</option>
            </select>
        </li>)
    }

    render() {
        let me = this;
        return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} onCopy={me.copyText} tabIndex={0} draggable="true"
            onDragStart={me.drag.bind(me)} onDragOver={me.allowDrop.bind(me)} onDrop={me.drop.bind(me)} onDragEnter={me.dragIn.bind(me)} onDragLeave={me.dragOut.bind(me)}>
            If {me.renderCombinator()} of these conditions are {me.renderValue()}: {me.renderRemoveButton()}
            {me.renderChildren()}
        </li>);
    }

    init(obj) {
        super.init(obj);
        this.value = (typeof obj.value) === 'boolean' ? obj.value : true;
        if (obj.children) {
            this.children = [];
            obj.children.forEach(child => {
                if (child.register === 'Condition') {
                    this.addChild(Meanbee.ShippingRules.registers.condition.get(child.key)).init(child);
                } else if (child.register === 'Aggregator') {
                    this.addChild(Meanbee.ShippingRules.registers.aggregator.get(child.key)).init(child);
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
Object.defineProperties(BooleanAggregator, {
    CONJUNCTIVE: {
        value: 'Conjunctive'
    },
    DISJUNCTIVE: {
        value: 'Disjunctive'
    }
});

export default BooleanAggregator;