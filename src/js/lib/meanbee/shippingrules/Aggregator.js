import Base from './Base';

export default class Aggregator extends Base
{
    constructor(index, parent = null, container) {
        super(index, parent, container)
        this.children = [];
        this.combinator = null;
        if (!parent) {
            if (!Meanbee.ShippingRules.calculators) Meanbee.ShippingRules.calculators = {};
            Meanbee.ShippingRules.calculators[index] = this;
        }
    }

    removeChildByIndex(index) {
        this.children.splice(index, 1);
        this.reindexChildren();
    }

    reindexChildren () {
        this.children.forEach((child, i) => child.index = i);
        return this;
    }

    sortChildren () {
        this.children = this.children.sort((a, b) => a.index - b.index);
        return this;
    }

    renderChildren() {
        let me = this;
        return (<ul>
            {me.children.map(child => child.render())}
            {me.renderChildSelector()}
        </ul>);
    }

    refresh() {
        super.refresh();
        this.children.forEach(c => c.refresh());
    }

    init(obj) {
        super.init(obj);
        this.combinator = obj.type;
    }

    toJSON() {
        return {
            children: this.children,
            register: 'Aggregator',
            key:     this.combinator
        };
    }
}