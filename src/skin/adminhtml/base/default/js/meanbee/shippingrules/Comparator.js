export default class Comparator
{
    constructor(type) {
        this.type = type;
    }

    static supportedTypes() {
        return [];
    }

    static canHandleType(type) {
        for (let t of type) {
            if (~this.supportedTypes().indexOf(t)) {
                return true;
            }
        }
        return false;
    }

    get name() {
        return this.constructor.name(this.type);
    }

    static name(type) { // eslint-disable-line no-unused-vars
        return {};
    }

    toJSON() {
        return {
            register: 'Comparator'
        }
    }
}