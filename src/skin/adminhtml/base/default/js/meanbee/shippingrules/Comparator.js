export default class Comparator
{
    constructor(type) {
        this.type = type;
    }

    static supportedTypes() {
        return [];
    }

    static canHandleType(type) {
        for (let i = 0; i < type.length; i++) {
            let t = type[i];
            if (~this.supportedTypes().indexOf(t)) {
                return true;
            }
        }
        return false;
    }

    get identifier() {
        return this.constructor.identifier(this.type);
    }

    static identifier(type) { // eslint-disable-line no-unused-vars
        return {};
    }

    toJSON() {
        return {
            register: 'Comparator'
        }
    }
}