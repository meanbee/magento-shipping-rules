'use strict';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        window.calc = new window.Meanbee.ShippingRules.Calculator(document.getElementById('priceCont')).render();
        // window.cond = new Meanbee.ShippingRules.ConditionGroup(document.getElementById('condCont')).render();
    });
})();
