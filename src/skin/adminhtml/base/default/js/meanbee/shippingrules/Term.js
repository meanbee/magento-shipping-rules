import Base from './Base';
export default class Term extends Base
{
    constructor(index, parent) {
        super(index, parent)
        this._value = 0;
    }

    set value(param) {
        if (!isNaN(parseInt(param, 10))) {
            this._value = parseInt(param, 10);
        }
        return this;
    }

    get value() {
        return this._value;
    }
    
    init(obj) {
        if (obj.register !== 'Term' || Meanbee.ShippingRules.registers.term.get(obj.key) !== this.constructor) {
            return;
        }
        this.combinator = obj.type;
    }

    toJSON() {
        return {
            register: 'Term',
            value:    this.value
        };
    }
}