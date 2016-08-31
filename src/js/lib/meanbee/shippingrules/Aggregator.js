import Base from './Base';

/**
 * Groups a number of other tree items. Client side representation of an object
 * that takes the result of its children and returns a single value.
 * @extends Meanbee.ShippingRules.Base
 * @memberof Meanbee.ShippingRules
 */
class Aggregator extends Base
{
    /**
     * @param {(number|string)} index The index at which you can find this among the children of it's parent.
     * @param {Meanbee.ShippingRules.Base} parent The parent tree item.
     * @param {Element} container The element in which this calculator field is rendered.
     */
    constructor(index, parent = null, container = null) {
        super(index, parent, container)
        this.children = [];
        this.combinator = null;
        if (!parent) {
            if (!Meanbee.ShippingRules.calculators) Meanbee.ShippingRules.calculators = {};
            Meanbee.ShippingRules.calculators[index] = this;
        }
    }

    /**
     * Removes the child at the specified index and reindexes the remaining children.
     * @param {number} index The index that identifies the child to be removed.
     * @returns {Meanbee.ShippingRules.Base} The removed child.
     */
    removeChildByIndex(index) {
        let removed = this.children.splice(index, 1);
        this.reindexChildren();
        return removed[0];
    }

    /**
     * Resets the {@link Meanbee.ShippingRules.Base#index} property of its children according to their relative positions.
     * @returns {this}
     */
    reindexChildren () {
        this.children.forEach((child, i) => child.index = i);
        return this;
    }

    /**
     * Sorts the children according to their respective [index]{@link Base#index}.
     * @return {this}
     */
    sortChildren () {
        this.children = this.children.sort((a, b) => a.index - b.index);
        return this;
    }

    /**
     * Constructs a HTML element containing the rendered children.
     * @return {HTMLUListElement}
     */
    renderChildren() {
        let me = this;
        return (<ul>
            {me.children.map(child => child.render())}
            {me.renderChildSelector()}
        </ul>);
    }

    /**
     * Indicates to its children that they may need to update considering changes that have occurred higher ing the nested tree items.
     * @returns {this}
     */
    refresh() {
        super.refresh();
        this.children.forEach(c => c.refresh());
        return this;
    }

    /**
     * Initialises the aggregator with a serialised aggregator.
     * @returns {this}
     */
    init(obj) {
        super.init(obj);
        this.combinator = obj.type;
        return this;
    }

    /**
     * Serialises the aggregator to an object that can be stringified to JSON while persisting all necessary data.
     * @returns {Object}
     */
    toJSON() {
        return {
            children: this.children,
            register: 'Aggregator',
            key:     this.combinator
        };
    }
}

export default Aggregator