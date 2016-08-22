import Comparator from '../Comparator';

export default class Ends extends Comparator
{
    constructor(type) {
        super(type);
    }

    static supportedTypes() {
        return ['string'];
    }

    static identifier(type) {
        type = type.filter((t => ~this.supportedTypes().indexOf(t)).bind(this));
        switch (type[0]) {
        default:
            return 'ENDS WITH';
        }
    }
    
    getField() {
        let type = this.type.filter((t => ~this.constructor.supportedTypes().indexOf(t)).bind(this));
        switch (type[0]) {
        default:
            return 'Text';
        }
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Ends';
        return obj;
    }
}