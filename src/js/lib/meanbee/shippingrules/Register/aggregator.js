import Register from '../Register';
import Aggregator from '../Aggregator';

let aggregatorRegister = new Register;
aggregatorRegister.add = function (key, child) {
    if (!this.has(key) && child.prototype instanceof Aggregator) {
        this.children[key] = child;
    }
    return this;
};

export default aggregatorRegister;