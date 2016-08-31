import Base from './Base';

/**
 * The client side representation of an object that considers a variable and evaluates to a boolean.
 * @extends Meanbee.ShippingRules.Base
 * @memberof Meanbee.ShippingRules
 */
class Condition extends Base
{
    /**
     * @param {number} index The index at which you can find this among the children of it's parent.
     * @param {Meanbee.ShippingRules.Base} parent The parent tree item.
     * @param {string} variable The selected variable upon which the condition is evaluated.
     */
    constructor(index, parent, variable) {
        super(index, parent);
        this.variable = variable;
        let validComparators = Meanbee.ShippingRules.registers.comparator.getByType(this.type);
        let comparator = validComparators[Object.keys(validComparators)[0]];
        this.comparator = comparator ? new comparator(this.type) : null;
        this.value = '';
        this.valueField = comparator ? new (Meanbee.ShippingRules.registers.field.get(this.comparator.getField()))(this, this.value) : null;
    }

    /**
     * The textual label that groups the variables of this condition with other conditions that share the same category.
     * @param {Meanbee.ShippingRules.Base} context
     * @returns {string}
     */
    static getCategory(context) { // eslint-disable-line no-unused-vars
        return null;
    }

    /**
     * Gets object of `{key: {label: <string>, type: <string[]>}}` pairs representing the variables over which this condition can be evaluated.
     * @returns {Object}
     */
    static getVariables(context) { // eslint-disable-line no-unused-vars
        return {};
    }

    /**
     * The textual label for the variable selected.
     * @type {string}
     */
    get label() {
        let variable = this.constructor.getVariables(this.parent && this.parent.context)[this.variable];
        return variable ? variable.label : '';
    }

    /**
     * The type array of the selected variable.
     * @type {string[]}
     */
    get type() {
        let variable = this.constructor.getVariables(this.parent && this.parent.context)[this.variable];
        return variable ? variable.type : [];
    }

    /**
     * Creates a select field listing valid comparators.
     * @return {HTMLSelectElement}
     */
    renderComparator() {
        let me = this;
        return (<select id={`${me.id}-comparator`} onChange={event => {
            me.comparator = new (Meanbee.ShippingRules.registers.comparator.get(event.target.value))(me.type);
            me.refresh();
            me.root.rerender();
            Meanbee.ShippingRules.history.pushState();
        }}>
            {Meanbee.ShippingRules.registers.comparator.getAsOptions(me.type, me.comparator.identifier)}
        </select>);
    }

    /**
     * Called when the falue field is changed.
     * @param {Object} value
     */
    valueChangeHandler(value) {
        this.value = this.comparator.valueChangeHandler(value);
        this.root.updateJSON();
    }

    /**
     * Creates the DOM representation of the tree item.
     * @return {HTMLLIElement}
     */
    render() {
        let me = this;
        return (<li id={me.id} tabIndex={0} onCopy={me.copyText} draggable="true" onDragStart={me.drag.bind(me)}
            onDragOver={me.allowDrop.bind(me)} onDrop={me.drop.bind(me)} onDragEnter={me.dragIn.bind(me)} onDragLeave={me.dragOut.bind(me)}>
            {me.label || ' '}
            {me.renderComparator()}
            {me.valueField.render ? me.valueField.render() : []}
            {me.renderRemoveButton()}
        </li>);
    }

    /**
     * Changes the value field according to the new comparator.
     * @returns {this}
     */
    refresh() {
        super.refresh();
        if (this.type.length) {
            this.comparator.type = this.type;
            this.valueField = new (Meanbee.ShippingRules.registers.field.get(this.comparator.getField()))(this, this.value);
        }
        return this;
    }

    /**
     * Initialises the condition with a serialised condition.
     * @returns {this}
     */
    init(obj) {
        this.variable = obj.variable;
        this.value = obj.value;
        this.comparator = new (Meanbee.ShippingRules.registers.comparator.get(obj.comparator.key))(this.type);
        if (this.type.length) this.valueField = new (Meanbee.ShippingRules.registers.field.get(this.comparator.getField()))(this, this.value);
    }

    /**
     * Serialises the condition to an object that can be stringified to JSON while persisting all necessary data.
     * @returns {Object}
     */
    toJSON() {
        return {
            register: 'Condition',
            variable: this.variable,
            comparator: this.comparator,
            value: this.value
        }
    }
}

export default Condition