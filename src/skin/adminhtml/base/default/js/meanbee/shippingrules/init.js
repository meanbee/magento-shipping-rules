'use strict';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let priceField = document.getElementById('price');
        priceField.hidden = true;
        let priceContainer = document.createElement('div');
        priceContainer.classList.add('calculator-tree');
        priceField.parentElement.appendChild(priceContainer);
        window.priceCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Numeric'))('priceCalculator', null, priceContainer);
        window.priceCalc.field = priceField;
        priceContainer.appendChild(window.priceCalc.render());

        let costField = document.getElementById('cost');
        costField.hidden = true;
        let costContainer = document.createElement('div');
        costContainer.classList.add('calculator-tree');
        costField.parentElement.appendChild(costContainer);
        window.costCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Numeric'))('costCalculator', null, costContainer);
        window.costCalc.field = costField;
        costContainer.appendChild(window.costCalc.render());

        let condField = document.getElementById('conditions');
        condField.hidden = true;
        let condContainer = document.createElement('div');
        condContainer.classList.add('calculator-tree');
        condField.parentElement.appendChild(condContainer);
        window.condCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Boolean'))('conditionCalculator', null, condContainer);
        window.condCalc.field = condField;
        condContainer.appendChild(window.condCalc.render());

        function changeHandler (event) {
            if (~['INPUT', 'SELECT'].indexOf(event.target.tagName)) Meanbee.ShippingRules.util.resizeFields();
        }

        document.body.addEventListener('change', changeHandler, false);
        document.body.addEventListener('keyup', changeHandler, false);

        Meanbee.ShippingRules.util.resizeFields();
    });
})();
