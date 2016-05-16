'use strict';
(function (ShippingRules) {
    ShippingRules.Comparator.Equal = class extends ShippingRules.Comparator
    {
        constructor(type) {
            super(type);
        }

        static supportedTypes() {
            return ['number', 'currency', 'string', 'enum', 'date', 'time', 'datetime'];
        }

        static name(type) {
            type = type.filter((t => ~this.supportedTypes().indexOf(t)).bind(this));
            switch (type[0]) {
            case 'number':
            case 'currency':
                return 'EQUALS';
            default:
                return 'IS';
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
            obj.key = 'Equal';
            return obj;
        }
    }

    ShippingRules.Register.comparator.add('Equal', ShippingRules.Comparator.Equal);
})(Meanbee.ShippingRules);