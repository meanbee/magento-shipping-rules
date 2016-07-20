import Comparator from '../Comparator';

export default class Equal extends Comparator
{
    constructor(type) {
        super(type);
    }

    static supportedTypes() {
        return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'string', 'enum', 'date', 'time', 'datetime', 'boolean'];
    }

    static identifier(type) {
        type = type.filter((t => ~this.supportedTypes().indexOf(t)).bind(this));
        switch (type[0]) {
        case 'currency':
        case 'number':
        case 'numeric_b10':
        case 'numeric_b26':
        case 'numeric_b36':
            return 'EQUALS';
        default:
            return 'IS';
        }
    }
    
    getField() {
        let type = this.type.filter((t => ~this.constructor.supportedTypes().indexOf(t)).bind(this));
        switch (type[0]) {
        case 'currency':
        case 'number':
        case 'numeric_b10':
            return 'Number';
        case 'numeric_b26':
            return 'NumberBase26';
        case 'numeric_b36':
            return 'NumberBase36';
        case 'enum':
            return 'Select';
        case 'boolean':
            return 'Boolean';
        case 'time':
            return 'Time';
        default:
            return 'Text';
        }
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Equal';
        return obj;
    }
}