'use strict';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let priceField = document.getElementById('price');
        priceField.hidden = true;
        let priceContainer = document.createElement('ul');
        priceContainer.classList.add('calculator-tree');
        priceField.parentElement.appendChild(priceContainer);
        let priceCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Summative'))('priceCalculator', null, priceContainer);
        priceCalc.field = priceField;
        priceContainer.appendChild(priceCalc.render());

        let costField = document.getElementById('cost');
        costField.hidden = true;
        let costContainer = document.createElement('ul');
        costContainer.classList.add('calculator-tree');
        costField.parentElement.appendChild(costContainer);
        let costCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Summative'))('costCalculator', null, costContainer);
        costCalc.field = costField;
        costContainer.appendChild(costCalc.render());

        let condField = document.getElementById('conditions');
        condField.hidden = true;
        let condContainer = document.createElement('ul');
        condContainer.classList.add('calculator-tree');
        condField.parentElement.appendChild(condContainer);
        let condCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Conjunctive'))('conditionCalculator', null, condContainer);
        condCalc.field = condField;
        condContainer.appendChild(condCalc.render());

        function changeHandler (event) {
            if (~['INPUT', 'SELECT'].indexOf(event.target.tagName)) Meanbee.ShippingRules.util.resizeFields();
        }

        document.body.addEventListener('change', changeHandler, false);
        document.body.addEventListener('keyup', changeHandler, false);

        Meanbee.ShippingRules.util.resizeFields();
    });
})();
