import Comparator from '../Comparator';

export default class OneOf extends Comparator
{
    constructor(type) {
        super(type);
    }

    static supportedTypes() {
        return ['enum', 'number', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'string'];
    }

    static identifier(type) {
        type = type.filter((t => ~this.supportedTypes().indexOf(t)).bind(this));
        switch (type[0]) {
        default:
            return 'IS ONE OF';
        }
    }
    
    getField() {
        let type = this.type.filter((t => ~this.constructor.supportedTypes().indexOf(t)).bind(this));
        switch (type[0]) {
        case 'enum':
            return 'Multiselect'
        case 'number':
        case 'numeric_b10':
            return 'NumberList';
        case 'numeric_b26':
            return 'NumberBase26List';
        case 'numeric_b36':
            return 'NumberBase36List';
        case 'string':
            return 'CasedText';
        default:
            return 'Text'
        }
    }

    valueChangeHandler(value) {
        if (Array.isArray(value)) {
            return value;
        }
        let type = this.type.filter((t => ~this.constructor.supportedTypes().indexOf(t)).bind(this));
        if (type[0] === 'string') {
            let caseSensitive = value.caseSensitive;
            value = value.text.split(',').map(v => v.trim());
            value.caseSensitive = caseSensitive;
            return value;
        }
        return value.split(',').map(v => v.trim());
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'OneOf';
        return obj;
    }
}