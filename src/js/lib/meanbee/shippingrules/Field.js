export default class Field
{
    constructor(condition, value) {
        this.condition = condition;
        this.idPrefix = condition ? condition.id : null;
        this.value = value;
    }

    valueChangeHandler(event) {
        this.value = event.target.value;
        this.condition.valueChangeHandler(this.value);
    }

    get root () {
        return this.condition.root;
    }
}