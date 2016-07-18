import Aggregator from '../Aggregator';
import Term from '../Term';

export default class Numeric extends Aggregator
{
    constructor(index, parent = null, container) {
        super(index, parent, container);
        this.combinator = 'Summative';
    }

    addChild(childClass, index, ...params) {
        index = (index === void 0 || index === null) ? this.children.length : index;
        let reindex = index !== this.children.length,
            child = new childClass(index, this, ...params);
        if (child instanceof Term || child instanceof this.constructor) {
            this.children.splice(index, 0, child);
            if (reindex) this.reindexChildren();
            return this.children[index];
        } else {
            console.warn(`ShippingRules: Numeric Aggregators only accept Terms and Numeric Aggregators: ${childClass} passed.`);
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
                let child = (event.target.value === 'this') ? me.constructor : Meanbee.ShippingRules.registers.term.get(event.target.value);
                let id = me.addChild(child).id;
                me.root.rerender();
                me.root.focus(id);
                Meanbee.ShippingRules.history.pushState();
            }}>
                <option disabled="disabled" selected="selected">[SELECT]</option>
                {Meanbee.ShippingRules.registers.term.getAsOptions()}
                <option value="this">Sum of values</option>
            </select>
        </li>);
    }

    render() {
        let me = this;
        return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} onCopy={me.copyText} tabIndex={0} draggable="true"
            onDragStart={me.drag.bind(me)} onDragOver={me.allowDrop.bind(me)} onDrop={me.drop.bind(me)} onDragEnter={me.dragIn.bind(me)} onDragLeave={me.dragOut.bind(me)}>
            Sum of these values: {me.renderRemoveButton()}
            {me.renderChildren()}
        </li>);
    }

    init(obj) {
        super.init(obj);
        if (obj.children) {
            this.children = [];
            obj.children.forEach(child => {
                if (child.register === 'Term') {
                    this.addChild(Meanbee.ShippingRules.registers.term.get(child.key)).init(child);
                } else if (child.register === 'Aggregator') {
                    this.addChild(Meanbee.ShippingRules.registers.aggregator.get(child.key)).init(child);
                }
            });
        }
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Summative';
        return obj;
    }
}