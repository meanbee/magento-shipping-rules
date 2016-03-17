'use strict';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let priceField = document.getElementById('price');
        priceField.hidden = true;
        let priceContainer = document.createElement('div');
        priceField.parentElement.appendChild(priceContainer);
        window.priceCalc = new window.Meanbee.ShippingRules.Calculator(priceContainer, priceField, 0).render();

        let costField = document.getElementById('cost');
        costField.hidden = true;
        let costContainer = document.createElement('div');
        costField.parentElement.appendChild(costContainer);
        window.costCalc = new window.Meanbee.ShippingRules.Calculator(costContainer, costField, 1).render();

        function changeHandler (event) {
            if (~['INPUT', 'SELECT'].indexOf(event.target.tagName)) Meanbee.ShippingRules.util.resizeFields();
        }

        document.body.addEventListener('change', changeHandler, false);
        document.body.addEventListener('keyup', changeHandler, false);
    });
})();
