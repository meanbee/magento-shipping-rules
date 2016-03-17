'use strict';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('.wrapper > .footer > .legality').insertAdjacentHTML('afterend', 'Meanbee\'s Shipping Rules ver. ' + Meanbee.ShippingRules.version +
            ' - <a href="' + Meanbee.ShippingRules.documentation + '" target="_blank">Documentation</a><br>');
        document.getElementById('page-help-link').href = Meanbee.ShippingRules.documentation;
    }, false);
})();
