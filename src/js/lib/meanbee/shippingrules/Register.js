/**
 * Class from which all registers inherit.
 * @memberof Meanbee.ShippingRules
 */
class Register
{
    constructor() {
        this.children = {};
    }

    /**
     * Removes the registered object by key.
     * @param {string} key
     * @returns {Object} The removed object
     */
    remove(key) {
        let child = this.get(key);
        delete this.children[key];
        return child;
    }

    /**
     * Checks whether there already exists a object in the register with given key.
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return this.children.hasOwnProperty(key);
    }

    /**
     * Gets a registered object by its key.
     * @param {string} key
     * @returns {Object}
     */
    get(key) {
        return this.has(key) && this.children[key];
    }

    /**
     * Constructs an array of option elements representing the objects in the register.
     * @return {Object[]}
     */
    getAsOptions() {
        return Object.keys(this.children).map(key => {
            return (<option value={key}>{this.get(key).identifier()}</option>);
        });
    }
}

export default Register