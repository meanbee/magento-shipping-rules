import Register from '../Register';
import Condition from '../Condition';

let conditionRegister = new Register;
conditionRegister.add = function (key, child) {
    if (!this.has(key) && child.prototype instanceof Condition) {
        this.children[key] = child;
    }
    return this;
};
conditionRegister.getAsOptions = function (context) {
    let categorised = Object.keys(this.children).map(key => {
        return {
            [this.children[key].getCategory(context)]: Object.keys(this.children[key].getVariables(context)).map(variable =>
                (<option value={variable} data-register-key={key}>{this.children[key].getVariables(context)[variable].label}</option>))
        };
    }).reduce((accumulator, current) => {
        let k = Object.keys(current)[0];
        if (!current[k].length) return accumulator;
        return Object.assign(accumulator, accumulator[k] ? {[k]: [...accumulator[k], ...current[k]]} : {[k]: current[k]});
    }, {});
    return Object.keys(categorised).map(category => (
        <optgroup label={category}>
            {categorised[category]}
        </optgroup>
    ));
};

export default conditionRegister;