/**
 * An input field.
 * @memberof Meanbee.ShippingRules
 */
class Field
{
    /**
     * @param {Meanbee.ShippingRules.Condition} condition Reference to the parent condition.
     * @param {Object} value The initial value.
     */
    constructor(condition, value) {
        this.condition = condition;
        this.idPrefix = condition ? condition.id : null;
        this.value = value;
    }

    /**
     * Called when the fields value is changed.
     * @listens change
     * @param {Event} event
     */
    valueChangeHandler(event) {
        this.value = event.target.value;
        this.condition.valueChangeHandler(this.value);
    }

    /**
     * The root tree item.
     * @type {Meanbee.ShippingRules.Aggregator}
     */
    get root () {
        return this.condition.root;
    }
}

export default Field