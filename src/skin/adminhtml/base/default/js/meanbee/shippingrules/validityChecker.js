'use strict';
(function () {
    document.documentElement.addEventListener('keyup', function (event) {
        if (event.target.validity) {
            if (event.target.validity.valid) {
                event.target.classList.remove('invalid');
                event.target.classList.add('valid');
            } else {
                event.target.classList.remove('valid');
                event.target.classList.add('invalid');
            }
        }
    });
})();
