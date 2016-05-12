'use strict';
(function (ShippingRules) {
    ShippingRules.Aggregator = class extends ShippingRules.Base
    {
        constructor(index, parent = null, container) {
            super(index, parent, container)
            this.children = [];
            this.combinator = null;
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

        toJSON() {
            return {
                children: this.children,
                register: 'Aggregator',
                type:     this.combinator
            };
        }
    }
})(Meanbee.ShippingRules);