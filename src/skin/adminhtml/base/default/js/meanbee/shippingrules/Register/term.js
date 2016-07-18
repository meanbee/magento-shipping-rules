import Register from '../Register';
import Term from '../Term';

let termRegister = new Register;
termRegister.add = function (key, child) {
    if (!this.has(key) && child.prototype instanceof Term) {
        this.children[key] = child;
    }
    return this;
};

export default termRegister;