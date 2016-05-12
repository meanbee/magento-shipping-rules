'use strict';
(function () {
    /* Prototype.js implements a polyfill for Function.prototype.bind that is
     * functionally incomplete without checking for a native implementation.
     * this polyfill takes prescedence over Prototype.js's fixing the broken native
     * functionality and polyfilling for unsupporting browsers.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
     */
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        if (this.prototype) {
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        return fBound;
    };

    /* Prototype.js implements a polyfill for Array.prototype.map that is
     * functionally incomplete without checking for a native implementation.
     * this polyfill takes prescedence over Prototype.js's fixing the broken native
     * functionality and polyfilling for unsupporting browsers.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill
     */
    Array.prototype.map = function(callback, thisArg) {
        var T, A, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };

    /* Polyfill for Element.prototype.matches
     * @see http://caniuse.com/#feat=matchesselector
     */
    if (typeof Element.prototype.matches !== 'function') {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
            var element = this;
            var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
            var index = 0;
            while (elements[index] && elements[index] !== element) {
                ++index;
            }
            return Boolean(elements[index]);
        };
    }
    /* Polyfill for Element.prototype.closest
     * @see http://caniuse.com/#feat=element-closest
     */
    if (typeof Element.prototype.closest !== 'function') {
        Element.prototype.closest = function closest(selector) {
            var element = this;
            while (element && element.nodeType === 1) {
                if (element.matches(selector)) {
                    return element;
                }
                element = element.parentNode;
            }
            return null;
        };
    }
})();