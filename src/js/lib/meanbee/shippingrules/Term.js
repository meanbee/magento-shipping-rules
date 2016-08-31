import Base from './Base';

/**
 * The client side representation of an object that considers a variable and evaluates to a number.
 * @extends Meanbee.ShipppingRules.Base
 * @memberof Meanbee.ShippingRules
 */
class Term extends Base
{
    /**
     * @param {number} index The client side representation of an object that considers a variable and evaluates to a boolean.
     * @param {Meanbee.ShippingRules.Base} parent The parent tree item.
     */
    constructor(index, parent) {
        super(index, parent)
        this._value = 0;
    }

    /**
     * The numerical value represented by this term.
     * @type {number}
     */
    set value(param) {
        if (!isNaN(parseFloat(param, 10))) {
            this._value = parseFloat(param, 10);
        }
        return this;
    }

    get value() {
        return this._value;
    }

    /**
     * Initialises the term with a serialised condition.
     * @return {this}
     */
    init(obj) {
        if (obj.register !== 'Term' || Meanbee.ShippingRules.registers.term.get(obj.key) !== this.constructor) {
            return;
        }
        this.combinator = obj.type;
        return this;
    }

    /**
     * Serialises the term to an object that can be stringified to JSON while persisting all necessary data.
     * @returns {Object}
     */
    toJSON() {
        return {
            register: 'Term',
            value:    this.value
        };
    }
}

export default Term