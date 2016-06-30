'use strict';
(function (ShippingRules) {
    ShippingRules.Aggregator = class extends ShippingRules.Base
    {
        constructor(index, parent = null, container) {
            super(index, parent, container)
            this.children = [];
            this.combinator = null;
            if (!parent) {
                if (!ShippingRules.calculators) ShippingRules.calculators = {};
                ShippingRules.calculators[index] = this;
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
            if (obj.register !== 'Aggregator' || ShippingRules.Register.aggregator.get(obj.key) !== this.constructor) {
                return;
            }
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
})(Meanbee.ShippingRules);