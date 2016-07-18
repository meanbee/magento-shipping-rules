import Register from '../Register';
import Comparator from '../Comparator';

let comparatorRegister = new Register;
comparatorRegister.add = function (key, child) {
    if (!this.has(key) && child.prototype instanceof Comparator) {
        this.children[key] = child;
    }
    return this;
};
comparatorRegister.getByType = function (type) {
    return Object.keys(this.children).reduce((accumulator, key) => {
        if (this.children[key].canHandleType(type)) {
            accumulator[key] = this.children[key];
        }
        return accumulator;
    }, {});
};
comparatorRegister.getAsOptions = function (type, selectedName) {
    let options = type ? this.getByType(type) : this.children;
    return Object.keys(options).map(key => {
        let option = (<option value={key}>{options[key].name(type)}</option>);
        option.selected = options[key].name(type) === selectedName;
        return option;
    });
};

export default comparatorRegister;