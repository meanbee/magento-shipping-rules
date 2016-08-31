/**
 * @memberof Meanbee.ShippingRules
 */
class Comparator
{
    /** @param {string} type Types over which the comparator 'compares'. */
    constructor(type) {
        this.type = type;
    }

    /**
     * Override to specify the types over which your comparator is valid.
     * @returns {string[]} An array of strings identifying the types over which it is valid for this comparator to 'compare'.
     */
    static supportedTypes() {
        return [];
    }

    /**
     * Checks whether or not this comparator is valid over the specified type.
     * @param {string} type The type to check
     * @returns {boolean}
     */
    static canHandleType(type) {
        for (let i = 0; i < type.length; i++) {
            let t = type[i];
            if (~this.supportedTypes().indexOf(t)) {
                return true;
            }
        }
        return false;
    }

    /**
     * The text used for the comparator in the context of the types over which it 'compares'.
     * @type {string}
     */
    get identifier() {
        return this.constructor.identifier(this.type);
    }

    /**
     * Override this method to set the text used for the comparator
     * @returns {string}
     */
    static identifier(type) { // eslint-disable-line no-unused-vars
        return {};
    }

    /**
     * Called when the asscoiated field is changed.
     * @returns {Object}
     */
    valueChangeHandler(value) {
        return value;
    }

    /**
     * Serialises the comparator to an object that can be stringified to JSON while persisting all necessary data.
     * @returns {Object}
     */
    toJSON() {
        return {
            register: 'Comparator'
        }
    }
}

export default Comparator