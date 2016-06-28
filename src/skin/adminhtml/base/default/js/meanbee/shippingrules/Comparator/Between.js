'use strict';
(function (ShippingRules) {
    ShippingRules.Comparator.Between = class extends ShippingRules.Comparator
    {
        constructor(type) {
            super(type);
        }

        static supportedTypes() {
            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'date', 'time', 'datetime'];
        }

        static name(type) {
            type = type.filter((t => ~this.supportedTypes().indexOf(t)).bind(this));
            switch (type[0]) {
            default:
                return 'IS BETWEEN';
            }
        }
        
        getField() {
            let type = this.type.filter((t => ~this.constructor.supportedTypes().indexOf(t)).bind(this));
            switch (type[0]) {
            case 'number':
            case 'numeric_b10':
                return 'NumberX2';
            case 'numeric_b26':
                return 'NumberBase26X2';
            case 'numeric_b36':
                return 'NumberBase36X2';
            default:
                return 'TextX2';
            }
        }

        toJSON() {
            let obj = super.toJSON();
            obj.key = 'Between';
            return obj;
        }
    }

    ShippingRules.Register.comparator.add('Between', ShippingRules.Comparator.Between);
})(Meanbee.ShippingRules);