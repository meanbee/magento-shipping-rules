import Register from '../Register';
import Field from '../Field';

let fieldRegister = new Register;
fieldRegister.add = function (key, child) {
    if (!this.has(key) && child.prototype instanceof Field) {
        this.children[key] = child;
    }
    return this;
};

export default fieldRegister;