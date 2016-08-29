/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	(function () {
	    document.addEventListener('DOMContentLoaded', function () {
	        window.Stretchy.init();
	        var priceField = document.getElementById('price');
	        priceField.hidden = true;
	        var priceContainer = document.createElement('ul');
	        priceContainer.classList.add('calculator-tree');
	        priceField.parentElement.appendChild(priceContainer);
	        var priceCalc = new (Meanbee.ShippingRules.registers.aggregator.get('Summative'))('priceCalculator', null, priceContainer);
	        priceCalc.field = priceField;
	        priceContainer.appendChild(priceCalc.render());
	
	        var costField = document.getElementById('cost');
	        costField.hidden = true;
	        var costContainer = document.createElement('ul');
	        costContainer.classList.add('calculator-tree');
	        costField.parentElement.appendChild(costContainer);
	        var costCalc = new (Meanbee.ShippingRules.registers.aggregator.get('Summative'))('costCalculator', null, costContainer);
	        costCalc.field = costField;
	        costContainer.appendChild(costCalc.render());
	
	        var condField = document.getElementById('conditions');
	        condField.hidden = true;
	        var condContainer = document.createElement('ul');
	        condContainer.classList.add('calculator-tree');
	        condField.parentElement.appendChild(condContainer);
	        var condCalc = new (Meanbee.ShippingRules.registers.aggregator.get('Conjunctive'))('conditionCalculator', null, condContainer);
	        condCalc.field = condField;
	        condContainer.appendChild(condCalc.render());
	
	        Meanbee.ShippingRules.history.pushState();
	    });
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    /* Prototype.js implements a polyfill for `Function.prototype.bind` that is
	     * functionally incomplete without checking for a native implementation.
	     * this polyfill takes prescedence over Prototype.js's fixing the broken native
	     * functionality and polyfilling for unsupporting browsers.
	     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
	     */
	    Function.prototype.bind = function (oThis) {
	        if (typeof this !== 'function') {
	            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	        }
	        var aArgs = Array.prototype.slice.call(arguments, 1),
	            fToBind = this,
	            fNOP = function fNOP() {},
	            fBound = function fBound() {
	            return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
	        };
	        if (this.prototype) {
	            fNOP.prototype = this.prototype;
	        }
	        fBound.prototype = new fNOP();
	        return fBound;
	    };
	
	    /* Prototype.js implements a polyfill for `Array.prototype.map` that is
	     * functionally incomplete without checking for a native implementation.
	     * this polyfill takes prescedence over Prototype.js's fixing the broken native
	     * functionality and polyfilling for unsupporting browsers.
	     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill
	     */
	    Array.prototype.map = function (callback, thisArg) {
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
	
	    /* Polyfill for `Element.prototype.matches`
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
	    /* Polyfill for `Element.prototype.closest`
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
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(4);
	
	var _aggregator = __webpack_require__(5);
	
	var _aggregator2 = _interopRequireDefault(_aggregator);
	
	var _comparator = __webpack_require__(12);
	
	var _comparator2 = _interopRequireDefault(_comparator);
	
	var _condition = __webpack_require__(14);
	
	var _condition2 = _interopRequireDefault(_condition);
	
	var _field = __webpack_require__(16);
	
	var _field2 = _interopRequireDefault(_field);
	
	var _term = __webpack_require__(18);
	
	var _term2 = _interopRequireDefault(_term);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _History = __webpack_require__(20);
	
	var _History2 = _interopRequireDefault(_History);
	
	var _Aggregator = __webpack_require__(7);
	
	var _Aggregator2 = _interopRequireDefault(_Aggregator);
	
	var _Boolean = __webpack_require__(21);
	
	var _Boolean2 = _interopRequireDefault(_Boolean);
	
	var _Numeric = __webpack_require__(22);
	
	var _Numeric2 = _interopRequireDefault(_Numeric);
	
	var _ProductSet = __webpack_require__(23);
	
	var _ProductSet2 = _interopRequireDefault(_ProductSet);
	
	var _Comparator = __webpack_require__(13);
	
	var _Comparator2 = _interopRequireDefault(_Comparator);
	
	var _Between = __webpack_require__(24);
	
	var _Between2 = _interopRequireDefault(_Between);
	
	var _NotBetween = __webpack_require__(25);
	
	var _NotBetween2 = _interopRequireDefault(_NotBetween);
	
	var _Contains = __webpack_require__(26);
	
	var _Contains2 = _interopRequireDefault(_Contains);
	
	var _NotContain = __webpack_require__(27);
	
	var _NotContain2 = _interopRequireDefault(_NotContain);
	
	var _Begins = __webpack_require__(28);
	
	var _Begins2 = _interopRequireDefault(_Begins);
	
	var _NotBegin = __webpack_require__(29);
	
	var _NotBegin2 = _interopRequireDefault(_NotBegin);
	
	var _Ends = __webpack_require__(30);
	
	var _Ends2 = _interopRequireDefault(_Ends);
	
	var _NotEnd = __webpack_require__(31);
	
	var _NotEnd2 = _interopRequireDefault(_NotEnd);
	
	var _Equal = __webpack_require__(32);
	
	var _Equal2 = _interopRequireDefault(_Equal);
	
	var _NotEqual = __webpack_require__(33);
	
	var _NotEqual2 = _interopRequireDefault(_NotEqual);
	
	var _GreaterThan = __webpack_require__(34);
	
	var _GreaterThan2 = _interopRequireDefault(_GreaterThan);
	
	var _GreaterThanOrEqual = __webpack_require__(35);
	
	var _GreaterThanOrEqual2 = _interopRequireDefault(_GreaterThanOrEqual);
	
	var _LessThan = __webpack_require__(36);
	
	var _LessThan2 = _interopRequireDefault(_LessThan);
	
	var _LessThanOrEqual = __webpack_require__(37);
	
	var _LessThanOrEqual2 = _interopRequireDefault(_LessThanOrEqual);
	
	var _MatchesRegEx = __webpack_require__(38);
	
	var _MatchesRegEx2 = _interopRequireDefault(_MatchesRegEx);
	
	var _NotMatchRegEx = __webpack_require__(39);
	
	var _NotMatchRegEx2 = _interopRequireDefault(_NotMatchRegEx);
	
	var _OneOf = __webpack_require__(40);
	
	var _OneOf2 = _interopRequireDefault(_OneOf);
	
	var _NotOneOf = __webpack_require__(41);
	
	var _NotOneOf2 = _interopRequireDefault(_NotOneOf);
	
	var _Condition = __webpack_require__(15);
	
	var _Condition2 = _interopRequireDefault(_Condition);
	
	var _Cart = __webpack_require__(42);
	
	var _Cart2 = _interopRequireDefault(_Cart);
	
	var _Customer = __webpack_require__(43);
	
	var _Customer2 = _interopRequireDefault(_Customer);
	
	var _Destination = __webpack_require__(44);
	
	var _Destination2 = _interopRequireDefault(_Destination);
	
	var _Environment = __webpack_require__(45);
	
	var _Environment2 = _interopRequireDefault(_Environment);
	
	var _PostalCode = __webpack_require__(46);
	
	var _PostalCode2 = _interopRequireDefault(_PostalCode);
	
	var _ProductSubselection = __webpack_require__(48);
	
	var _ProductSubselection2 = _interopRequireDefault(_ProductSubselection);
	
	var _Promotion = __webpack_require__(50);
	
	var _Promotion2 = _interopRequireDefault(_Promotion);
	
	var _Time = __webpack_require__(51);
	
	var _Time2 = _interopRequireDefault(_Time);
	
	var _Field = __webpack_require__(17);
	
	var _Field2 = _interopRequireDefault(_Field);
	
	var _Boolean3 = __webpack_require__(52);
	
	var _Boolean4 = _interopRequireDefault(_Boolean3);
	
	var _Number = __webpack_require__(53);
	
	var _Number2 = _interopRequireDefault(_Number);
	
	var _NumberBase = __webpack_require__(54);
	
	var _NumberBase2 = _interopRequireDefault(_NumberBase);
	
	var _NumberBase3 = __webpack_require__(55);
	
	var _NumberBase4 = _interopRequireDefault(_NumberBase3);
	
	var _Select = __webpack_require__(56);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _Multiselect = __webpack_require__(57);
	
	var _Multiselect2 = _interopRequireDefault(_Multiselect);
	
	var _Text = __webpack_require__(58);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	var _Time3 = __webpack_require__(59);
	
	var _Time4 = _interopRequireDefault(_Time3);
	
	var _CasedText = __webpack_require__(60);
	
	var _CasedText2 = _interopRequireDefault(_CasedText);
	
	var _NumberX = __webpack_require__(61);
	
	var _NumberX2 = _interopRequireDefault(_NumberX);
	
	var _NumberBase26X = __webpack_require__(62);
	
	var _NumberBase26X2 = _interopRequireDefault(_NumberBase26X);
	
	var _NumberBase36X = __webpack_require__(63);
	
	var _NumberBase36X2 = _interopRequireDefault(_NumberBase36X);
	
	var _TextX = __webpack_require__(64);
	
	var _TextX2 = _interopRequireDefault(_TextX);
	
	var _TimeX = __webpack_require__(65);
	
	var _TimeX2 = _interopRequireDefault(_TimeX);
	
	var _NumberList = __webpack_require__(66);
	
	var _NumberList2 = _interopRequireDefault(_NumberList);
	
	var _NumberBase26List = __webpack_require__(67);
	
	var _NumberBase26List2 = _interopRequireDefault(_NumberBase26List);
	
	var _NumberBase36List = __webpack_require__(68);
	
	var _NumberBase36List2 = _interopRequireDefault(_NumberBase36List);
	
	var _Term = __webpack_require__(19);
	
	var _Term2 = _interopRequireDefault(_Term);
	
	var _Conditional = __webpack_require__(69);
	
	var _Conditional2 = _interopRequireDefault(_Conditional);
	
	var _Constant = __webpack_require__(70);
	
	var _Constant2 = _interopRequireDefault(_Constant);
	
	var _ProductSubselection3 = __webpack_require__(49);
	
	var _ProductSubselection4 = _interopRequireDefault(_ProductSubselection3);
	
	__webpack_require__(71);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Stretchy.selectors.filter = '.calculator-tree *';
	window.Stretchy.selectors.base += ', input[type="number"]';
	
	if (!('Meanbee' in window)) window.Meanbee = {};
	if (!('ShippingRules' in Meanbee)) Meanbee.ShippingRules = {};
	
	Meanbee.ShippingRules.registers = {
	    aggregator: _aggregator2.default,
	    comparator: _comparator2.default,
	    condition: _condition2.default,
	    field: _field2.default,
	    term: _term2.default
	};
	
	Meanbee.ShippingRules.history = new _History2.default();
	Meanbee.ShippingRules.util = _util2.default;
	
	Meanbee.ShippingRules.Aggregator = _Aggregator2.default;
	Meanbee.ShippingRules.registers.aggregator.add(_Boolean2.default.CONJUNCTIVE, Meanbee.ShippingRules.Aggregator.Conjunctive = _Boolean2.default);
	Meanbee.ShippingRules.registers.aggregator.add(_Boolean2.default.DISJUNCTIVE, Meanbee.ShippingRules.Aggregator.Disjunctive = _Boolean2.default);
	Meanbee.ShippingRules.registers.aggregator.add('Summative', Meanbee.ShippingRules.Aggregator.Summative = _Numeric2.default);
	Meanbee.ShippingRules.registers.aggregator.add(_ProductSet2.default.INTERSECTIONAL, Meanbee.ShippingRules.Aggregator.Intersectional = _ProductSet2.default);
	Meanbee.ShippingRules.registers.aggregator.add(_ProductSet2.default.UNIONAL, Meanbee.ShippingRules.Aggregator.Unional = _ProductSet2.default);
	
	Meanbee.ShippingRules.Comparator = _Comparator2.default;
	Meanbee.ShippingRules.registers.comparator.add('Between', Meanbee.ShippingRules.Comparator.Between = _Between2.default);
	Meanbee.ShippingRules.registers.comparator.add('NotBetween', Meanbee.ShippingRules.Comparator.NotBetween = _NotBetween2.default);
	Meanbee.ShippingRules.registers.comparator.add('Contains', Meanbee.ShippingRules.Comparator.Contains = _Contains2.default);
	Meanbee.ShippingRules.registers.comparator.add('NotContain', Meanbee.ShippingRules.Comparator.NotContain = _NotContain2.default);
	Meanbee.ShippingRules.registers.comparator.add('Begins', Meanbee.ShippingRules.Comparator.Begins = _Begins2.default);
	Meanbee.ShippingRules.registers.comparator.add('NotBegin', Meanbee.ShippingRules.Comparator.NotBegin = _NotBegin2.default);
	Meanbee.ShippingRules.registers.comparator.add('Ends', Meanbee.ShippingRules.Comparator.Ends = _Ends2.default);
	Meanbee.ShippingRules.registers.comparator.add('NotEnd', Meanbee.ShippingRules.Comparator.NotEnd = _NotEnd2.default);
	Meanbee.ShippingRules.registers.comparator.add('Equal', Meanbee.ShippingRules.Comparator.Equal = _Equal2.default);
	Meanbee.ShippingRules.registers.comparator.add('NotEqual', Meanbee.ShippingRules.Comparator.NotEqual = _NotEqual2.default);
	Meanbee.ShippingRules.registers.comparator.add('GreaterThan', Meanbee.ShippingRules.Comparator.GreaterThan = _GreaterThan2.default);
	Meanbee.ShippingRules.registers.comparator.add('GreaterThanOrEqual', Meanbee.ShippingRules.Comparator.GreaterThanOrEqual = _GreaterThanOrEqual2.default);
	Meanbee.ShippingRules.registers.comparator.add('LessThan', Meanbee.ShippingRules.Comparator.LessThan = _LessThan2.default);
	Meanbee.ShippingRules.registers.comparator.add('LessThanOrEqual', Meanbee.ShippingRules.Comparator.LessThanOrEqual = _LessThanOrEqual2.default);
	Meanbee.ShippingRules.registers.comparator.add('MatchesRegEx', Meanbee.ShippingRules.Comparator.MatchesRegEx = _MatchesRegEx2.default);
	Meanbee.ShippingRules.registers.comparator.add('NotMatchRegEx', Meanbee.ShippingRules.Comparator.NotMatchRegEx = _NotMatchRegEx2.default);
	Meanbee.ShippingRules.registers.comparator.add('OneOf', Meanbee.ShippingRules.Comparator.OneOf = _OneOf2.default);
	Meanbee.ShippingRules.registers.comparator.add('NotOneOf', Meanbee.ShippingRules.Comparator.NotOneOf = _NotOneOf2.default);
	
	Meanbee.ShippingRules.Condition = _Condition2.default;
	Meanbee.ShippingRules.registers.condition.add('Cart', Meanbee.ShippingRules.Condition.Cart = _Cart2.default);
	Meanbee.ShippingRules.registers.condition.add('Customer', Meanbee.ShippingRules.Condition.Customer = _Customer2.default);
	Meanbee.ShippingRules.registers.condition.add('Destination', Meanbee.ShippingRules.Condition.Destination = _Destination2.default);
	Meanbee.ShippingRules.registers.condition.add('Environment', Meanbee.ShippingRules.Condition.Environment = _Environment2.default);
	Meanbee.ShippingRules.registers.condition.add('Destination_PostalCode', Meanbee.ShippingRules.Condition.Destination.PostalCode = _PostalCode2.default);
	Meanbee.ShippingRules.registers.condition.add('Product_Subselection', Meanbee.ShippingRules.Condition.ProductSubselection = _ProductSubselection2.default);
	Meanbee.ShippingRules.registers.condition.add('Promotion', Meanbee.ShippingRules.Condition.Promotion = _Promotion2.default);
	Meanbee.ShippingRules.registers.condition.add('Time', Meanbee.ShippingRules.Condition.Time = _Time2.default);
	
	Meanbee.ShippingRules.Field = _Field2.default;
	Meanbee.ShippingRules.registers.field.add('Boolean', Meanbee.ShippingRules.Field.Boolean = _Boolean4.default);
	Meanbee.ShippingRules.registers.field.add('Number', Meanbee.ShippingRules.Field.Number = _Number2.default);
	Meanbee.ShippingRules.registers.field.add('NumberBase26', Meanbee.ShippingRules.Field.Number.Base26 = _NumberBase2.default);
	Meanbee.ShippingRules.registers.field.add('NumberBase36', Meanbee.ShippingRules.Field.Number.Base36 = _NumberBase4.default);
	Meanbee.ShippingRules.registers.field.add('Select', Meanbee.ShippingRules.Field.Select = _Select2.default);
	Meanbee.ShippingRules.registers.field.add('Multiselect', Meanbee.ShippingRules.Field.Multiselect = _Multiselect2.default);
	Meanbee.ShippingRules.registers.field.add('Text', Meanbee.ShippingRules.Field.Text = _Text2.default);
	Meanbee.ShippingRules.registers.field.add('Time', Meanbee.ShippingRules.Field.Time = _Time4.default);
	Meanbee.ShippingRules.registers.field.add('CasedText', Meanbee.ShippingRules.Field.Text.Cased = _CasedText2.default);
	Meanbee.ShippingRules.registers.field.add('NumberX2', Meanbee.ShippingRules.Field.NumberX2 = _NumberX2.default);
	Meanbee.ShippingRules.registers.field.add('NumberBase26X2', Meanbee.ShippingRules.Field.NumberX2.Base26 = _NumberBase26X2.default);
	Meanbee.ShippingRules.registers.field.add('NumberBase36X2', Meanbee.ShippingRules.Field.NumberX2.Base36 = _NumberBase36X2.default);
	Meanbee.ShippingRules.registers.field.add('TextX2', Meanbee.ShippingRules.Field.TextX2 = _TextX2.default);
	Meanbee.ShippingRules.registers.field.add('TimeX2', Meanbee.ShippingRules.Field.TimeX2 = _TimeX2.default);
	Meanbee.ShippingRules.registers.field.add('NumberList', Meanbee.ShippingRules.Field.Number.List = _NumberList2.default);
	Meanbee.ShippingRules.registers.field.add('NumberBase26List', Meanbee.ShippingRules.Field.Number.Base26.List = _NumberBase26List2.default);
	Meanbee.ShippingRules.registers.field.add('NumberBase36List', Meanbee.ShippingRules.Field.Number.Base36.List = _NumberBase36List2.default);
	
	Meanbee.ShippingRules.Term = _Term2.default;
	Meanbee.ShippingRules.registers.term.add('Constant', Meanbee.ShippingRules.Term.Constant = _Constant2.default);
	Meanbee.ShippingRules.registers.term.add('Conditional', Meanbee.ShippingRules.Term.Condition = _Conditional2.default);
	Meanbee.ShippingRules.registers.term.add('Product_Subselection', Meanbee.ShippingRules.Term.ProductSubselection = _ProductSubselection4.default);
	
	_util2.default.loadData('condition/product_subselection/attributes');
	_util2.default.loadData('condition/destination_postalcode/formats');

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	window.React = {
	    createElement: function createElement(tagName, attributes) {
	        var element = document.createElement(tagName);
	        if (attributes) Object.keys(attributes).forEach(function (attributeName) {
	            if (/^on/.test(attributeName)) {
	                return element.addEventListener(attributeName.slice(2).toLowerCase(), attributes[attributeName]);
	            }
	            element.setAttribute(attributeName, attributes[attributeName]);
	        });
	
	        for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	            children[_key - 2] = arguments[_key];
	        }
	
	        children.forEach(function appendChildren(child) {
	            if (Array.isArray(child)) return child.forEach(appendChildren);
	            if (typeof child === 'string') return element.appendChild(document.createTextNode(child));
	            element.appendChild(child);
	        });
	        return element;
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(6);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Aggregator = __webpack_require__(7);
	
	var _Aggregator2 = _interopRequireDefault(_Aggregator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var aggregatorRegister = new _Register2.default();
	aggregatorRegister.add = function (key, child) {
	    if (!this.has(key) && child.prototype instanceof _Aggregator2.default) {
	        this.children[key] = child;
	    }
	    return this;
	};
	
	exports.default = aggregatorRegister;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Register = function () {
	    function Register() {
	        _classCallCheck(this, Register);
	
	        this.children = {};
	    }
	
	    _createClass(Register, [{
	        key: "remove",
	        value: function remove(key) {
	            var child = this.get(key);
	            delete this.children[key];
	            return child;
	        }
	    }, {
	        key: "has",
	        value: function has(key) {
	            return this.children.hasOwnProperty(key);
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            return this.has(key) && this.children[key];
	        }
	    }, {
	        key: "getAsOptions",
	        value: function getAsOptions() {
	            var _this = this;
	
	            return Object.keys(this.children).map(function (key) {
	                return React.createElement(
	                    "option",
	                    { value: key },
	                    _this.get(key).identifier()
	                );
	            });
	        }
	    }]);
	
	    return Register;
	}();
	
	exports.default = Register;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Base2 = __webpack_require__(8);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Aggregator = function (_Base) {
	    _inherits(Aggregator, _Base);
	
	    function Aggregator(index) {
	        var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	        var container = arguments[2];
	
	        _classCallCheck(this, Aggregator);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Aggregator).call(this, index, parent, container));
	
	        _this.children = [];
	        _this.combinator = null;
	        if (!parent) {
	            if (!Meanbee.ShippingRules.calculators) Meanbee.ShippingRules.calculators = {};
	            Meanbee.ShippingRules.calculators[index] = _this;
	        }
	        return _this;
	    }
	
	    _createClass(Aggregator, [{
	        key: 'removeChildByIndex',
	        value: function removeChildByIndex(index) {
	            this.children.splice(index, 1);
	            this.reindexChildren();
	        }
	    }, {
	        key: 'reindexChildren',
	        value: function reindexChildren() {
	            this.children.forEach(function (child, i) {
	                return child.index = i;
	            });
	            return this;
	        }
	    }, {
	        key: 'sortChildren',
	        value: function sortChildren() {
	            this.children = this.children.sort(function (a, b) {
	                return a.index - b.index;
	            });
	            return this;
	        }
	    }, {
	        key: 'renderChildren',
	        value: function renderChildren() {
	            var me = this;
	            return React.createElement(
	                'ul',
	                null,
	                me.children.map(function (child) {
	                    return child.render();
	                }),
	                me.renderChildSelector()
	            );
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            _get(Object.getPrototypeOf(Aggregator.prototype), 'refresh', this).call(this);
	            this.children.forEach(function (c) {
	                return c.refresh();
	            });
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            _get(Object.getPrototypeOf(Aggregator.prototype), 'init', this).call(this, obj);
	            this.combinator = obj.type;
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                children: this.children,
	                register: 'Aggregator',
	                key: this.combinator
	            };
	        }
	    }]);
	
	    return Aggregator;
	}(_Base3.default);
	
	exports.default = Aggregator;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _navigation = __webpack_require__(9);
	
	var _navigation2 = _interopRequireDefault(_navigation);
	
	var _clipboard = __webpack_require__(10);
	
	var _clipboard2 = _interopRequireDefault(_clipboard);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Base = function () {
	    function Base(index, parent, container) {
	        _classCallCheck(this, Base);
	
	        this.index = index;
	        this.parent = parent;
	        this.container = container;
	    }
	
	    _createClass(Base, [{
	        key: 'init',
	        value: function init() {}
	    }, {
	        key: 'getObjectById',
	        value: function getObjectById(id) {
	            if (this.id === id) {
	                return this;
	            }
	            if (this.aggregator) {
	                var aggregatorResult = this.aggregator.getObjectById(id);
	                if (aggregatorResult) {
	                    return aggregatorResult;
	                }
	            }
	            if (this.term) {
	                var termResult = this.term.getObjectById(id);
	                if (termResult) {
	                    return termResult;
	                }
	            }
	            if (!this.children) {
	                return null;
	            }
	            for (var i = 0; i < this.children.length; i++) {
	                var childResult = this.children[i].getObjectById(id);
	                if (childResult) {
	                    return childResult;
	                }
	            }
	            return null;
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(navDir) {
	            if (this.parent) {
	                document.getElementById(this.id).className += 'deleting';
	                this.parent.removeChildByIndex(this.index);
	                if (navDir > 0) this.focus(this.id);
	                var target = void 0;
	                if ((target = this.parent.children[this.index - 1]) && navDir < 0) {
	                    this.focus(target.id);
	                }
	                this.root.updateJSON();
	                setTimeout(this.root.rerender.bind(this.root), 200);
	                Meanbee.ShippingRules.history.pushState();
	            }
	        }
	    }, {
	        key: 'rerender',
	        value: function rerender() {
	            if (!this.container) return;
	            var focussedElementId = document.activeElement.id;
	            this.container.innerHTML = '';
	            this.container.appendChild(this.render());
	            window.Stretchy.resizeAll();
	            this.focus(focussedElementId);
	            this.root.updateJSON();
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            // NOOP
	        }
	    }, {
	        key: 'updateJSON',
	        value: function updateJSON() {
	            this.root.field.value = JSON.stringify(this.root);
	        }
	    }, {
	        key: 'focus',
	        value: function focus(id) {
	            var element = document.getElementById(id);
	            if (element) {
	                element.focus();
	            }
	        }
	    }, {
	        key: 'renderRemoveButton',
	        value: function renderRemoveButton() {
	            if (this.parent instanceof Base) {
	                return _util2.default.removeButton(this, this.delete.bind(this));
	            }
	            return [];
	        }
	    }, {
	        key: 'keyHandler',
	        value: function keyHandler(event) {
	            if (~['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].indexOf(event.target.tagName)) {
	                if (event.keyCode === 27) {
	                    // Escape
	                    _navigation2.default.escape(event);
	                }
	            } else {
	                switch (event.keyCode) {
	                    case 13:
	                        // Enter
	                        _navigation2.default.firstField(event);
	                        break;
	                    case 27:
	                        // Escape
	                        _navigation2.default.escape(event);
	                        break;
	                    case 37:
	                        // Left Arrow
	                        _navigation2.default.parentTree(event);
	                        break;
	                    case 38:
	                        // Up Arrow
	                        _navigation2.default.previous(event, this);
	                        break;
	                    case 39:
	                        // Right Arrow
	                        _navigation2.default.childTree(event);
	                        break;
	                    case 40:
	                        // Down Arrow
	                        _navigation2.default.next(event, this);
	                        break;
	                    case 45: // Insert
	                    case 59: // Equals [Plus, onshift]
	                    case 61: // Equals [Plus, onshift] (firefox)
	                    case 107: // Add [NumPad]
	                    case 187:
	                        // Equals [Plus, onshift]
	                        _navigation2.default.new(event, this);
	                        break;
	                    case 8: // Backspace
	                    case 46: // Delete
	                    case 109: // Subtract [NumPad]
	                    case 173: // Minus (firefox)
	                    case 189:
	                        // Dash
	                        if (event.target.tagName === 'LI') {
	                            event.preventDefault();
	                            this.root.getObjectById(event.target.id).delete(event.keyCode === 8 ? -1 : +1); // Backspace
	                        }
	                        break;
	                    case 67:
	                        // C
	                        if (event.metaKey || event.ctrlKey) {
	                            // ⌘C | Ctrl-C
	                            if (event.target.tagName === 'LI') {
	                                _clipboard2.default.copy(this.root.getObjectById(event.target.id));
	                            }
	                        }
	                        break;
	                    case 86:
	                        // V
	                        if (event.metaKey || event.ctrlKey) {
	                            // ⌘V | Ctrl-V
	                            event.preventDefault();
	                            if (event.target.tagName === 'LI') {
	                                _clipboard2.default.paste(this.root.getObjectById(event.target.id));
	                            }
	                        }
	                        break;
	                    case 88:
	                        // X
	                        if (event.metaKey || event.ctrlKey) {
	                            // ⌘X | Ctrl-X
	                            event.preventDefault();
	                            if (event.target.tagName === 'LI') {
	                                _clipboard2.default.copy(this.root.getObjectById(event.target.id));
	                                this.root.getObjectById(event.target.id).delete(+1);
	                            }
	                        }
	                        break;
	                    case 89:
	                        // Y
	                        if (event.metaKey || event.ctrlKey) {
	                            // ⌘Y | Ctrl-Y
	                            event.preventDefault();
	                            Meanbee.ShippingRules.history.redo();
	                        }
	                        break;
	                    case 90:
	                        // Z
	                        if (event.metaKey || event.ctrlKey) {
	                            // ⌘Z | Ctrl-Z
	                            event.preventDefault();
	                            Meanbee.ShippingRules.history.undo();
	                        }
	                        break;
	                    default:
	                }
	            }
	            if (event.target.tagName === 'LI') {
	                event.stopPropagation();
	            }
	        }
	    }, {
	        key: 'copyText',
	        value: function copyText(event) {
	            event.clipboardData.setData('text/html', this.toText(event.target, 'rich'));
	            event.preventDefault();
	        }
	    }, {
	        key: 'toText',
	        value: function toText(target, format) {
	            var text = Array.from(target.childNodes).map(function naturalise(node) {
	                if (node instanceof Text) return node.data.trim();
	                if (node instanceof HTMLSelectElement) {
	                    if (node.id.endsWith('-childselector')) return [];
	                    return node.selectedOptions[0].innerText;
	                }
	                if (node instanceof HTMLInputElement) return node.value;
	                if (node instanceof HTMLUListElement) return (format === 'rich' ? '<ul>' : '') + _util2.default.flatten(Array.from(node.childNodes).map(naturalise)).join(' ') + (format === 'rich' ? '</ul>' : '');
	                if (node instanceof HTMLLIElement) return (format === 'rich' ? '<li>' : '\n\t') + _util2.default.flatten(Array.from(node.childNodes).map(naturalise)).join(' ') + (format === 'rich' ? '</li>' : '');
	                return _util2.default.flatten(Array.from(node.childNodes).map(naturalise));
	            }).join(' ').replace(/<li><\/li>/g, '').replace(/>\s</g, '><').replace(/<ul><\/ul>/g, '');
	            return text;
	        }
	    }, {
	        key: 'drag',
	        value: function drag(event) {
	            event.effectAllowed = 'copyMove';
	            event.dataTransfer.setData('calculator', this.root.id);
	            event.dataTransfer.setData('descriptor', JSON.stringify(this));
	            event.dataTransfer.setData('id', this.id);
	            event.dataTransfer.items.add(this.toText(event.target, 'plain'), 'text/plain');
	            event.dataTransfer.items.add(this.toText(event.target, 'rich'), 'text/html');
	            event.stopPropagation();
	        }
	    }, {
	        key: 'drop',
	        value: function drop(event) {
	            event.preventDefault();
	            var index = 0,
	                parent = void 0;
	            if (this.children) {
	                parent = this;
	            } else if (this.aggregator) {
	                parent = this.aggregator;
	            } else if (this.term && this.term.aggregator) {
	                parent = this.term.aggregator;
	            } else {
	                parent = this.parent;
	                index = this.index + 1;
	            }
	            var origin = Meanbee.ShippingRules.calculators[event.dataTransfer.getData('calculator')].getObjectById(event.dataTransfer.getData('id'));
	            var childDesc = JSON.parse(event.dataTransfer.getData('descriptor'));
	            var child = parent.addChild(Meanbee.ShippingRules.registers[childDesc.register.toLowerCase()].get(childDesc.key), index);
	            child.init(childDesc);
	            if (!(event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.dataTransfer.effectAllowed === 'copy')) {
	                origin.delete(0);
	            }
	            this.focus(child.id);
	            this.root.rerender();
	            Meanbee.ShippingRules.history.pushState();
	            event.stopPropagation();
	        }
	    }, {
	        key: 'allowDrop',
	        value: function allowDrop(event) {
	            event.preventDefault();
	            if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
	                event.dataTransfer.dropEffect = 'copy';
	            } else {
	                event.dataTransfer.dropEffect = 'move';
	            }
	        }
	    }, {
	        key: 'dragIn',
	        value: function dragIn(event) {
	            event.target.classList.add('drop-target');
	            event.stopPropagation();
	        }
	    }, {
	        key: 'dragOut',
	        value: function dragOut(event) {
	            event.target.classList.remove('drop-target');
	        }
	    }, {
	        key: 'index',
	        set: function set(param) {
	            this._index = param;
	            return this;
	        },
	        get: function get() {
	            return this._index;
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            if (this.parent instanceof Base) {
	                return this.parent.id + '.' + this.index;
	            } else {
	                return this.index;
	            }
	        }
	    }, {
	        key: 'root',
	        get: function get() {
	            var root = this;
	            while (root.parent instanceof Base) {
	                root = root.parent;
	            }
	            return root;
	        }
	    }, {
	        key: 'context',
	        set: function set(context) {
	            this._context = context;
	            return this;
	        },
	        get: function get() {
	            return this._context || this.parent && this.parent.context;
	        }
	    }, {
	        key: 'field',
	        set: function set(input) {
	            this._field = input;
	            this.init(JSON.parse(input.value || '{}'));
	            return this;
	        },
	        get: function get() {
	            return this._field;
	        }
	    }]);
	
	    return Base;
	}();
	
	exports.default = Base;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    escape: function escape(event) {
	        event.preventDefault();
	        if (~['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].indexOf(event.target.tagName)) {
	            event.target.closest('li').focus();
	        } else {
	            document.body.focus();
	        }
	    },
	    firstField: function firstField(event) {
	        if (event.target.tagName === 'LI') {
	            event.preventDefault();
	            event.target.querySelector('input, select, button, textarea').focus();
	        }
	    },
	    parentTree: function parentTree(event) {
	        if (event.target.tagName === 'LI') {
	            event.preventDefault();
	            if (event.target.parentElement.parentElement.tagName === 'LI') {
	                event.target.parentElement.parentElement.focus();
	            } else if (event.target.parentElement.parentElement.parentElement.tagName === 'LI') {
	                event.target.parentElement.parentElement.parentElement.focus();
	            }
	        }
	    },
	    childTree: function childTree(event) {
	        if (event.target.tagName === 'LI') {
	            event.preventDefault();
	            var i = void 0;
	            if (~(i = Array.from(event.target.children).map(function (child) {
	                return child.tagName;
	            }).indexOf('UL'))) {
	                event.target.children[i].children[0].focus();
	            } else if (~(i = Array.from(event.target.lastChild.children).map(function (child) {
	                return child.tagName;
	            }).indexOf('UL'))) {
	                event.target.lastChild.children[i].children[0].focus();
	            }
	        }
	    },
	    previous: function previous(event, context) {
	        if (event.target.tagName === 'LI') {
	            event.preventDefault();
	            var i = void 0;
	            var treeItems = Array.from(context.root.container.querySelectorAll('li'));
	            i = treeItems.indexOf(event.target);
	            if (treeItems[i - 1]) {
	                treeItems[i - 1].focus();
	            }
	        }
	    },
	    next: function next(event, context) {
	        if (event.target.tagName === 'LI') {
	            event.preventDefault();
	            var i = void 0;
	            var treeItems = Array.from(context.root.container.querySelectorAll('li'));
	            i = treeItems.indexOf(event.target);
	            if (treeItems[i + 1]) {
	                treeItems[i + 1].focus();
	            }
	        }
	    },
	    new: function _new(event, context) {
	        if (event.target.tagName === 'LI') {
	            event.preventDefault();
	            var target = target.root.getObjectById(event.target.id);
	            while (target.children === void 0) {
	                target = target.parent;
	            }
	            context.focus(target.id + '-childselector');
	        }
	    }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    copy: function copy(target) {
	        if (window.Storage) {
	            var targetDescriptor = JSON.stringify(target);
	            window.sessionStorage.meanbeeShippingRulesClipboard = targetDescriptor;
	        }
	    },
	    paste: function paste(target) {
	        if (window.Storage) {
	            var clipboardItemDescriptor = JSON.parse(window.sessionStorage.meanbeeShippingRulesClipboard);
	            var clipboardItem = Meanbee.ShippingRules.registers[clipboardItemDescriptor.register.toLowerCase()].get(clipboardItemDescriptor.key);
	            if (target.aggregator) {
	                target = target.aggregator;
	            }
	            var child = void 0;
	            if (target.children) {
	                child = target.addChild(clipboardItem);
	            }
	            if (!child) {
	                child = (target.parent.children ? target.parent : target.parent.parent).addChild(clipboardItem, target.index);
	            }
	            if (child) {
	                child.init(clipboardItemDescriptor);
	                target.refresh();
	                target.root.rerender();
	                document.getElementById(child.id).focus();
	                Meanbee.ShippingRules.history.pushState();
	            }
	        }
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	ctx.font = 'bold 10.8px sans-serif';
	
	var util = {
	    removeButton: function removeButton(ctx, handler) {
	        return React.createElement('button', { id: ctx.id + '-remove', 'aria-label': 'Remove', type: 'button', 'class': 'remove', onClick: handler });
	    },
	    textWidth: function textWidth(text) {
	        return ctx.measureText(text).width;
	    },
	    loadData: function loadData(path) {
	        if (!('data' in Meanbee.ShippingRules)) Meanbee.ShippingRules.data = {};
	        if (Meanbee.ShippingRules.data[path]) return;
	        var url = Meanbee.ShippingRules.ajaxBasePath + path;
	        var xhr = new XMLHttpRequest();
	        xhr.open('POST', url);
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4 && xhr.status === 200) {
	                Meanbee.ShippingRules.data[path] = JSON.parse(xhr.responseText);
	                if (Meanbee.ShippingRules.calculators) Object.keys(Meanbee.ShippingRules.calculators).forEach(function (calcName) {
	                    Meanbee.ShippingRules.calculators[calcName].rerender();
	                });
	            }
	        };
	        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	        xhr.send('form_key=' + Meanbee.ShippingRules.formKey);
	    },
	    flatten: function flatten(arr) {
	        var _ref;
	
	        var flat = (_ref = []).concat.apply(_ref, _toConsumableArray(arr));
	        return flat.some(Array.isArray) ? flatten(flat) : flat;
	    }
	};
	
	exports.default = util;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(6);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Comparator = __webpack_require__(13);
	
	var _Comparator2 = _interopRequireDefault(_Comparator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var comparatorRegister = new _Register2.default();
	comparatorRegister.add = function (key, child) {
	    if (!this.has(key) && child.prototype instanceof _Comparator2.default) {
	        this.children[key] = child;
	    }
	    return this;
	};
	comparatorRegister.getByType = function (type) {
	    var _this = this;
	
	    return Object.keys(this.children).reduce(function (accumulator, key) {
	        if (_this.children[key].canHandleType(type)) {
	            accumulator[key] = _this.children[key];
	        }
	        return accumulator;
	    }, {});
	};
	comparatorRegister.getAsOptions = function (type, selectedName) {
	    var options = type ? this.getByType(type) : this.children;
	    return Object.keys(options).map(function (key) {
	        var option = React.createElement(
	            'option',
	            { value: key },
	            options[key].identifier(type)
	        );
	        option.selected = options[key].identifier(type) === selectedName;
	        return option;
	    });
	};
	
	exports.default = comparatorRegister;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Comparator = function () {
	    function Comparator(type) {
	        _classCallCheck(this, Comparator);
	
	        this.type = type;
	    }
	
	    _createClass(Comparator, [{
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler(value) {
	            return value;
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                register: 'Comparator'
	            };
	        }
	    }, {
	        key: 'identifier',
	        get: function get() {
	            return this.constructor.identifier(this.type);
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return [];
	        }
	    }, {
	        key: 'canHandleType',
	        value: function canHandleType(type) {
	            for (var i = 0; i < type.length; i++) {
	                var t = type[i];
	                if (~this.supportedTypes().indexOf(t)) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            // eslint-disable-line no-unused-vars
	            return {};
	        }
	    }]);
	
	    return Comparator;
	}();
	
	exports.default = Comparator;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(6);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Condition = __webpack_require__(15);
	
	var _Condition2 = _interopRequireDefault(_Condition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var conditionRegister = new _Register2.default();
	conditionRegister.add = function (key, child) {
	    if (!this.has(key) && child.prototype instanceof _Condition2.default) {
	        this.children[key] = child;
	    }
	    return this;
	};
	conditionRegister.getAsOptions = function (context) {
	    var _this = this;
	
	    var categorised = Object.keys(this.children).map(function (key) {
	        return _defineProperty({}, _this.children[key].getCategory(context), Object.keys(_this.children[key].getVariables(context)).map(function (variable) {
	            return React.createElement(
	                'option',
	                { value: variable, 'data-register-key': key },
	                _this.children[key].getVariables(context)[variable].label
	            );
	        }));
	    }).reduce(function (accumulator, current) {
	        var k = Object.keys(current)[0];
	        if (!current[k].length) return accumulator;
	        return Object.assign(accumulator, accumulator[k] ? _defineProperty({}, k, [].concat(_toConsumableArray(accumulator[k]), _toConsumableArray(current[k]))) : _defineProperty({}, k, current[k]));
	    }, {});
	    return Object.keys(categorised).map(function (category) {
	        return React.createElement(
	            'optgroup',
	            { label: category },
	            categorised[category]
	        );
	    });
	};
	
	exports.default = conditionRegister;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Base2 = __webpack_require__(8);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Condition = function (_Base) {
	    _inherits(Condition, _Base);
	
	    function Condition(index, parent, variable) {
	        _classCallCheck(this, Condition);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Condition).call(this, index, parent));
	
	        _this.variable = variable;
	        var validComparators = Meanbee.ShippingRules.registers.comparator.getByType(_this.type);
	        var comparator = validComparators[Object.keys(validComparators)[0]];
	        _this.comparator = comparator ? new comparator(_this.type) : null;
	        _this.value = '';
	        _this.valueField = comparator ? new (Meanbee.ShippingRules.registers.field.get(_this.comparator.getField()))(_this, _this.value) : null;
	        return _this;
	    }
	
	    _createClass(Condition, [{
	        key: 'renderComparator',
	        value: function renderComparator() {
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.id + '-comparator', onChange: function onChange(event) {
	                        me.comparator = new (Meanbee.ShippingRules.registers.comparator.get(event.target.value))(me.type);
	                        me.refresh();
	                        me.root.rerender();
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                Meanbee.ShippingRules.registers.comparator.getAsOptions(me.type, me.comparator.identifier)
	            );
	        }
	    }, {
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler(value) {
	            this.value = this.comparator.valueChangeHandler(value);
	            this.root.updateJSON();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, tabIndex: 0, onCopy: me.copyText, draggable: 'true', onDragStart: me.drag.bind(me),
	                    onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
	                me.label || ' ',
	                me.renderComparator(),
	                me.valueField.render ? me.valueField.render() : [],
	                me.renderRemoveButton()
	            );
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            _get(Object.getPrototypeOf(Condition.prototype), 'refresh', this).call(this);
	            if (this.type.length) {
	                this.comparator.type = this.type;
	                this.valueField = new (Meanbee.ShippingRules.registers.field.get(this.comparator.getField()))(this, this.value);
	            }
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            this.variable = obj.variable;
	            this.value = obj.value;
	            this.comparator = new (Meanbee.ShippingRules.registers.comparator.get(obj.comparator.key))(this.type);
	            if (this.type.length) this.valueField = new (Meanbee.ShippingRules.registers.field.get(this.comparator.getField()))(this, this.value);
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                register: 'Condition',
	                variable: this.variable,
	                comparator: this.comparator,
	                value: this.value
	            };
	        }
	    }, {
	        key: 'label',
	        get: function get() {
	            var variable = this.constructor.getVariables(this.parent && this.parent.context)[this.variable];
	            return variable ? variable.label : '';
	        }
	    }, {
	        key: 'type',
	        get: function get() {
	            var variable = this.constructor.getVariables(this.parent && this.parent.context)[this.variable];
	            return variable ? variable.type : [];
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            // eslint-disable-line no-unused-vars
	            return null;
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            // eslint-disable-line no-unused-vars
	            return {};
	        }
	    }]);
	
	    return Condition;
	}(_Base3.default);
	
	exports.default = Condition;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(6);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Field = __webpack_require__(17);
	
	var _Field2 = _interopRequireDefault(_Field);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var fieldRegister = new _Register2.default();
	fieldRegister.add = function (key, child) {
	    if (!this.has(key) && child.prototype instanceof _Field2.default) {
	        this.children[key] = child;
	    }
	    return this;
	};
	
	exports.default = fieldRegister;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Field = function () {
	    function Field(condition, value) {
	        _classCallCheck(this, Field);
	
	        this.condition = condition;
	        this.idPrefix = condition ? condition.id : null;
	        this.value = value;
	    }
	
	    _createClass(Field, [{
	        key: "valueChangeHandler",
	        value: function valueChangeHandler(event) {
	            this.value = event.target.value;
	            this.condition.valueChangeHandler(this.value);
	        }
	    }, {
	        key: "root",
	        get: function get() {
	            return this.condition.root;
	        }
	    }]);
	
	    return Field;
	}();
	
	exports.default = Field;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(6);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Term = __webpack_require__(19);
	
	var _Term2 = _interopRequireDefault(_Term);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var termRegister = new _Register2.default();
	termRegister.add = function (key, child) {
	    if (!this.has(key) && child.prototype instanceof _Term2.default) {
	        this.children[key] = child;
	    }
	    return this;
	};
	
	exports.default = termRegister;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Base2 = __webpack_require__(8);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Term = function (_Base) {
	    _inherits(Term, _Base);
	
	    function Term(index, parent) {
	        _classCallCheck(this, Term);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Term).call(this, index, parent));
	
	        _this._value = 0;
	        return _this;
	    }
	
	    _createClass(Term, [{
	        key: 'init',
	        value: function init(obj) {
	            if (obj.register !== 'Term' || Meanbee.ShippingRules.registers.term.get(obj.key) !== this.constructor) {
	                return;
	            }
	            this.combinator = obj.type;
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                register: 'Term',
	                value: this.value
	            };
	        }
	    }, {
	        key: 'value',
	        set: function set(param) {
	            if (!isNaN(parseFloat(param, 10))) {
	                this._value = parseFloat(param, 10);
	            }
	            return this;
	        },
	        get: function get() {
	            return this._value;
	        }
	    }]);
	
	    return Term;
	}(_Base3.default);
	
	exports.default = Term;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var History = function () {
	    function History() {
	        _classCallCheck(this, History);
	
	        this.history = [];
	        this.pointer = 0; // The index of the history array at which new entries should be added.
	    }
	
	    _createClass(History, [{
	        key: "pushState",
	        value: function pushState() {
	            var historyEntry = {};
	            Object.keys(Meanbee.ShippingRules.calculators).forEach(function (calculator) {
	                historyEntry[calculator] = JSON.stringify(Meanbee.ShippingRules.calculators[calculator]);
	            });
	            this.history.length = this.pointer; // Truncate history array removing past-future-present states.
	            this.history[this.pointer] = historyEntry;
	            this.pointer++;
	        }
	    }, {
	        key: "undo",
	        value: function undo() {
	            this.pointer--;
	            var historyEntry = this.history[this.pointer - 1];
	            if (!historyEntry) {
	                this.pointer++;
	                return;
	            }
	            this.renderHistoricState(historyEntry);
	        }
	    }, {
	        key: "redo",
	        value: function redo() {
	            var historyEntry = this.history[this.pointer];
	            if (!historyEntry) {
	                return;
	            }
	            this.pointer++;
	            this.renderHistoricState(historyEntry);
	        }
	    }, {
	        key: "renderHistoricState",
	        value: function renderHistoricState(historyEntry) {
	            Object.keys(historyEntry).forEach(function (calculator) {
	                Meanbee.ShippingRules.calculators[calculator].init(JSON.parse(historyEntry[calculator]));
	                Meanbee.ShippingRules.calculators[calculator].rerender();
	            });
	        }
	    }]);
	
	    return History;
	}();
	
	exports.default = History;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Aggregator2 = __webpack_require__(7);
	
	var _Aggregator3 = _interopRequireDefault(_Aggregator2);
	
	var _Condition = __webpack_require__(15);
	
	var _Condition2 = _interopRequireDefault(_Condition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BooleanAggregator = function (_Aggregator) {
	    _inherits(BooleanAggregator, _Aggregator);
	
	    function BooleanAggregator(index) {
	        var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	        var container = arguments[2];
	
	        _classCallCheck(this, BooleanAggregator);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BooleanAggregator).call(this, index, parent, container));
	
	        _this.combinator = _this.constructor.CONJUNCTIVE;
	        _this.value = true;
	        return _this;
	    }
	
	    _createClass(BooleanAggregator, [{
	        key: 'addChild',
	        value: function addChild(childClass, index) {
	            index = index === void 0 || index === null ? this.children.length : index;
	
	            for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                params[_key - 2] = arguments[_key];
	            }
	
	            var reindex = index !== this.children.length,
	                child = new (Function.prototype.bind.apply(childClass, [null].concat([index, this], params)))();
	            if (child instanceof _Condition2.default || child instanceof this.constructor) {
	                this.children.splice(index, 0, child);
	                if (reindex) this.reindexChildren();
	                return this.children[index];
	            } else {
	                console.warn('ShippingRules: Boolean Aggregators only accept Conditions and Boolean Aggregators: ' + childClass + ' passed.');
	            }
	        }
	    }, {
	        key: 'replaceChildByIndex',
	        value: function replaceChildByIndex(newChildClass, index) {
	            this.removeChildByIndex(index);
	
	            for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	                params[_key2 - 2] = arguments[_key2];
	            }
	
	            this.addChild.apply(this, [newChildClass, index].concat(params));
	            return this;
	        }
	    }, {
	        key: 'renderCombinator',
	        value: function renderCombinator() {
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.id + '-combinator', onChange: function onChange(event) {
	                        me.combinator = event.target.value;
	                        me.root.rerender();
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                [{ label: 'ALL', value: me.constructor.CONJUNCTIVE }, { label: 'ANY', value: me.constructor.DISJUNCTIVE }].map(function (combinator) {
	                    var option = React.createElement(
	                        'option',
	                        { value: combinator.value },
	                        combinator.label
	                    );
	                    if (me.combinator === combinator.value) option.selected = true;
	                    return option;
	                })
	            );
	        }
	    }, {
	        key: 'renderValue',
	        value: function renderValue() {
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.id + '-value', onChange: function onChange(event) {
	                        me.value = !!+event.target.value;
	                        me.root.rerender();
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                [{ label: 'TRUE', value: 1 }, { label: 'FALSE', value: 0 }].map(function (value) {
	                    var option = React.createElement(
	                        'option',
	                        { value: value.value },
	                        value.label
	                    );
	                    if (me.value == value.value) option.selected = true;
	                    return option;
	                })
	            );
	        }
	    }, {
	        key: 'renderChildSelector',
	        value: function renderChildSelector() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id + '.' + me.children.length, onKeyDown: me.keyHandler.bind(me), tabIndex: 0 },
	                React.createElement(
	                    'select',
	                    { id: me.id + '-childselector', 'aria-label': 'Condition', onChange: function onChange(event) {
	                            var selected = event.target.selectedOptions[0];
	                            var registerKey = selected.getAttribute('data-register-key');
	                            var variable = selected.value;
	                            var id = void 0;
	                            if (variable === 'this') {
	                                id = me.addChild(me.constructor).id;
	                            } else {
	                                id = me.addChild(Meanbee.ShippingRules.registers.condition.get(registerKey), void 0, variable).id;
	                            }
	                            me.root.rerender();
	                            me.root.focus(id);
	                            Meanbee.ShippingRules.history.pushState();
	                        } },
	                    React.createElement(
	                        'option',
	                        { disabled: 'disabled', selected: 'selected' },
	                        '[SELECT]'
	                    ),
	                    Meanbee.ShippingRules.registers.condition.getAsOptions(me.context),
	                    React.createElement(
	                        'option',
	                        { value: 'this' },
	                        'Condition Combination'
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, onKeyDown: me.keyHandler.bind(me), onCopy: me.copyText, tabIndex: 0, draggable: 'true',
	                    onDragStart: me.drag.bind(me), onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
	                'If ',
	                me.renderCombinator(),
	                ' of these conditions are ',
	                me.renderValue(),
	                ': ',
	                me.renderRemoveButton(),
	                me.renderChildren()
	            );
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            var _this2 = this;
	
	            _get(Object.getPrototypeOf(BooleanAggregator.prototype), 'init', this).call(this, obj);
	            this.value = typeof obj.value === 'boolean' ? obj.value : true;
	            if (obj.children) {
	                this.children = [];
	                obj.children.forEach(function (child) {
	                    if (child.register === 'Condition') {
	                        _this2.addChild(Meanbee.ShippingRules.registers.condition.get(child.key)).init(child);
	                    } else if (child.register === 'Aggregator') {
	                        _this2.addChild(Meanbee.ShippingRules.registers.aggregator.get(child.key)).init(child);
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(BooleanAggregator.prototype), 'toJSON', this).call(this);
	            obj.value = this.value;
	            return obj;
	        }
	    }, {
	        key: 'combinator',
	        set: function set(param) {
	            if (~[this.constructor.CONJUNCTIVE, this.constructor.DISJUNCTIVE].indexOf(param)) {
	                this._combinator = param;
	            }
	            return this;
	        },
	        get: function get() {
	            return this._combinator;
	        }
	    }]);
	
	    return BooleanAggregator;
	}(_Aggregator3.default);
	
	Object.defineProperties(BooleanAggregator, {
	    CONJUNCTIVE: {
	        value: 'Conjunctive'
	    },
	    DISJUNCTIVE: {
	        value: 'Disjunctive'
	    }
	});
	
	exports.default = BooleanAggregator;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Aggregator2 = __webpack_require__(7);
	
	var _Aggregator3 = _interopRequireDefault(_Aggregator2);
	
	var _Term = __webpack_require__(19);
	
	var _Term2 = _interopRequireDefault(_Term);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Numeric = function (_Aggregator) {
	    _inherits(Numeric, _Aggregator);
	
	    function Numeric(index) {
	        var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	        var container = arguments[2];
	
	        _classCallCheck(this, Numeric);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Numeric).call(this, index, parent, container));
	
	        _this.combinator = 'Summative';
	        return _this;
	    }
	
	    _createClass(Numeric, [{
	        key: 'addChild',
	        value: function addChild(childClass, index) {
	            index = index === void 0 || index === null ? this.children.length : index;
	
	            for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                params[_key - 2] = arguments[_key];
	            }
	
	            var reindex = index !== this.children.length,
	                child = new (Function.prototype.bind.apply(childClass, [null].concat([index, this], params)))();
	            if (child instanceof _Term2.default || child instanceof this.constructor) {
	                this.children.splice(index, 0, child);
	                if (reindex) this.reindexChildren();
	                return this.children[index];
	            } else {
	                console.warn('ShippingRules: Numeric Aggregators only accept Terms and Numeric Aggregators: ' + childClass + ' passed.');
	            }
	        }
	    }, {
	        key: 'replaceChildByIndex',
	        value: function replaceChildByIndex(newChildClass, index) {
	            this.removeChildByIndex(index);
	
	            for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	                params[_key2 - 2] = arguments[_key2];
	            }
	
	            this.addChild.apply(this, [newChildClass, index].concat(params));
	            return this;
	        }
	    }, {
	        key: 'renderChildSelector',
	        value: function renderChildSelector() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id + '.' + me.children.length, onKeyDown: me.keyHandler.bind(me), tabIndex: 0 },
	                React.createElement(
	                    'select',
	                    { id: me.id + '-childselector', 'aria-label': 'Type of value', onChange: function onChange(event) {
	                            var child = event.target.value === 'this' ? me.constructor : Meanbee.ShippingRules.registers.term.get(event.target.value);
	                            var id = me.addChild(child).id;
	                            me.root.rerender();
	                            me.root.focus(id);
	                            Meanbee.ShippingRules.history.pushState();
	                        } },
	                    React.createElement(
	                        'option',
	                        { disabled: 'disabled', selected: 'selected' },
	                        '[SELECT]'
	                    ),
	                    Meanbee.ShippingRules.registers.term.getAsOptions(),
	                    React.createElement(
	                        'option',
	                        { value: 'this' },
	                        'Sum of values'
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, onKeyDown: me.keyHandler.bind(me), onCopy: me.copyText, tabIndex: 0, draggable: 'true',
	                    onDragStart: me.drag.bind(me), onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
	                'Sum of these values: ',
	                me.renderRemoveButton(),
	                me.renderChildren()
	            );
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            var _this2 = this;
	
	            _get(Object.getPrototypeOf(Numeric.prototype), 'init', this).call(this, obj);
	            if (obj.children) {
	                this.children = [];
	                obj.children.forEach(function (child) {
	                    if (child.register === 'Term') {
	                        _this2.addChild(Meanbee.ShippingRules.registers.term.get(child.key)).init(child);
	                    } else if (child.register === 'Aggregator') {
	                        _this2.addChild(Meanbee.ShippingRules.registers.aggregator.get(child.key)).init(child);
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Numeric.prototype), 'toJSON', this).call(this);
	            obj.key = 'Summative';
	            return obj;
	        }
	    }]);
	
	    return Numeric;
	}(_Aggregator3.default);
	
	exports.default = Numeric;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Aggregator2 = __webpack_require__(7);
	
	var _Aggregator3 = _interopRequireDefault(_Aggregator2);
	
	var _Condition = __webpack_require__(15);
	
	var _Condition2 = _interopRequireDefault(_Condition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProductSet = function (_Aggregator) {
	    _inherits(ProductSet, _Aggregator);
	
	    function ProductSet(index) {
	        var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	        var container = arguments[2];
	
	        _classCallCheck(this, ProductSet);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductSet).call(this, index, parent, container));
	
	        _this.combinator = _this.constructor.INTERSECTIONAL;
	        _this.value = true;
	        return _this;
	    }
	
	    _createClass(ProductSet, [{
	        key: 'addChild',
	        value: function addChild(childClass, index) {
	            index = index === void 0 || index === null ? this.children.length : index;
	
	            for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                params[_key - 2] = arguments[_key];
	            }
	
	            var reindex = index !== this.children.length,
	                child = new (Function.prototype.bind.apply(childClass, [null].concat([index, this], params)))();
	            if (child instanceof _Condition2.default || child instanceof this.constructor) {
	                this.children.splice(index, 0, child);
	                if (reindex) this.reindexChildren();
	                return this.children[index];
	            } else {
	                console.warn('Meanbee.ShippingRules: ProductSet Aggregators only accept Conditions and Boolean Aggregators: ' + childClass + ' passed.');
	            }
	        }
	    }, {
	        key: 'replaceChildByIndex',
	        value: function replaceChildByIndex(newChildClass, index) {
	            this.removeChildByIndex(index);
	
	            for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	                params[_key2 - 2] = arguments[_key2];
	            }
	
	            this.addChild.apply(this, [newChildClass, index].concat(params));
	            return this;
	        }
	    }, {
	        key: 'renderCombinator',
	        value: function renderCombinator() {
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.id + '-combinator', onChange: function onChange(event) {
	                        me.combinator = event.target.value;
	                        me.root.rerender();
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                [{ label: 'ALL', value: me.constructor.INTERSECTIONAL }, { label: 'ANY', value: me.constructor.UNIONAL }].map(function (combinator) {
	                    var option = React.createElement(
	                        'option',
	                        { value: combinator.value },
	                        combinator.label
	                    );
	                    if (me.combinator === combinator.value) option.selected = true;
	                    return option;
	                })
	            );
	        }
	    }, {
	        key: 'renderValue',
	        value: function renderValue() {
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.id + '-value', onChange: function onChange(event) {
	                        me.value = !!+event.target.value;
	                        me.root.rerender();
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                [{ label: 'TRUE', value: 1 }, { label: 'FALSE', value: 0 }].map(function (value) {
	                    var option = React.createElement(
	                        'option',
	                        { value: value.value },
	                        value.label
	                    );
	                    if (me.value === value.value) option.selected = true;
	                    return option;
	                })
	            );
	        }
	    }, {
	        key: 'renderChildSelector',
	        value: function renderChildSelector() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id + '.' + me.children.length, onKeyDown: me.keyHandler.bind(me), tabIndex: 0 },
	                React.createElement(
	                    'select',
	                    { id: me.id + '-childselector', 'aria-label': 'Condition', onChange: function onChange(event) {
	                            var selected = event.target.selectedOptions[0];
	                            var registerKey = selected.getAttribute('data-register-key');
	                            var variable = selected.value;
	                            var id = void 0;
	                            if (variable === 'this') {
	                                id = me.addChild(me.constructor).id;
	                            } else {
	                                id = me.addChild(Meanbee.ShippingRules.registers.condition.get(registerKey), void 0, variable).id;
	                            }
	                            me.root.rerender();
	                            me.root.focus(id);
	                            Meanbee.ShippingRules.history.pushState();
	                        } },
	                    React.createElement(
	                        'option',
	                        { disabled: 'disabled', selected: 'selected' },
	                        '[SELECT]'
	                    ),
	                    Meanbee.ShippingRules.registers.condition.getAsOptions(me.context),
	                    React.createElement(
	                        'option',
	                        { value: 'this' },
	                        'Condition Combination'
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, onKeyDown: me.keyHandler.bind(me), onCopy: me.copyText, tabIndex: 0, draggable: 'true',
	                    onDragStart: me.drag.bind(me), onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
	                'If ',
	                me.renderCombinator(),
	                ' of these conditions are ',
	                me.renderValue(),
	                ': ',
	                me.renderRemoveButton(),
	                me.renderChildren()
	            );
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            var _this2 = this;
	
	            _get(Object.getPrototypeOf(ProductSet.prototype), 'init', this).call(this, obj);
	            this.value = typeof obj.value === 'boolean' ? obj.value : true;
	            if (obj.children) {
	                this.children = [];
	                obj.children.forEach(function (child) {
	                    if (child.register === 'Condition') {
	                        _this2.addChild(Meanbee.ShippingRules.registers.condition.get(child.key)).init(child);
	                    } else if (child.register === 'Aggregator') {
	                        _this2.addChild(Meanbee.ShippingRules.registers.aggregator.get(child.key)).init(child);
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(ProductSet.prototype), 'toJSON', this).call(this);
	            obj.value = this.value;
	            return obj;
	        }
	    }, {
	        key: 'combinator',
	        set: function set(param) {
	            if (~[this.constructor.INTERSECTIONAL, this.constructor.UNIONAL].indexOf(param)) {
	                this._combinator = param;
	            }
	            return this;
	        },
	        get: function get() {
	            return this._combinator;
	        }
	    }]);
	
	    return ProductSet;
	}(_Aggregator3.default);
	
	Object.defineProperties(ProductSet, {
	    INTERSECTIONAL: {
	        value: 'Intersectional'
	    },
	    UNIONAL: {
	        value: 'Unional'
	    }
	});
	
	exports.default = ProductSet;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Between = function (_Comparator) {
	    _inherits(Between, _Comparator);
	
	    function Between(type) {
	        _classCallCheck(this, Between);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Between).call(this, type));
	    }
	
	    _createClass(Between, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                    return 'NumberX2';
	                case 'numeric_b26':
	                    return 'NumberBase26X2';
	                case 'numeric_b36':
	                    return 'NumberBase36X2';
	                case 'time':
	                    return 'TimeX2';
	                default:
	                    return 'TextX2';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Between.prototype), 'toJSON', this).call(this);
	            obj.key = 'Between';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'date', 'time', 'datetime'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'IS BETWEEN';
	            }
	        }
	    }]);
	
	    return Between;
	}(_Comparator3.default);
	
	exports.default = Between;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotBetween = function (_Comparator) {
	    _inherits(NotBetween, _Comparator);
	
	    function NotBetween(type) {
	        _classCallCheck(this, NotBetween);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotBetween).call(this, type));
	    }
	
	    _createClass(NotBetween, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                    return 'NumberX2';
	                case 'numeric_b26':
	                    return 'NumberBase26X2';
	                case 'numeric_b36':
	                    return 'NumberBase36X2';
	                case 'time':
	                    return 'TimeX2';
	                default:
	                    return 'TextX2';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(NotBetween.prototype), 'toJSON', this).call(this);
	            obj.key = 'NotBetween';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'date', 'time', 'datetime'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'IS NOT BETWEEN';
	            }
	        }
	    }]);
	
	    return NotBetween;
	}(_Comparator3.default);
	
	exports.default = NotBetween;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Contains = function (_Comparator) {
	    _inherits(Contains, _Comparator);
	
	    function Contains(type) {
	        _classCallCheck(this, Contains);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Contains).call(this, type));
	    }
	
	    _createClass(Contains, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Contains.prototype), 'toJSON', this).call(this);
	            obj.key = 'Contains';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'CONTAINS';
	            }
	        }
	    }]);
	
	    return Contains;
	}(_Comparator3.default);
	
	exports.default = Contains;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotContain = function (_Comparator) {
	    _inherits(NotContain, _Comparator);
	
	    function NotContain(type) {
	        _classCallCheck(this, NotContain);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotContain).call(this, type));
	    }
	
	    _createClass(NotContain, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(NotContain.prototype), 'toJSON', this).call(this);
	            obj.key = 'NotContain';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'DOES NOT CONTAIN';
	            }
	        }
	    }]);
	
	    return NotContain;
	}(_Comparator3.default);
	
	exports.default = NotContain;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Begins = function (_Comparator) {
	    _inherits(Begins, _Comparator);
	
	    function Begins(type) {
	        _classCallCheck(this, Begins);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Begins).call(this, type));
	    }
	
	    _createClass(Begins, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Begins.prototype), 'toJSON', this).call(this);
	            obj.key = 'Begins';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'BEGINS WITH';
	            }
	        }
	    }]);
	
	    return Begins;
	}(_Comparator3.default);
	
	exports.default = Begins;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotBegin = function (_Comparator) {
	    _inherits(NotBegin, _Comparator);
	
	    function NotBegin(type) {
	        _classCallCheck(this, NotBegin);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotBegin).call(this, type));
	    }
	
	    _createClass(NotBegin, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(NotBegin.prototype), 'toJSON', this).call(this);
	            obj.key = 'NotBegin';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'DOES NOT BEGIN WITH';
	            }
	        }
	    }]);
	
	    return NotBegin;
	}(_Comparator3.default);
	
	exports.default = NotBegin;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ends = function (_Comparator) {
	    _inherits(Ends, _Comparator);
	
	    function Ends(type) {
	        _classCallCheck(this, Ends);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Ends).call(this, type));
	    }
	
	    _createClass(Ends, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Ends.prototype), 'toJSON', this).call(this);
	            obj.key = 'Ends';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'ENDS WITH';
	            }
	        }
	    }]);
	
	    return Ends;
	}(_Comparator3.default);
	
	exports.default = Ends;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotEnd = function (_Comparator) {
	    _inherits(NotEnd, _Comparator);
	
	    function NotEnd(type) {
	        _classCallCheck(this, NotEnd);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotEnd).call(this, type));
	    }
	
	    _createClass(NotEnd, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(NotEnd.prototype), 'toJSON', this).call(this);
	            obj.key = 'NotEnd';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'DOES NOT END WITH';
	            }
	        }
	    }]);
	
	    return NotEnd;
	}(_Comparator3.default);
	
	exports.default = NotEnd;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Equal = function (_Comparator) {
	    _inherits(Equal, _Comparator);
	
	    function Equal(type) {
	        _classCallCheck(this, Equal);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Equal).call(this, type));
	    }
	
	    _createClass(Equal, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                    return 'Number';
	                case 'numeric_b26':
	                    return 'NumberBase26';
	                case 'numeric_b36':
	                    return 'NumberBase36';
	                case 'enum':
	                    return 'Select';
	                case 'boolean':
	                    return 'Boolean';
	                case 'time':
	                    return 'Time';
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Equal.prototype), 'toJSON', this).call(this);
	            obj.key = 'Equal';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'string', 'enum', 'date', 'time', 'datetime', 'boolean'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                case 'numeric_b26':
	                case 'numeric_b36':
	                    return 'EQUALS';
	                default:
	                    return 'IS';
	            }
	        }
	    }]);
	
	    return Equal;
	}(_Comparator3.default);
	
	exports.default = Equal;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotEqual = function (_Comparator) {
	    _inherits(NotEqual, _Comparator);
	
	    function NotEqual(type) {
	        _classCallCheck(this, NotEqual);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotEqual).call(this, type));
	    }
	
	    _createClass(NotEqual, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                    return 'Number';
	                case 'numeric_b26':
	                    return 'NumberBase26';
	                case 'numeric_b36':
	                    return 'NumberBase36';
	                case 'enum':
	                    return 'Select';
	                case 'time':
	                    return 'Time';
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(NotEqual.prototype), 'toJSON', this).call(this);
	            obj.key = 'NotEqual';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'string', 'enum', 'date', 'time', 'datetime'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                case 'numeric_b26':
	                case 'numeric_b36':
	                    return 'DOES NOT EQUAL';
	                default:
	                    return 'IS NOT';
	            }
	        }
	    }]);
	
	    return NotEqual;
	}(_Comparator3.default);
	
	exports.default = NotEqual;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GreaterThan = function (_Comparator) {
	    _inherits(GreaterThan, _Comparator);
	
	    function GreaterThan(type) {
	        _classCallCheck(this, GreaterThan);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(GreaterThan).call(this, type));
	    }
	
	    _createClass(GreaterThan, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                    return 'Number';
	                case 'numeric_b26':
	                    return 'NumberBase26';
	                case 'numeric_b36':
	                    return 'NumberBase36';
	                case 'time':
	                    return 'Time';
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(GreaterThan.prototype), 'toJSON', this).call(this);
	            obj.key = 'GreaterThan';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'date', 'time', 'datetime'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'numeric_b10':
	                case 'numeric_b26':
	                case 'numeric_b36':
	                    return 'SUCCEEDS';
	                case 'date':
	                case 'time':
	                case 'datetime':
	                    return 'IS AFTER';
	                default:
	                    return 'IS GREATER THAN';
	            }
	        }
	    }]);
	
	    return GreaterThan;
	}(_Comparator3.default);
	
	exports.default = GreaterThan;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GreaterThanOrEqual = function (_Comparator) {
	    _inherits(GreaterThanOrEqual, _Comparator);
	
	    function GreaterThanOrEqual(type) {
	        _classCallCheck(this, GreaterThanOrEqual);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(GreaterThanOrEqual).call(this, type));
	    }
	
	    _createClass(GreaterThanOrEqual, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                    return 'Number';
	                case 'numeric_b26':
	                    return 'NumberBase26';
	                case 'numeric_b36':
	                    return 'NumberBase36';
	                case 'time':
	                    return 'Time';
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(GreaterThanOrEqual.prototype), 'toJSON', this).call(this);
	            obj.key = 'GreaterThanOrEqual';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'date', 'time', 'datetime'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'numeric_b10':
	                case 'numeric_b26':
	                case 'numeric_b36':
	                    return 'SUCCEEDS OR EQUALS';
	                case 'date':
	                case 'time':
	                case 'datetime':
	                    return 'IS AFTER (INCLUSIVE)';
	                default:
	                    return 'IS GREATER THAN OR EQUALS';
	            }
	        }
	    }]);
	
	    return GreaterThanOrEqual;
	}(_Comparator3.default);
	
	exports.default = GreaterThanOrEqual;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LessThan = function (_Comparator) {
	    _inherits(LessThan, _Comparator);
	
	    function LessThan(type) {
	        _classCallCheck(this, LessThan);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(LessThan).call(this, type));
	    }
	
	    _createClass(LessThan, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                    return 'Number';
	                case 'numeric_b26':
	                    return 'NumberBase26';
	                case 'numeric_b36':
	                    return 'NumberBase36';
	                case 'time':
	                    return 'Time';
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(LessThan.prototype), 'toJSON', this).call(this);
	            obj.key = 'LessThan';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'date', 'time', 'datetime'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'numeric_b10':
	                case 'numeric_b26':
	                case 'numeric_b36':
	                    return 'PRECEEDS';
	                case 'date':
	                case 'time':
	                case 'datetime':
	                    return 'IS BEFORE';
	                default:
	                    return 'IS LESS THAN';
	            }
	        }
	    }]);
	
	    return LessThan;
	}(_Comparator3.default);
	
	exports.default = LessThan;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LessThanOrEqual = function (_Comparator) {
	    _inherits(LessThanOrEqual, _Comparator);
	
	    function LessThanOrEqual(type) {
	        _classCallCheck(this, LessThanOrEqual);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(LessThanOrEqual).call(this, type));
	    }
	
	    _createClass(LessThanOrEqual, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'currency':
	                case 'number':
	                case 'numeric_b10':
	                    return 'Number';
	                case 'numeric_b26':
	                    return 'NumberBase26';
	                case 'numeric_b36':
	                    return 'NumberBase36';
	                case 'time':
	                    return 'Time';
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(LessThanOrEqual.prototype), 'toJSON', this).call(this);
	            obj.key = 'LessThanOrEqual';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['number', 'currency', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'date', 'time', 'datetime'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'numeric_b10':
	                case 'numeric_b26':
	                case 'numeric_b36':
	                    return 'PRECEDES OR EQUALS';
	                case 'date':
	                case 'time':
	                case 'datetime':
	                    return 'IS BEFORE (INCLUSIVE)';
	                default:
	                    return 'IS LESS THAN OR EQUALS';
	            }
	        }
	    }]);
	
	    return LessThanOrEqual;
	}(_Comparator3.default);
	
	exports.default = LessThanOrEqual;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MatchesRegEx = function (_Comparator) {
	    _inherits(MatchesRegEx, _Comparator);
	
	    function MatchesRegEx(type) {
	        _classCallCheck(this, MatchesRegEx);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchesRegEx).call(this, type));
	    }
	
	    _createClass(MatchesRegEx, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'CasedText';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(MatchesRegEx.prototype), 'toJSON', this).call(this);
	            obj.key = 'MatchesRegEx';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'MATCHES REGEX';
	            }
	        }
	    }]);
	
	    return MatchesRegEx;
	}(_Comparator3.default);
	
	exports.default = MatchesRegEx;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotMatchRegEx = function (_Comparator) {
	    _inherits(NotMatchRegEx, _Comparator);
	
	    function NotMatchRegEx(type) {
	        _classCallCheck(this, NotMatchRegEx);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotMatchRegEx).call(this, type));
	    }
	
	    _createClass(NotMatchRegEx, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'CasedText';
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(NotMatchRegEx.prototype), 'toJSON', this).call(this);
	            obj.key = 'NotMatchRegEx';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'DOES NOT MATCH REGEX';
	            }
	        }
	    }]);
	
	    return NotMatchRegEx;
	}(_Comparator3.default);
	
	exports.default = NotMatchRegEx;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var OneOf = function (_Comparator) {
	    _inherits(OneOf, _Comparator);
	
	    function OneOf(type) {
	        _classCallCheck(this, OneOf);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(OneOf).call(this, type));
	    }
	
	    _createClass(OneOf, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'enum':
	                    return 'Multiselect';
	                case 'number':
	                case 'numeric_b10':
	                    return 'NumberList';
	                case 'numeric_b26':
	                    return 'NumberBase26List';
	                case 'numeric_b36':
	                    return 'NumberBase36List';
	                case 'string':
	                    return 'CasedText';
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler(value) {
	            var _this3 = this;
	
	            if (Array.isArray(value)) {
	                return value;
	            }
	            var type = this.type.filter(function (t) {
	                return ~_this3.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            if (type[0] === 'string') {
	                var caseSensitive = value.caseSensitive;
	                value = value.text.split(',').map(function (v) {
	                    return v.trim();
	                });
	                value.caseSensitive = caseSensitive;
	                return value;
	            }
	            return value.split(',').map(function (v) {
	                return v.trim();
	            });
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(OneOf.prototype), 'toJSON', this).call(this);
	            obj.key = 'OneOf';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['enum', 'number', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this4 = this;
	
	            type = type.filter(function (t) {
	                return ~_this4.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'IS ONE OF';
	            }
	        }
	    }]);
	
	    return OneOf;
	}(_Comparator3.default);
	
	exports.default = OneOf;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Comparator2 = __webpack_require__(13);
	
	var _Comparator3 = _interopRequireDefault(_Comparator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotOneOf = function (_Comparator) {
	    _inherits(NotOneOf, _Comparator);
	
	    function NotOneOf(type) {
	        _classCallCheck(this, NotOneOf);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotOneOf).call(this, type));
	    }
	
	    _createClass(NotOneOf, [{
	        key: 'getField',
	        value: function getField() {
	            var _this2 = this;
	
	            var type = this.type.filter(function (t) {
	                return ~_this2.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'enum':
	                    return 'Multiselect';
	                case 'number':
	                case 'numeric_b10':
	                    return 'NumberList';
	                case 'numeric_b26':
	                    return 'NumberBase26List';
	                case 'numeric_b36':
	                    return 'NumberBase36List';
	                case 'string':
	                    return 'CasedText';
	                default:
	                    return 'Text';
	            }
	        }
	    }, {
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler(value) {
	            var _this3 = this;
	
	            if (Array.isArray(value)) {
	                return value;
	            }
	            var type = this.type.filter(function (t) {
	                return ~_this3.constructor.supportedTypes().indexOf(t);
	            }.bind(this));
	            if (type[0] === 'string') {
	                var caseSensitive = value.caseSensitive;
	                value = value.text.split(',').map(function (v) {
	                    return v.trim();
	                });
	                value.caseSensitive = caseSensitive;
	                return value;
	            }
	            return value.split(',').map(function (v) {
	                return v.trim();
	            });
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(NotOneOf.prototype), 'toJSON', this).call(this);
	            obj.key = 'NotOneOf';
	            return obj;
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return ['enum', 'number', 'numeric_b10', 'numeric_b26', 'numeric_b36', 'string'];
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier(type) {
	            var _this4 = this;
	
	            type = type.filter(function (t) {
	                return ~_this4.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                default:
	                    return 'IS NOT ONE OF';
	            }
	        }
	    }]);
	
	    return NotOneOf;
	}(_Comparator3.default);
	
	exports.default = NotOneOf;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Condition2 = __webpack_require__(15);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Cart = function (_Condition) {
	    _inherits(Cart, _Condition);
	
	    function Cart(index, parent, variable) {
	        _classCallCheck(this, Cart);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Cart).call(this, index, parent, variable));
	    }
	
	    _createClass(Cart, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Cart.prototype), 'toJSON', this).call(this);
	            obj.key = 'Cart';
	            return obj;
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            // eslint-disable-line no-unused-vars
	            return 'Cart Conditions';
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            var variables = {};
	            if (!context) {
	                variables['package_weight'] = { label: 'Total Weight', type: ['number'] };
	                variables['package_qty'] = { label: 'Total Items Quantity', type: ['number'] };
	                variables['package_value'] = { label: 'Subtotal excl. Tax', type: ['currency'] };
	                variables['base_subtotal_incl_tax'] = { label: 'Subtotal incl. Tax', type: ['currency'] };
	                variables['package_value_with_discount'] = { label: 'Subtotal after Discount', type: ['currency'] };
	            }
	            return variables;
	        }
	    }]);
	
	    return Cart;
	}(_Condition3.default);
	
	exports.default = Cart;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Condition2 = __webpack_require__(15);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Customer = function (_Condition) {
	    _inherits(Customer, _Condition);
	
	    function Customer(index, parent, variable) {
	        _classCallCheck(this, Customer);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Customer).call(this, index, parent, variable));
	    }
	
	    _createClass(Customer, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Customer.prototype), 'toJSON', this).call(this);
	            obj.key = 'Customer';
	            return obj;
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            // eslint-disable-line no-unused-vars
	            return 'Customer Conditions';
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            var variables = {};
	            if (!context) {
	                variables['customer_group'] = { label: 'Customer Group', type: ['enum'] };
	            }
	            return variables;
	        }
	    }]);
	
	    return Customer;
	}(_Condition3.default);
	
	exports.default = Customer;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Condition2 = __webpack_require__(15);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Destination = function (_Condition) {
	    _inherits(Destination, _Condition);
	
	    function Destination(index, parent, variable) {
	        _classCallCheck(this, Destination);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Destination).call(this, index, parent, variable));
	
	        if (_this.valueField) {
	            _this.valueField.decorator = _this.variable === 'dest_country_id' ? _this.fieldDecorator.bind(_this) : null;
	        }
	        return _this;
	    }
	
	    _createClass(Destination, [{
	        key: 'refresh',
	        value: function refresh() {
	            _get(Object.getPrototypeOf(Destination.prototype), 'refresh', this).call(this);
	            if (this.valueField) {
	                this.valueField.decorator = this.variable === 'dest_country_id' ? this.fieldDecorator.bind(this) : null;
	            }
	        }
	    }, {
	        key: 'fieldDecorator',
	        value: function fieldDecorator(value, label) {
	            var flag = this.toRegionalIndicatorSymbols(value);
	            if (_util2.default.textWidth(flag) < 2 * _util2.default.textWidth('🇦')) {
	                return flag + ' ' + label;
	            } else {
	                return label;
	            }
	        }
	    }, {
	        key: 'toRegionalIndicatorSymbols',
	        value: function toRegionalIndicatorSymbols(plaintext) {
	            var regionalIndicatorSymbols = '',
	                strlen = plaintext.length;
	            for (var i = 0; i < strlen; i++) {
	                // For each character in string
	                var codepoint = plaintext.codePointAt(i);
	                if (codepoint >= 'A'.codePointAt(0) && codepoint <= 'Z'.codePointAt(0)) {
	                    // If character in range A-Z
	                    regionalIndicatorSymbols += String.fromCodePoint(127462 + codepoint - 'A'.codePointAt(0)); // Create character for respective Regional Indicator Symbol
	                } else {
	                    // Else
	                    regionalIndicatorSymbols += plaintext.charAt(i); // Use original character
	                }
	            }
	            return regionalIndicatorSymbols;
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            _get(Object.getPrototypeOf(Destination.prototype), 'init', this).call(this, obj);
	            if (this.valueField) {
	                this.valueField.decorator = this.variable === 'dest_country_id' ? this.fieldDecorator.bind(this) : null;
	            }
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Destination.prototype), 'toJSON', this).call(this);
	            obj.key = 'Destination';
	            return obj;
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            // eslint-disable-line no-unused-vars
	            return 'Destination Conditions';
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            var variables = {};
	            if (!context) {
	                variables['dest_street_address_l1'] = { label: 'Shipping Street Address, Line 1', type: ['string'] };
	                variables['dest_street_address_l2'] = { label: 'Shipping Street Address, Line 2', type: ['string'] };
	                variables['dest_country_id'] = { label: 'Shipping Country', type: ['enum'] };
	                variables['dest_country_group'] = { label: 'Shipping Country Group', type: ['enum'] };
	                variables['dest_region_id'] = { label: 'Shipping State', type: ['enum'] };
	            }
	            return variables;
	        }
	    }]);
	
	    return Destination;
	}(_Condition3.default);
	
	exports.default = Destination;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Condition2 = __webpack_require__(15);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Environment = function (_Condition) {
	    _inherits(Environment, _Condition);
	
	    function Environment(index, parent, variable) {
	        _classCallCheck(this, Environment);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Environment).call(this, index, parent, variable));
	    }
	
	    _createClass(Environment, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Environment.prototype), 'toJSON', this).call(this);
	            obj.key = 'Environment';
	            return obj;
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            // eslint-disable-line no-unused-vars
	            return 'Environment Conditions';
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            var variables = {};
	            if (!context) {
	                variables['store_id'] = { label: 'Magento Store', type: ['enum'] };
	                variables['website_id'] = { label: 'Magento Website', type: ['enum'] };
	                variables['is_admin_order'] = { label: 'Is an admin order?', type: ['boolean'] };
	            }
	            return variables;
	        }
	    }]);
	
	    return Environment;
	}(_Condition3.default);
	
	exports.default = Environment;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Condition2 = __webpack_require__(15);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	var _Boolean = __webpack_require__(21);
	
	var _Boolean2 = _interopRequireDefault(_Boolean);
	
	var _popper = __webpack_require__(47);
	
	var _popper2 = _interopRequireDefault(_popper);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PostalCode = function (_Condition) {
	    _inherits(PostalCode, _Condition);
	
	    function PostalCode(index, parent, variable) {
	        _classCallCheck(this, PostalCode);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PostalCode).call(this, index, parent, variable));
	
	        _this.aggregator = new _Boolean2.default(0, _this);
	        _this.aggregator.context = _this;
	        _this.format = null;
	        return _this;
	    }
	
	    _createClass(PostalCode, [{
	        key: 'fieldDecorator',
	        value: function fieldDecorator(decoration, label) {
	            if (_util2.default.textWidth(decoration) < 2 * _util2.default.textWidth('🇦')) {
	                return decoration + ' ' + label;
	            } else {
	                return label;
	            }
	        }
	    }, {
	        key: 'renderFormatSelector',
	        value: function renderFormatSelector() {
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.id + '-format', onchange: function onchange(event) {
	                        me.format = event.target.value;
	                        me.refresh();
	                        me.root.rerender();
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                React.createElement(
	                    'option',
	                    { disabled: true, selected: !me.format },
	                    '[SELECT]'
	                ),
	                Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].sort(function (a, b) {
	                    return a.label.toUpperCase() < b.label.toUpperCase() ? -1 : 1;
	                }).map(function (format) {
	                    var option = React.createElement(
	                        'option',
	                        { value: format.value, dir: 'rtl' },
	                        me.fieldDecorator(format.decoration, format.label)
	                    );
	                    option.selected = me.format === format.value;
	                    return option;
	                })
	            );
	        }
	    }, {
	        key: 'renderHelp',
	        value: function renderHelp(item) {
	            var _this2 = this;
	
	            item.addEventListener('focus', function () {
	                var popper = void 0;
	                if (popper = item.querySelector('.popper')) {
	                    popper.classList.remove('hidden');
	                } else {
	                    var _ret = function () {
	                        var postalCodeFormatData = Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].filter(function (f) {
	                            return f.value === _this2.format;
	                        });
	                        if (!postalCodeFormatData || !postalCodeFormatData.length) return {
	                                v: void 0
	                            };
	                        var postalCodeFormatDatum = postalCodeFormatData[0];
	                        var help = React.createElement(
	                            'div',
	                            { 'class': 'popper', tabIndex: 0 },
	                            React.createElement(
	                                'div',
	                                { 'class': 'postalcode-full' },
	                                postalCodeFormatDatum.example.map(function (examplePart, index) {
	                                    return React.createElement(
	                                        'span',
	                                        { 'class': 'postalcode-part', 'data-part': index + 1, 'data-type': postalCodeFormatDatum.parts[index + 1] || 'const' },
	                                        examplePart
	                                    );
	                                })
	                            ),
	                            React.createElement('div', { 'class': 'popper__arrow' })
	                        );
	                        item.querySelector('.popper-target').insertAdjacentElement('afterend', help);
	                        _this2._popper = popper = new _popper2.default(item.querySelector('.popper-target'), help, {
	                            placement: 'top',
	                            removeOnDestroy: true
	                        });
	                    }();
	
	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                }
	            }, true);
	            item.addEventListener('blur', function () {
	                Array.from(item.querySelectorAll('.popper')).forEach(function (popper) {
	                    return popper.classList.add('hidden');
	                });
	            }, true);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (this.parent.context instanceof this.constructor) return _get(Object.getPrototypeOf(PostalCode.prototype), 'render', this).call(this);
	            var me = this;
	            if (!(Meanbee.ShippingRules.data && Meanbee.ShippingRules.data['condition/destination_postalcode/formats'])) return React.createElement(
	                'li',
	                { id: me.id },
	                'Loading...'
	            );
	            var item = React.createElement(
	                'li',
	                { id: me.id, onKeyUp: me.keyHandler.bind(me), onCopy: me.copyText, tabIndex: 0, draggable: 'true',
	                    onDragStart: me.drag.bind(me), onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
	                me.label,
	                ' matches the format of',
	                React.createElement(
	                    'span',
	                    { 'class': 'popper-target' },
	                    me.renderFormatSelector()
	                ),
	                React.createElement(
	                    'span',
	                    { id: me.aggregator.id },
	                    'and ',
	                    me.aggregator.renderCombinator(),
	                    ' of these conditions are ',
	                    me.aggregator.renderValue(),
	                    ': ',
	                    me.renderRemoveButton(),
	                    me.aggregator.renderChildren()
	                )
	            );
	            this.renderHelp(item);
	            return item;
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            var me = this;
	            if (me.context instanceof me.constructor) {
	                if (me.variable in me.constructor.getVariables(me.context)) {
	                    (function () {
	                        var validComparators = Meanbee.ShippingRules.registers.comparator.getByType(me.type);
	                        if (Object.keys(validComparators).reduce(function (accumulator, key) {
	                            return accumulator || me.comparator instanceof validComparators[key];
	                        }, false)) {
	                            me.comparator.type = me.type;
	                        } else {
	                            var comparator = validComparators[Object.keys(validComparators)[0]];
	                            me.comparator = comparator ? new comparator(me.type) : null;
	                        }
	                        if (me.comparator) {
	                            me.valueField = new (Meanbee.ShippingRules.registers.field.get(me.comparator.getField()))(me, me.value);
	                        }
	                    })();
	                } else {
	                    me.parent.removeChildByIndex(me.index);
	                }
	            } else {
	                me.aggregator.refresh();
	            }
	            if (me._popper) {
	                me._popper.destroy();
	            }
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            if (this.parent.context instanceof this.constructor) return _get(Object.getPrototypeOf(PostalCode.prototype), 'init', this).call(this, obj);
	            this.variable = obj.variable;
	            this.format = obj.value;
	            this.aggregator.init(obj.aggregator);
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(PostalCode.prototype), 'toJSON', this).call(this);
	            obj.key = 'Destination_PostalCode';
	            obj.aggregator = this.aggregator;
	            obj.value = this.format || this.value;
	            return obj;
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            // eslint-disable-line no-unused-vars
	            if (context instanceof this) return 'Postal Code Conditions';
	            return 'Destination Conditions';
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            var variables = {};
	            if (!context) {
	                variables['dest_postal_code'] = { label: 'Postal Code', type: ['string'] };
	            } else if (context instanceof this && context.format && Meanbee.ShippingRules.data['condition/destination_postalcode/formats']) {
	                var formatData = Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].filter(function (f) {
	                    return f.value === context.format;
	                });
	                if (formatData.length) {
	                    formatData[0].parts.forEach(function (part, index) {
	                        if (part) variables[index ? 'dest_postal_code_part' + index : 'dest_postal_code_full'] = { label: index ? 'Part ' + index : 'Entire Code', type: [part === 'str' ? 'string' : 'numeric_' + part] };
	                    });
	                }
	            }
	            return variables;
	        }
	    }]);
	
	    return PostalCode;
	}(_Condition3.default);
	
	exports.default = PostalCode;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * @fileOverview Kickass library to create and place poppers near their reference elements.
	 * @version {{version}}
	 * @license
	 * Copyright (c) 2016 Federico Zivolo and contributors
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	
	//
	// Cross module loader
	// Supported: Node, AMD, Browser globals
	//
	;(function (root, factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like environments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.Popper = factory();
	    }
	})(undefined, function () {
	
	    'use strict';
	
	    var root = window;
	
	    // default options
	    var DEFAULTS = {
	        // placement of the popper
	        placement: 'bottom',
	
	        gpuAcceleration: true,
	
	        // shift popper from its origin by the given amount of pixels (can be negative)
	        offset: 0,
	
	        // the element which will act as boundary of the popper
	        boundariesElement: 'viewport',
	
	        // amount of pixel used to define a minimum distance between the boundaries and the popper
	        boundariesPadding: 5,
	
	        // popper will try to prevent overflow following this order,
	        // by default, then, it could overflow on the left and on top of the boundariesElement
	        preventOverflowOrder: ['left', 'right', 'top', 'bottom'],
	
	        // the behavior used by flip to change the placement of the popper
	        flipBehavior: 'flip',
	
	        arrowElement: '[x-arrow]',
	
	        // list of functions used to modify the offsets before they are applied to the popper
	        modifiers: ['shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle'],
	
	        modifiersIgnored: []
	    };
	
	    /**
	     * Create a new Popper.js instance
	     * @constructor Popper
	     * @param {HTMLElement} reference - The reference element used to position the popper
	     * @param {HTMLElement|Object} popper
	     *      The HTML element used as popper, or a configuration used to generate the popper.
	     * @param {String} [popper.tagName='div'] The tag name of the generated popper.
	     * @param {Array} [popper.classNames=['popper']] Array of classes to apply to the generated popper.
	     * @param {Array} [popper.attributes] Array of attributes to apply, specify `attr:value` to assign a value to it.
	     * @param {HTMLElement|String} [popper.parent=window.document.body] The parent element, given as HTMLElement or as query string.
	     * @param {String} [popper.content=''] The content of the popper, it can be text, html, or node; if it is not text, set `contentType` to `html` or `node`.
	     * @param {String} [popper.contentType='text'] If `html`, the `content` will be parsed as HTML. If `node`, it will be appended as-is.
	     * @param {String} [popper.arrowTagName='div'] Same as `popper.tagName` but for the arrow element.
	     * @param {Array} [popper.arrowClassNames='popper__arrow'] Same as `popper.classNames` but for the arrow element.
	     * @param {String} [popper.arrowAttributes=['x-arrow']] Same as `popper.attributes` but for the arrow element.
	     * @param {Object} options
	     * @param {String} [options.placement=bottom]
	     *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -right),
	     *      left(-start, -end)`
	     *
	     * @param {HTMLElement|String} [options.arrowElement='[x-arrow]']
	     *      The DOM Node used as arrow for the popper, or a CSS selector used to get the DOM node. It must be child of
	     *      its parent Popper. Popper.js will apply to the given element the style required to align the arrow with its
	     *      reference element.
	     *      By default, it will look for a child node of the popper with the `x-arrow` attribute.
	     *
	     * @param {Boolean} [options.gpuAcceleration=true]
	     *      When this property is set to true, the popper position will be applied using CSS3 translate3d, allowing the
	     *      browser to use the GPU to accelerate the rendering.
	     *      If set to false, the popper will be placed using `top` and `left` properties, not using the GPU.
	     *
	     * @param {Number} [options.offset=0]
	     *      Amount of pixels the popper will be shifted (can be negative).
	     *
	     * @param {String|Element} [options.boundariesElement='viewport']
	     *      The element which will define the boundaries of the popper position, the popper will never be placed outside
	     *      of the defined boundaries (except if `keepTogether` is enabled)
	     *
	     * @param {Number} [options.boundariesPadding=5]
	     *      Additional padding for the boundaries
	     *
	     * @param {Array} [options.preventOverflowOrder=['left', 'right', 'top', 'bottom']]
	     *      Order used when Popper.js tries to avoid overflows from the boundaries, they will be checked in order,
	     *      this means that the last ones will never overflow
	     *
	     * @param {String|Array} [options.flipBehavior='flip']
	     *      The behavior used by the `flip` modifier to change the placement of the popper when the latter is trying to
	     *      overlap its reference element. Defining `flip` as value, the placement will be flipped on
	     *      its axis (`right - left`, `top - bottom`).
	     *      You can even pass an array of placements (eg: `['right', 'left', 'top']` ) to manually specify
	     *      how alter the placement when a flip is needed. (eg. in the above example, it would first flip from right to left,
	     *      then, if even in its new placement, the popper is overlapping its reference element, it will be moved to top)
	     *
	     * @param {Array} [options.modifiers=[ 'shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle']]
	     *      List of functions used to modify the data before they are applied to the popper, add your custom functions
	     *      to this array to edit the offsets and placement.
	     *      The function should reflect the @params and @returns of preventOverflow
	     *
	     * @param {Array} [options.modifiersIgnored=[]]
	     *      Put here any built-in modifier name you want to exclude from the modifiers list
	     *      The function should reflect the @params and @returns of preventOverflow
	     *
	     * @param {Boolean} [options.removeOnDestroy=false]
	     *      Set to true if you want to automatically remove the popper when you call the `destroy` method.
	     */
	    function Popper(reference, popper, options) {
	        this._reference = reference.jquery ? reference[0] : reference;
	        this.state = {};
	
	        // if the popper variable is a configuration object, parse it to generate an HTMLElement
	        // generate a default popper if is not defined
	        var isNotDefined = typeof popper === 'undefined' || popper === null;
	        var isConfig = popper && Object.prototype.toString.call(popper) === '[object Object]';
	        if (isNotDefined || isConfig) {
	            this._popper = this.parse(isConfig ? popper : {});
	        }
	        // otherwise, use the given HTMLElement as popper
	        else {
	                this._popper = popper.jquery ? popper[0] : popper;
	            }
	
	        // with {} we create a new object with the options inside it
	        this._options = Object.assign({}, DEFAULTS, options);
	
	        // refactoring modifiers' list
	        this._options.modifiers = this._options.modifiers.map(function (modifier) {
	            // remove ignored modifiers
	            if (this._options.modifiersIgnored.indexOf(modifier) !== -1) return;
	
	            // set the x-placement attribute before everything else because it could be used to add margins to the popper
	            // margins needs to be calculated to get the correct popper offsets
	            if (modifier === 'applyStyle') {
	                this._popper.setAttribute('x-placement', this._options.placement);
	            }
	
	            // return predefined modifier identified by string or keep the custom one
	            return this.modifiers[modifier] || modifier;
	        }.bind(this));
	
	        // make sure to apply the popper position before any computation
	        this.state.position = this._getPosition(this._popper, this._reference);
	        setStyle(this._popper, { position: this.state.position });
	
	        // determine how we should set the origin of offsets
	        this.state.isParentTransformed = this._getIsParentTransformed(this._popper);
	
	        // fire the first update to position the popper in the right place
	        this.update();
	
	        // setup event listeners, they will take care of update the position in specific situations
	        this._setupEventListeners();
	        return this;
	    }
	
	    //
	    // Methods
	    //
	    /**
	     * Destroy the popper
	     * @method
	     * @memberof Popper
	     */
	    Popper.prototype.destroy = function () {
	        this._popper.removeAttribute('x-placement');
	        this._popper.style.left = '';
	        this._popper.style.position = '';
	        this._popper.style.top = '';
	        this._popper.style[getSupportedPropertyName('transform')] = '';
	        this._removeEventListeners();
	
	        // remove the popper if user explicity asked for the deletion on destroy
	        if (this._options.removeOnDestroy) {
	            this._popper.remove();
	        }
	        return this;
	    };
	
	    /**
	     * Updates the position of the popper, computing the new offsets and applying the new style
	     * @method
	     * @memberof Popper
	     */
	    Popper.prototype.update = function () {
	        var data = { instance: this, styles: {} };
	
	        // store placement inside the data object, modifiers will be able to edit `placement` if needed
	        // and refer to _originalPlacement to know the original value
	        data.placement = this._options.placement;
	        data._originalPlacement = this._options.placement;
	
	        // compute the popper and reference offsets and put them inside data.offsets
	        data.offsets = this._getOffsets(this._popper, this._reference, data.placement);
	
	        // get boundaries
	        data.boundaries = this._getBoundaries(data, this._options.boundariesPadding, this._options.boundariesElement);
	
	        data = this.runModifiers(data, this._options.modifiers);
	
	        if (typeof this.state.updateCallback === 'function') {
	            this.state.updateCallback(data);
	        }
	    };
	
	    /**
	     * If a function is passed, it will be executed after the initialization of popper with as first argument the Popper instance.
	     * @method
	     * @memberof Popper
	     * @param {Function} callback
	     */
	    Popper.prototype.onCreate = function (callback) {
	        // the createCallbacks return as first argument the popper instance
	        callback(this);
	        return this;
	    };
	
	    /**
	     * If a function is passed, it will be executed after each update of popper with as first argument the set of coordinates and informations
	     * used to style popper and its arrow.
	     * NOTE: it doesn't get fired on the first call of the `Popper.update()` method inside the `Popper` constructor!
	     * @method
	     * @memberof Popper
	     * @param {Function} callback
	     */
	    Popper.prototype.onUpdate = function (callback) {
	        this.state.updateCallback = callback;
	        return this;
	    };
	
	    /**
	     * Helper used to generate poppers from a configuration file
	     * @method
	     * @memberof Popper
	     * @param config {Object} configuration
	     * @returns {HTMLElement} popper
	     */
	    Popper.prototype.parse = function (config) {
	        var defaultConfig = {
	            tagName: 'div',
	            classNames: ['popper'],
	            attributes: [],
	            parent: root.document.body,
	            content: '',
	            contentType: 'text',
	            arrowTagName: 'div',
	            arrowClassNames: ['popper__arrow'],
	            arrowAttributes: ['x-arrow']
	        };
	        config = Object.assign({}, defaultConfig, config);
	
	        var d = root.document;
	
	        var popper = d.createElement(config.tagName);
	        addClassNames(popper, config.classNames);
	        addAttributes(popper, config.attributes);
	        if (config.contentType === 'node') {
	            popper.appendChild(config.content.jquery ? config.content[0] : config.content);
	        } else if (config.contentType === 'html') {
	            popper.innerHTML = config.content;
	        } else {
	            popper.textContent = config.content;
	        }
	
	        if (config.arrowTagName) {
	            var arrow = d.createElement(config.arrowTagName);
	            addClassNames(arrow, config.arrowClassNames);
	            addAttributes(arrow, config.arrowAttributes);
	            popper.appendChild(arrow);
	        }
	
	        var parent = config.parent.jquery ? config.parent[0] : config.parent;
	
	        // if the given parent is a string, use it to match an element
	        // if more than one element is matched, the first one will be used as parent
	        // if no elements are matched, the script will throw an error
	        if (typeof parent === 'string') {
	            parent = d.querySelectorAll(config.parent);
	            if (parent.length > 1) {
	                console.warn('WARNING: the given `parent` query(' + config.parent + ') matched more than one element, the first one will be used');
	            }
	            if (parent.length === 0) {
	                throw 'ERROR: the given `parent` doesn\'t exists!';
	            }
	            parent = parent[0];
	        }
	        // if the given parent is a DOM nodes list or an array of nodes with more than one element,
	        // the first one will be used as parent
	        if (parent.length > 1 && parent instanceof Element === false) {
	            console.warn('WARNING: you have passed as parent a list of elements, the first one will be used');
	            parent = parent[0];
	        }
	
	        // append the generated popper to its parent
	        parent.appendChild(popper);
	
	        return popper;
	
	        /**
	         * Adds class names to the given element
	         * @function
	         * @ignore
	         * @param {HTMLElement} target
	         * @param {Array} classes
	         */
	        function addClassNames(element, classNames) {
	            classNames.forEach(function (className) {
	                element.classList.add(className);
	            });
	        }
	
	        /**
	         * Adds attributes to the given element
	         * @function
	         * @ignore
	         * @param {HTMLElement} target
	         * @param {Array} attributes
	         * @example
	         * addAttributes(element, [ 'data-info:foobar' ]);
	         */
	        function addAttributes(element, attributes) {
	            attributes.forEach(function (attribute) {
	                element.setAttribute(attribute.split(':')[0], attribute.split(':')[1] || '');
	            });
	        }
	    };
	
	    /**
	     * Helper used to get the position which will be applied to the popper
	     * @method
	     * @memberof Popper
	     * @param config {HTMLElement} popper element
	     * @returns {HTMLElement} reference element
	     */
	    Popper.prototype._getPosition = function (popper, reference) {
	        var container = getOffsetParent(reference);
	
	        // Decide if the popper will be fixed
	        // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
	        var isParentFixed = isFixed(reference, container);
	        return isParentFixed ? 'fixed' : 'absolute';
	    };
	
	    /**
	     * Helper used to determine if the popper's parent is transformed.
	     * @param  {[type]} popper [description]
	     * @return {[type]}        [description]
	     */
	    Popper.prototype._getIsParentTransformed = function (popper) {
	        return isTransformed(popper.parentNode);
	    };
	
	    /**
	     * Get offsets to the popper
	     * @method
	     * @memberof Popper
	     * @access private
	     * @param {Element} popper - the popper element
	     * @param {Element} reference - the reference element (the popper will be relative to this)
	     * @returns {Object} An object containing the offsets which will be applied to the popper
	     */
	    Popper.prototype._getOffsets = function (popper, reference, placement) {
	        placement = placement.split('-')[0];
	        var popperOffsets = {};
	
	        popperOffsets.position = this.state.position;
	        var isParentFixed = popperOffsets.position === 'fixed';
	
	        var isParentTransformed = this.state.isParentTransformed;
	
	        //
	        // Get reference element position
	        //
	        var offsetParent = isParentFixed && isParentTransformed ? getOffsetParent(reference) : getOffsetParent(popper);
	        var referenceOffsets = getOffsetRectRelativeToCustomParent(reference, offsetParent, isParentFixed, isParentTransformed);
	
	        //
	        // Get popper sizes
	        //
	        var popperRect = getOuterSizes(popper);
	
	        //
	        // Compute offsets of popper
	        //
	
	        // depending by the popper placement we have to compute its offsets slightly differently
	        if (['right', 'left'].indexOf(placement) !== -1) {
	            popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - popperRect.height / 2;
	            if (placement === 'left') {
	                popperOffsets.left = referenceOffsets.left - popperRect.width;
	            } else {
	                popperOffsets.left = referenceOffsets.right;
	            }
	        } else {
	            popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
	            if (placement === 'top') {
	                popperOffsets.top = referenceOffsets.top - popperRect.height;
	            } else {
	                popperOffsets.top = referenceOffsets.bottom;
	            }
	        }
	
	        // Add width and height to our offsets object
	        popperOffsets.width = popperRect.width;
	        popperOffsets.height = popperRect.height;
	
	        return {
	            popper: popperOffsets,
	            reference: referenceOffsets
	        };
	    };
	
	    /**
	     * Setup needed event listeners used to update the popper position
	     * @method
	     * @memberof Popper
	     * @access private
	     */
	    Popper.prototype._setupEventListeners = function () {
	        // NOTE: 1 DOM access here
	        this.state.updateBound = this.update.bind(this);
	        root.addEventListener('resize', this.state.updateBound);
	        // if the boundariesElement is window we don't need to listen for the scroll event
	        if (this._options.boundariesElement !== 'window') {
	            var target = getScrollParent(this._reference);
	            // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
	            if (target === root.document.body || target === root.document.documentElement) {
	                target = root;
	            }
	            target.addEventListener('scroll', this.state.updateBound);
	        }
	    };
	
	    /**
	     * Remove event listeners used to update the popper position
	     * @method
	     * @memberof Popper
	     * @access private
	     */
	    Popper.prototype._removeEventListeners = function () {
	        // NOTE: 1 DOM access here
	        root.removeEventListener('resize', this.state.updateBound);
	        if (this._options.boundariesElement !== 'window') {
	            var target = getScrollParent(this._reference);
	            // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
	            if (target === root.document.body || target === root.document.documentElement) {
	                target = root;
	            }
	            target.removeEventListener('scroll', this.state.updateBound);
	        }
	        this.state.updateBound = null;
	    };
	
	    /**
	     * Computed the boundaries limits and return them
	     * @method
	     * @memberof Popper
	     * @access private
	     * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
	     * @param {Number} padding - Boundaries padding
	     * @param {Element} boundariesElement - Element used to define the boundaries
	     * @returns {Object} Coordinates of the boundaries
	     */
	    Popper.prototype._getBoundaries = function (data, padding, boundariesElement) {
	        // NOTE: 1 DOM access here
	        var boundaries = {};
	        var width, height;
	        if (boundariesElement === 'window') {
	            var body = root.document.body,
	                html = root.document.documentElement;
	
	            height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	            width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
	
	            boundaries = {
	                top: 0,
	                right: width,
	                bottom: height,
	                left: 0
	            };
	        } else if (boundariesElement === 'viewport') {
	            var offsetParent = getOffsetParent(this._popper);
	            var scrollParent = getScrollParent(this._popper);
	            var offsetParentRect = getOffsetRect(offsetParent);
	
	            // if the popper is fixed we don't have to substract scrolling from the boundaries
	            var scrollTop = data.offsets.popper.position === 'fixed' ? 0 : scrollParent.scrollTop;
	            var scrollLeft = data.offsets.popper.position === 'fixed' ? 0 : scrollParent.scrollLeft;
	
	            boundaries = {
	                top: 0 - (offsetParentRect.top - scrollTop),
	                right: root.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
	                bottom: root.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
	                left: 0 - (offsetParentRect.left - scrollLeft)
	            };
	        } else {
	            if (getOffsetParent(this._popper) === boundariesElement) {
	                boundaries = {
	                    top: 0,
	                    left: 0,
	                    right: boundariesElement.clientWidth,
	                    bottom: boundariesElement.clientHeight
	                };
	            } else {
	                boundaries = getOffsetRect(boundariesElement);
	            }
	        }
	        boundaries.left += padding;
	        boundaries.right -= padding;
	        boundaries.top = boundaries.top + padding;
	        boundaries.bottom = boundaries.bottom - padding;
	        return boundaries;
	    };
	
	    /**
	     * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
	     * @method
	     * @memberof Popper
	     * @access public
	     * @param {Object} data
	     * @param {Array} modifiers
	     * @param {Function} ends
	     */
	    Popper.prototype.runModifiers = function (data, modifiers, ends) {
	        var modifiersToRun = modifiers.slice();
	        if (ends !== undefined) {
	            modifiersToRun = this._options.modifiers.slice(0, getArrayKeyIndex(this._options.modifiers, ends));
	        }
	
	        modifiersToRun.forEach(function (modifier) {
	            if (isFunction(modifier)) {
	                data = modifier.call(this, data);
	            }
	        }.bind(this));
	
	        return data;
	    };
	
	    /**
	     * Helper used to know if the given modifier depends from another one.
	     * @method
	     * @memberof Popper
	     * @returns {Boolean}
	     */
	
	    Popper.prototype.isModifierRequired = function (requesting, requested) {
	        var index = getArrayKeyIndex(this._options.modifiers, requesting);
	        return !!this._options.modifiers.slice(0, index).filter(function (modifier) {
	            return modifier === requested;
	        }).length;
	    };
	
	    //
	    // Modifiers
	    //
	
	    /**
	     * Modifiers list
	     * @namespace Popper.modifiers
	     * @memberof Popper
	     * @type {Object}
	     */
	    Popper.prototype.modifiers = {};
	
	    /**
	     * Apply the computed styles to the popper element
	     * @method
	     * @memberof Popper.modifiers
	     * @argument {Object} data - The data object generated by `update` method
	     * @returns {Object} The same data object
	     */
	    Popper.prototype.modifiers.applyStyle = function (data) {
	        // apply the final offsets to the popper
	        // NOTE: 1 DOM access here
	        var styles = {
	            position: data.offsets.popper.position
	        };
	
	        // round top and left to avoid blurry text
	        var left = Math.round(data.offsets.popper.left);
	        var top = Math.round(data.offsets.popper.top);
	
	        // if gpuAcceleration is set to true and transform is supported, we use `translate3d` to apply the position to the popper
	        // we automatically use the supported prefixed version if needed
	        var prefixedProperty;
	        if (this._options.gpuAcceleration && (prefixedProperty = getSupportedPropertyName('transform'))) {
	            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
	            styles.top = 0;
	            styles.left = 0;
	        }
	        // othwerise, we use the standard `left` and `top` properties
	        else {
	                styles.left = left;
	                styles.top = top;
	            }
	
	        // any property present in `data.styles` will be applied to the popper,
	        // in this way we can make the 3rd party modifiers add custom styles to it
	        // Be aware, modifiers could override the properties defined in the previous
	        // lines of this modifier!
	        Object.assign(styles, data.styles);
	
	        setStyle(this._popper, styles);
	
	        // set an attribute which will be useful to style the tooltip (use it to properly position its arrow)
	        // NOTE: 1 DOM access here
	        this._popper.setAttribute('x-placement', data.placement);
	
	        // if the arrow modifier is required and the arrow style has been computed, apply the arrow style
	        if (this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) && data.offsets.arrow) {
	            setStyle(data.arrowElement, data.offsets.arrow);
	        }
	
	        return data;
	    };
	
	    /**
	     * Modifier used to shift the popper on the start or end of its reference element side
	     * @method
	     * @memberof Popper.modifiers
	     * @argument {Object} data - The data object generated by `update` method
	     * @returns {Object} The data object, properly modified
	     */
	    Popper.prototype.modifiers.shift = function (data) {
	        var placement = data.placement;
	        var basePlacement = placement.split('-')[0];
	        var shiftVariation = placement.split('-')[1];
	
	        // if shift shiftVariation is specified, run the modifier
	        if (shiftVariation) {
	            var reference = data.offsets.reference;
	            var popper = getPopperClientRect(data.offsets.popper);
	
	            var shiftOffsets = {
	                y: {
	                    start: { top: reference.top },
	                    end: { top: reference.top + reference.height - popper.height }
	                },
	                x: {
	                    start: { left: reference.left },
	                    end: { left: reference.left + reference.width - popper.width }
	                }
	            };
	
	            var axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';
	
	            data.offsets.popper = Object.assign(popper, shiftOffsets[axis][shiftVariation]);
	        }
	
	        return data;
	    };
	
	    /**
	     * Modifier used to make sure the popper does not overflows from it's boundaries
	     * @method
	     * @memberof Popper.modifiers
	     * @argument {Object} data - The data object generated by `update` method
	     * @returns {Object} The data object, properly modified
	     */
	    Popper.prototype.modifiers.preventOverflow = function (data) {
	        var order = this._options.preventOverflowOrder;
	        var popper = getPopperClientRect(data.offsets.popper);
	
	        var check = {
	            left: function left() {
	                var left = popper.left;
	                if (popper.left < data.boundaries.left) {
	                    left = Math.max(popper.left, data.boundaries.left);
	                }
	                return { left: left };
	            },
	            right: function right() {
	                var left = popper.left;
	                if (popper.right > data.boundaries.right) {
	                    left = Math.min(popper.left, data.boundaries.right - popper.width);
	                }
	                return { left: left };
	            },
	            top: function top() {
	                var top = popper.top;
	                if (popper.top < data.boundaries.top) {
	                    top = Math.max(popper.top, data.boundaries.top);
	                }
	                return { top: top };
	            },
	            bottom: function bottom() {
	                var top = popper.top;
	                if (popper.bottom > data.boundaries.bottom) {
	                    top = Math.min(popper.top, data.boundaries.bottom - popper.height);
	                }
	                return { top: top };
	            }
	        };
	
	        order.forEach(function (direction) {
	            data.offsets.popper = Object.assign(popper, check[direction]());
	        });
	
	        return data;
	    };
	
	    /**
	     * Modifier used to make sure the popper is always near its reference
	     * @method
	     * @memberof Popper.modifiers
	     * @argument {Object} data - The data object generated by _update method
	     * @returns {Object} The data object, properly modified
	     */
	    Popper.prototype.modifiers.keepTogether = function (data) {
	        var popper = getPopperClientRect(data.offsets.popper);
	        var reference = data.offsets.reference;
	        var f = Math.floor;
	
	        if (popper.right < f(reference.left)) {
	            data.offsets.popper.left = f(reference.left) - popper.width;
	        }
	        if (popper.left > f(reference.right)) {
	            data.offsets.popper.left = f(reference.right);
	        }
	        if (popper.bottom < f(reference.top)) {
	            data.offsets.popper.top = f(reference.top) - popper.height;
	        }
	        if (popper.top > f(reference.bottom)) {
	            data.offsets.popper.top = f(reference.bottom);
	        }
	
	        return data;
	    };
	
	    /**
	     * Modifier used to flip the placement of the popper when the latter is starting overlapping its reference element.
	     * Requires the `preventOverflow` modifier before it in order to work.
	     * **NOTE:** This modifier will run all its previous modifiers everytime it tries to flip the popper!
	     * @method
	     * @memberof Popper.modifiers
	     * @argument {Object} data - The data object generated by _update method
	     * @returns {Object} The data object, properly modified
	     */
	    Popper.prototype.modifiers.flip = function (data) {
	        // check if preventOverflow is in the list of modifiers before the flip modifier.
	        // otherwise flip would not work as expected.
	        if (!this.isModifierRequired(this.modifiers.flip, this.modifiers.preventOverflow)) {
	            console.warn('WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!');
	            return data;
	        }
	
	        if (data.flipped && data.placement === data._originalPlacement) {
	            // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
	            return data;
	        }
	
	        var placement = data.placement.split('-')[0];
	        var placementOpposite = getOppositePlacement(placement);
	        var variation = data.placement.split('-')[1] || '';
	
	        var flipOrder = [];
	        if (this._options.flipBehavior === 'flip') {
	            flipOrder = [placement, placementOpposite];
	        } else {
	            flipOrder = this._options.flipBehavior;
	        }
	
	        flipOrder.forEach(function (step, index) {
	            if (placement !== step || flipOrder.length === index + 1) {
	                return;
	            }
	
	            placement = data.placement.split('-')[0];
	            placementOpposite = getOppositePlacement(placement);
	
	            var popperOffsets = getPopperClientRect(data.offsets.popper);
	
	            // this boolean is used to distinguish right and bottom from top and left
	            // they need different computations to get flipped
	            var a = ['right', 'bottom'].indexOf(placement) !== -1;
	
	            // using Math.floor because the reference offsets may contain decimals we are not going to consider here
	            if (a && Math.floor(data.offsets.reference[placement]) > Math.floor(popperOffsets[placementOpposite]) || !a && Math.floor(data.offsets.reference[placement]) < Math.floor(popperOffsets[placementOpposite])) {
	                // we'll use this boolean to detect any flip loop
	                data.flipped = true;
	                data.placement = flipOrder[index + 1];
	                if (variation) {
	                    data.placement += '-' + variation;
	                }
	                data.offsets.popper = this._getOffsets(this._popper, this._reference, data.placement).popper;
	
	                data = this.runModifiers(data, this._options.modifiers, this._flip);
	            }
	        }.bind(this));
	        return data;
	    };
	
	    /**
	     * Modifier used to add an offset to the popper, useful if you more granularity positioning your popper.
	     * The offsets will shift the popper on the side of its reference element.
	     * @method
	     * @memberof Popper.modifiers
	     * @argument {Object} data - The data object generated by _update method
	     * @returns {Object} The data object, properly modified
	     */
	    Popper.prototype.modifiers.offset = function (data) {
	        var offset = this._options.offset;
	        var popper = data.offsets.popper;
	
	        if (data.placement.indexOf('left') !== -1) {
	            popper.top -= offset;
	        } else if (data.placement.indexOf('right') !== -1) {
	            popper.top += offset;
	        } else if (data.placement.indexOf('top') !== -1) {
	            popper.left -= offset;
	        } else if (data.placement.indexOf('bottom') !== -1) {
	            popper.left += offset;
	        }
	        return data;
	    };
	
	    /**
	     * Modifier used to move the arrows on the edge of the popper to make sure them are always between the popper and the reference element
	     * It will use the CSS outer size of the arrow element to know how many pixels of conjuction are needed
	     * @method
	     * @memberof Popper.modifiers
	     * @argument {Object} data - The data object generated by _update method
	     * @returns {Object} The data object, properly modified
	     */
	    Popper.prototype.modifiers.arrow = function (data) {
	        var arrow = this._options.arrowElement;
	
	        // if the arrowElement is a string, suppose it's a CSS selector
	        if (typeof arrow === 'string') {
	            arrow = this._popper.querySelector(arrow);
	        }
	
	        // if arrow element is not found, don't run the modifier
	        if (!arrow) {
	            return data;
	        }
	
	        // the arrow element must be child of its popper
	        if (!this._popper.contains(arrow)) {
	            console.warn('WARNING: `arrowElement` must be child of its popper element!');
	            return data;
	        }
	
	        // arrow depends on keepTogether in order to work
	        if (!this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)) {
	            console.warn('WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!');
	            return data;
	        }
	
	        var arrowStyle = {};
	        var placement = data.placement.split('-')[0];
	        var popper = getPopperClientRect(data.offsets.popper);
	        var reference = data.offsets.reference;
	        var isVertical = ['left', 'right'].indexOf(placement) !== -1;
	
	        var len = isVertical ? 'height' : 'width';
	        var side = isVertical ? 'top' : 'left';
	        var altSide = isVertical ? 'left' : 'top';
	        var opSide = isVertical ? 'bottom' : 'right';
	        var arrowSize = getOuterSizes(arrow)[len];
	
	        //
	        // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
	        //
	
	        // top/left side
	        if (reference[opSide] - arrowSize < popper[side]) {
	            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
	        }
	        // bottom/right side
	        if (reference[side] + arrowSize > popper[opSide]) {
	            data.offsets.popper[side] += reference[side] + arrowSize - popper[opSide];
	        }
	
	        // compute center of the popper
	        var center = reference[side] + reference[len] / 2 - arrowSize / 2;
	
	        // Compute the sideValue using the updated popper offsets
	        var sideValue = center - getPopperClientRect(data.offsets.popper)[side];
	
	        // prevent arrow from being placed not contiguously to its popper
	        sideValue = Math.max(Math.min(popper[len] - arrowSize, sideValue), 0);
	        arrowStyle[side] = sideValue;
	        arrowStyle[altSide] = ''; // make sure to remove any old style from the arrow
	
	        data.offsets.arrow = arrowStyle;
	        data.arrowElement = arrow;
	
	        return data;
	    };
	
	    //
	    // Helpers
	    //
	
	    /**
	     * Get the outer sizes of the given element (offset size + margins)
	     * @function
	     * @ignore
	     * @argument {Element} element
	     * @returns {Object} object containing width and height properties
	     */
	    function getOuterSizes(element) {
	        // NOTE: 1 DOM access here
	        var _display = element.style.display,
	            _visibility = element.style.visibility;
	        element.style.display = 'block';element.style.visibility = 'hidden';
	        var calcWidthToForceRepaint = element.offsetWidth;
	
	        // original method
	        var styles = root.getComputedStyle(element);
	        var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
	        var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
	        var result = { width: element.offsetWidth + y, height: element.offsetHeight + x };
	
	        // reset element styles
	        element.style.display = _display;element.style.visibility = _visibility;
	        return result;
	    }
	
	    /**
	     * Get the opposite placement of the given one/
	     * @function
	     * @ignore
	     * @argument {String} placement
	     * @returns {String} flipped placement
	     */
	    function getOppositePlacement(placement) {
	        var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
	        return placement.replace(/left|right|bottom|top/g, function (matched) {
	            return hash[matched];
	        });
	    }
	
	    /**
	     * Given the popper offsets, generate an output similar to getBoundingClientRect
	     * @function
	     * @ignore
	     * @argument {Object} popperOffsets
	     * @returns {Object} ClientRect like output
	     */
	    function getPopperClientRect(popperOffsets) {
	        var offsets = Object.assign({}, popperOffsets);
	        offsets.right = offsets.left + offsets.width;
	        offsets.bottom = offsets.top + offsets.height;
	        return offsets;
	    }
	
	    /**
	     * Given an array and the key to find, returns its index
	     * @function
	     * @ignore
	     * @argument {Array} arr
	     * @argument keyToFind
	     * @returns index or null
	     */
	    function getArrayKeyIndex(arr, keyToFind) {
	        var i = 0,
	            key;
	        for (key in arr) {
	            if (arr[key] === keyToFind) {
	                return i;
	            }
	            i++;
	        }
	        return null;
	    }
	
	    /**
	     * Get CSS computed property of the given element
	     * @function
	     * @ignore
	     * @argument {Eement} element
	     * @argument {String} property
	     */
	    function getStyleComputedProperty(element, property) {
	        // NOTE: 1 DOM access here
	        var css = root.getComputedStyle(element, null);
	        return css[property];
	    }
	
	    /**
	     * Returns the offset parent of the given element
	     * @function
	     * @ignore
	     * @argument {Element} element
	     * @returns {Element} offset parent
	     */
	    function getOffsetParent(element) {
	        // NOTE: 1 DOM access here
	        var offsetParent = element.offsetParent;
	        return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
	    }
	
	    /**
	     * Returns the scrolling parent of the given element
	     * @function
	     * @ignore
	     * @argument {Element} element
	     * @returns {Element} offset parent
	     */
	    function getScrollParent(element) {
	        if (element === root.document) {
	            // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
	            // greater than 0 and return the proper element
	            if (root.document.body.scrollTop) {
	                return root.document.body;
	            } else {
	                return root.document.documentElement;
	            }
	        }
	
	        // Firefox want us to check `-x` and `-y` variations as well
	        if (['scroll', 'auto'].indexOf(getStyleComputedProperty(element, 'overflow')) !== -1 || ['scroll', 'auto'].indexOf(getStyleComputedProperty(element, 'overflow-x')) !== -1 || ['scroll', 'auto'].indexOf(getStyleComputedProperty(element, 'overflow-y')) !== -1) {
	            return element;
	        }
	        return element.parentNode ? getScrollParent(element.parentNode) : element;
	    }
	
	    /**
	     * Check if the given element is fixed or is inside a fixed parent
	     * @function
	     * @ignore
	     * @argument {Element} element
	     * @argument {Element} customContainer
	     * @returns {Boolean} answer to "isFixed?"
	     */
	    function isFixed(element) {
	        if (element === root.document.body) {
	            return false;
	        }
	        if (getStyleComputedProperty(element, 'position') === 'fixed') {
	            return true;
	        }
	        return element.parentNode ? isFixed(element.parentNode) : element;
	    }
	
	    /**
	     * Check if the given element has transforms applied to itself or a parent
	     * @param  {Element} element
	     * @return {Boolean} answer to "isTransformed?"
	     */
	    function isTransformed(element) {
	        if (element === root.document.body) {
	            return false;
	        }
	        if (getStyleComputedProperty(element, 'transform') !== 'none') {
	            return true;
	        }
	        return element.parentNode ? isTransformed(element.parentNode) : element;
	    }
	
	    /**
	     * Set the style to the given popper
	     * @function
	     * @ignore
	     * @argument {Element} element - Element to apply the style to
	     * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
	     */
	    function setStyle(element, styles) {
	        function is_numeric(n) {
	            return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
	        }
	        Object.keys(styles).forEach(function (prop) {
	            var unit = '';
	            // add unit if the value is numeric and is one of the following
	            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
	                unit = 'px';
	            }
	            element.style[prop] = styles[prop] + unit;
	        });
	    }
	
	    /**
	     * Check if the given variable is a function
	     * @function
	     * @ignore
	     * @argument {Element} element - Element to check
	     * @returns {Boolean} answer to: is a function?
	     */
	    function isFunction(functionToCheck) {
	        var getType = {};
	        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	    }
	
	    /**
	     * Get the position of the given element, relative to its offset parent
	     * @function
	     * @ignore
	     * @param {Element} element
	     * @return {Object} position - Coordinates of the element and its `scrollTop`
	     */
	    function getOffsetRect(element) {
	        var elementRect = {
	            width: element.offsetWidth,
	            height: element.offsetHeight,
	            left: element.offsetLeft,
	            top: element.offsetTop
	        };
	
	        elementRect.right = elementRect.left + elementRect.width;
	        elementRect.bottom = elementRect.top + elementRect.height;
	
	        // position
	        return elementRect;
	    }
	
	    /**
	     * Get bounding client rect of given element
	     * @function
	     * @ignore
	     * @param {HTMLElement} element
	     * @return {Object} client rect
	     */
	    function getBoundingClientRect(element) {
	        var rect = element.getBoundingClientRect();
	        return {
	            left: rect.left,
	            top: rect.top,
	            right: rect.right,
	            bottom: rect.bottom,
	            width: rect.right - rect.left,
	            height: rect.bottom - rect.top
	        };
	    }
	
	    /**
	     * Given an element and one of its parents, return the offset
	     * @function
	     * @ignore
	     * @param {HTMLElement} element
	     * @param {HTMLElement} parent
	     * @return {Object} rect
	     */
	    function getOffsetRectRelativeToCustomParent(element, parent, fixed, transformed) {
	        var elementRect = getBoundingClientRect(element);
	        var parentRect = getBoundingClientRect(parent);
	
	        if (fixed && !transformed) {
	            var scrollParent = getScrollParent(parent);
	            parentRect.top += scrollParent.scrollTop;
	            parentRect.bottom += scrollParent.scrollTop;
	            parentRect.left += scrollParent.scrollLeft;
	            parentRect.right += scrollParent.scrollLeft;
	        }
	
	        var rect = {
	            top: elementRect.top - parentRect.top,
	            left: elementRect.left - parentRect.left,
	            bottom: elementRect.top - parentRect.top + elementRect.height,
	            right: elementRect.left - parentRect.left + elementRect.width,
	            width: elementRect.width,
	            height: elementRect.height
	        };
	        return rect;
	    }
	
	    /**
	     * Get the prefixed supported property name
	     * @function
	     * @ignore
	     * @argument {String} property (camelCase)
	     * @returns {String} prefixed property (camelCase)
	     */
	    function getSupportedPropertyName(property) {
	        var prefixes = ['', 'ms', 'webkit', 'moz', 'o'];
	
	        for (var i = 0; i < prefixes.length; i++) {
	            var toCheck = prefixes[i] ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) : property;
	            if (typeof root.document.body.style[toCheck] !== 'undefined') {
	                return toCheck;
	            }
	        }
	        return null;
	    }
	
	    /**
	     * The Object.assign() method is used to copy the values of all enumerable own properties from one or more source
	     * objects to a target object. It will return the target object.
	     * This polyfill doesn't support symbol properties, since ES5 doesn't have symbols anyway
	     * Source: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	     * @function
	     * @ignore
	     */
	    if (!Object.assign) {
	        Object.defineProperty(Object, 'assign', {
	            enumerable: false,
	            configurable: true,
	            writable: true,
	            value: function value(target) {
	                if (target === undefined || target === null) {
	                    throw new TypeError('Cannot convert first argument to object');
	                }
	
	                var to = Object(target);
	                for (var i = 1; i < arguments.length; i++) {
	                    var nextSource = arguments[i];
	                    if (nextSource === undefined || nextSource === null) {
	                        continue;
	                    }
	                    nextSource = Object(nextSource);
	
	                    var keysArray = Object.keys(nextSource);
	                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	                        var nextKey = keysArray[nextIndex];
	                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	                        if (desc !== undefined && desc.enumerable) {
	                            to[nextKey] = nextSource[nextKey];
	                        }
	                    }
	                }
	                return to;
	            }
	        });
	    }
	
	    return Popper;
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Condition2 = __webpack_require__(15);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	var _ProductSubselection = __webpack_require__(49);
	
	var _ProductSubselection2 = _interopRequireDefault(_ProductSubselection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProductSubselection = function (_Condition) {
	    _inherits(ProductSubselection, _Condition);
	
	    function ProductSubselection(index, parent, variable) {
	        _classCallCheck(this, ProductSubselection);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductSubselection).call(this, index, parent, variable));
	
	        _this.term = new _ProductSubselection2.default(0, _this);
	        _this.term.aggregator.context = _this;
	        return _this;
	    }
	
	    _createClass(ProductSubselection, [{
	        key: 'render',
	        value: function render() {
	            if (this.parent.context instanceof this.constructor || this.parent.context instanceof _ProductSubselection2.default) return _get(Object.getPrototypeOf(ProductSubselection.prototype), 'render', this).call(this);
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, onKeyDown: me.keyHandler.bind(me), onCopy: me.copyText, tabIndex: 0, draggable: 'true',
	                    onDragStart: me.drag.bind(me), onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
	                'If sum of ',
	                me.term.renderAttributeSelector(),
	                ' ',
	                me.renderComparator(),
	                ' ',
	                me.valueField.render ? me.valueField.render() : [],
	                ' for a subselection of items in cart where ',
	                me.term.aggregator.renderCombinator(),
	                ' of these conditions are ',
	                me.term.aggregator.renderValue(),
	                ': ',
	                me.renderRemoveButton(),
	                me.term.aggregator.renderChildren()
	            );
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            _get(Object.getPrototypeOf(ProductSubselection.prototype), 'refresh', this).call(this);
	            this.term.refresh();
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            _get(Object.getPrototypeOf(ProductSubselection.prototype), 'init', this).call(this, obj);
	            if (this.parent.context instanceof this.constructor || this.parent.context instanceof _ProductSubselection2.default) return;
	            this.term.init(obj.term);
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(ProductSubselection.prototype), 'toJSON', this).call(this);
	            obj.key = 'Product_Subselection';
	            obj.term = this.term;
	            return obj;
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            if (context instanceof this || context instanceof _ProductSubselection2.default) return 'Product Attributes';
	            return 'Product Conditions';
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            var variables = {};
	            if (!context) {
	                variables['product_subselection'] = { label: 'Product Subselection', type: ['number'] };
	            } else if ((context instanceof this || context instanceof _ProductSubselection2.default) && Meanbee.ShippingRules.data['condition/product_subselection/attributes']) {
	                variables = Object.assign(variables, Meanbee.ShippingRules.data['condition/product_subselection/attributes']);
	            }
	            return variables;
	        }
	    }, {
	        key: 'identifier',
	        value: function identifier() {
	            return 'Product Subselection';
	        }
	    }]);
	
	    return ProductSubselection;
	}(_Condition3.default);
	
	exports.default = ProductSubselection;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Term2 = __webpack_require__(19);
	
	var _Term3 = _interopRequireDefault(_Term2);
	
	var _ProductSet = __webpack_require__(23);
	
	var _ProductSet2 = _interopRequireDefault(_ProductSet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProductSubselection = function (_Term) {
	    _inherits(ProductSubselection, _Term);
	
	    function ProductSubselection(index, parent) {
	        _classCallCheck(this, ProductSubselection);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductSubselection).call(this, index, parent));
	
	        _this.aggregator = new _ProductSet2.default(0, _this);
	        _this.aggregator.context = _this;
	        _this.value = 1;
	        _this.attribute = null;
	        return _this;
	    }
	
	    _createClass(ProductSubselection, [{
	        key: 'renderValue',
	        value: function renderValue() {
	            var me = this;
	            return React.createElement('input', { id: me.id + '-value', type: 'number', value: me.value, onCopy: me.copyText, onKeyDown: function onKeyDown(event) {
	                    return me.value = event.target.value;
	                }, onChange: function onChange(event) {
	                    me.value = event.target.value;
	                    me.root.rerender();
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }, {
	        key: 'renderAttributeSelector',
	        value: function renderAttributeSelector() {
	            var me = this;
	            if (!Meanbee.ShippingRules.data['condition/product_subselection/attributes']) return React.createElement('select', { id: me.id + '-attribute' });
	            return React.createElement(
	                'select',
	                { id: me.id + '-attribute', onChange: function onChange(event) {
	                        me.attribute = event.target.value;
	                        me.root.rerender();
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                React.createElement(
	                    'option',
	                    { disabled: 'disabled', selected: 'selected' },
	                    '[SELECT]'
	                ),
	                Object.keys(Meanbee.ShippingRules.data['condition/product_subselection/attributes']).filter(function (id) {
	                    return ~Meanbee.ShippingRules.data['condition/product_subselection/attributes'][id].type.indexOf('number');
	                }).map(function (id) {
	                    var option = React.createElement(
	                        'option',
	                        { value: id },
	                        Meanbee.ShippingRules.data['condition/product_subselection/attributes'][id].label
	                    );
	                    if (me.attribute === id) option.selected = true;
	                    return option;
	                })
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, onKeyDown: me.keyHandler.bind(me), tabIndex: 0, draggable: 'true', onDragStart: me.drag.bind(me),
	                    onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
	                'Sum of ',
	                me.renderAttributeSelector(),
	                ' ✕ ',
	                me.renderValue(),
	                ' for a subselection of items in cart where ',
	                me.aggregator.renderCombinator(),
	                ' of these conditions are ',
	                me.aggregator.renderValue(),
	                ': ',
	                me.renderRemoveButton(),
	                me.aggregator.renderChildren()
	            );
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            _get(Object.getPrototypeOf(ProductSubselection.prototype), 'refresh', this).call(this);
	            this.aggregator.refresh();
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            this.attribute = obj.attribute;
	            this.value = obj.value;
	            this.aggregator.init(obj.aggregator);
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(ProductSubselection.prototype), 'toJSON', this).call(this);
	            obj.key = 'Product_Subselection';
	            obj.attribute = this.attribute;
	            obj.aggregator = this.aggregator;
	            return obj;
	        }
	    }], [{
	        key: 'identifier',
	        value: function identifier() {
	            return 'Product Subselection';
	        }
	    }]);
	
	    return ProductSubselection;
	}(_Term3.default);
	
	exports.default = ProductSubselection;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Condition2 = __webpack_require__(15);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Promotion = function (_Condition) {
	    _inherits(Promotion, _Condition);
	
	    function Promotion(index, parent, variable) {
	        _classCallCheck(this, Promotion);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Promotion).call(this, index, parent, variable));
	    }
	
	    _createClass(Promotion, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Promotion.prototype), 'toJSON', this).call(this);
	            obj.key = 'Promotion';
	            return obj;
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            // eslint-disable-line no-unused-vars
	            return 'Promotion Conditions';
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            var variables = {};
	            if (!context) {
	                variables['promo_free_shipping'] = { label: 'Free Shipping', type: ['boolean'] };
	                variables['promo_coupon_code'] = { label: 'Coupon', type: ['enum'] };
	                variables['promo_applied_rule_ids'] = { label: 'Applied Cart Price Rules', type: ['enum'] };
	            }
	            return variables;
	        }
	    }]);
	
	    return Promotion;
	}(_Condition3.default);
	
	exports.default = Promotion;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Condition2 = __webpack_require__(15);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Time = function (_Condition) {
	    _inherits(Time, _Condition);
	
	    function Time(index, parent, variable) {
	        _classCallCheck(this, Time);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Time).call(this, index, parent, variable));
	    }
	
	    _createClass(Time, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Time.prototype), 'toJSON', this).call(this);
	            obj.key = 'Time';
	            return obj;
	        }
	    }], [{
	        key: 'getCategory',
	        value: function getCategory(context) {
	            // eslint-disable-line no-unused-vars
	            return 'Time Conditions';
	        }
	    }, {
	        key: 'getVariables',
	        value: function getVariables(context) {
	            var variables = {};
	            if (!context) {
	                variables['time_time_of_day'] = { label: 'Time of Day', type: ['time'] };
	                variables['time_day_of_week'] = { label: 'Day of Week', type: ['enum'] };
	            }
	            return variables;
	        }
	    }]);
	
	    return Time;
	}(_Condition3.default);
	
	exports.default = Time;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BooleanField = function (_Field) {
	    _inherits(BooleanField, _Field);
	
	    function BooleanField(condition, value) {
	        _classCallCheck(this, BooleanField);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(BooleanField).call(this, condition, value));
	    }
	
	    _createClass(BooleanField, [{
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.idPrefix + '-value', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                [{ value: 1, label: 'TRUE' }, { value: 0, label: 'FALSE' }].map(function (optionDesc) {
	                    var option = React.createElement(
	                        'option',
	                        { value: optionDesc.value },
	                        optionDesc.label
	                    );
	                    if (optionDesc.value === me.value) option.selected = true;
	                    return option;
	                })
	            );
	        }
	    }]);
	
	    return BooleanField;
	}(_Field3.default);
	
	exports.default = BooleanField;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Number = function (_Field) {
	    _inherits(Number, _Field);
	
	    function Number() {
	        _classCallCheck(this, Number);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Number).apply(this, arguments));
	    }
	
	    _createClass(Number, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement("input", { type: "number", id: me.idPrefix + "-value", value: me.value, onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }]);
	
	    return Number;
	}(_Field3.default);
	
	exports.default = Number;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberBase26 = function (_Field) {
	    _inherits(NumberBase26, _Field);
	
	    function NumberBase26() {
	        _classCallCheck(this, NumberBase26);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBase26).apply(this, arguments));
	    }
	
	    _createClass(NumberBase26, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement("input", { type: "text", id: me.idPrefix + "-value", pattern: "[A-Z]", value: me.value, onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }, {
	        key: "valueChangeHandler",
	        value: function valueChangeHandler(event) {
	            event.target.value = event.target.value.toUpperCase();
	            _get(Object.getPrototypeOf(NumberBase26.prototype), "valueChangeHandler", this).call(this, event);
	        }
	    }]);
	
	    return NumberBase26;
	}(_Field3.default);
	
	exports.default = NumberBase26;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberBase36 = function (_Field) {
	    _inherits(NumberBase36, _Field);
	
	    function NumberBase36() {
	        _classCallCheck(this, NumberBase36);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBase36).apply(this, arguments));
	    }
	
	    _createClass(NumberBase36, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement("input", { type: "text", id: me.idPrefix + "-value", pattern: "[0-9A-Z]", value: me.value, onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }, {
	        key: "valueChangeHandler",
	        value: function valueChangeHandler(event) {
	            event.target.value = event.target.value.toUpperCase();
	            _get(Object.getPrototypeOf(NumberBase36.prototype), "valueChangeHandler", this).call(this, event);
	        }
	    }]);
	
	    return NumberBase36;
	}(_Field3.default);
	
	exports.default = NumberBase36;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Select = function (_Field) {
	    _inherits(Select, _Field);
	
	    function Select(condition, value) {
	        _classCallCheck(this, Select);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, condition, value));
	
	        var conditionDescriptor = condition.toJSON();
	        _this.dataKey = conditionDescriptor.register.toLowerCase() + '/' + conditionDescriptor.key.toLowerCase() + '/options/' + condition.variable;
	        _util2.default.loadData(_this.dataKey);
	        return _this;
	    }
	
	    _createClass(Select, [{
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.idPrefix + '-value', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                Meanbee.ShippingRules.data[me.dataKey] ? Meanbee.ShippingRules.data[me.dataKey].map(function (optionDesc) {
	                    var option = React.createElement(
	                        'option',
	                        { value: optionDesc.value },
	                        me.decorator ? me.decorator(optionDesc.value, optionDesc.label) : optionDesc.label
	                    );
	                    if (optionDesc.value == me.value) option.selected = true;
	                    return option;
	                }) : []
	            );
	        }
	    }]);
	
	    return Select;
	}(_Field3.default);
	
	exports.default = Select;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	var _util = __webpack_require__(11);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Multiselect = function (_Field) {
	    _inherits(Multiselect, _Field);
	
	    function Multiselect(condition, value) {
	        _classCallCheck(this, Multiselect);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Multiselect).call(this, condition, value));
	
	        var conditionDescriptor = condition.toJSON();
	        _this.dataKey = conditionDescriptor.register.toLowerCase() + '/' + conditionDescriptor.key.toLowerCase() + '/options/' + condition.variable;
	        _util2.default.loadData(_this.dataKey);
	        return _this;
	    }
	
	    _createClass(Multiselect, [{
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'span',
	                { id: me.idPrefix + '-value-container' },
	                React.createElement(
	                    'select',
	                    { id: me.idPrefix + '-value', multiple: 'multiple', size: '5', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                            me.valueChangeHandler(event);
	                            Meanbee.ShippingRules.history.pushState();
	                        } },
	                    Meanbee.ShippingRules.data[me.dataKey] ? Meanbee.ShippingRules.data[me.dataKey].map(function (optionDesc) {
	                        var option = React.createElement(
	                            'option',
	                            { value: optionDesc.value },
	                            me.decorator ? me.decorator(optionDesc.value, optionDesc.label) : optionDesc.label
	                        );
	                        if (me.value.indexOf(optionDesc.value)) option.selected = true;
	                        return option;
	                    }) : []
	                ),
	                React.createElement(
	                    'output',
	                    { id: me.idPrefix + '-value-output', onClick: function onClick() {
	                            return document.getElementById(me.idPrefix + '-value').focus();
	                        } },
	                    function () {
	                        return (Meanbee.ShippingRules.data[me.dataKey] ? Meanbee.ShippingRules.data[me.dataKey].filter(function (optionDesc) {
	                            return ~me.value.indexOf(optionDesc.value + '');
	                        }).map(function (optionDesc) {
	                            return me.decorator ? me.decorator(optionDesc.value, optionDesc.label) : optionDesc.label;
	                        }).join(', ') : '') || '[SELECT]';
	                    }()
	                )
	            );
	        }
	    }, {
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler() {
	            var _this2 = this;
	
	            this.value = Array.from(document.getElementById(this.idPrefix + '-value').selectedOptions).map(function (option) {
	                return option.value;
	            });
	            this.condition.valueChangeHandler(this.value);
	            document.getElementById(this.idPrefix + '-value-output').innerHTML = (Meanbee.ShippingRules.data[this.dataKey] ? Meanbee.ShippingRules.data[this.dataKey].filter(function (optionDesc) {
	                return ~_this2.value.indexOf(optionDesc.value + '');
	            }).map(function (optionDesc) {
	                return _this2.decorator ? _this2.decorator(optionDesc.value, optionDesc.label) : optionDesc.label;
	            }).join(', ') : '') || '[SELECT]';
	        }
	    }]);
	
	    return Multiselect;
	}(_Field3.default);
	
	exports.default = Multiselect;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Text = function (_Field) {
	    _inherits(Text, _Field);
	
	    function Text() {
	        _classCallCheck(this, Text);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Text).apply(this, arguments));
	    }
	
	    _createClass(Text, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement("input", { type: "text", id: me.idPrefix + "-value", value: me.value, onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }]);
	
	    return Text;
	}(_Field3.default);
	
	exports.default = Text;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Time = function (_Field) {
	    _inherits(Time, _Field);
	
	    function Time() {
	        _classCallCheck(this, Time);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Time).apply(this, arguments));
	    }
	
	    _createClass(Time, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement("input", { type: "time", id: me.idPrefix + "-value", value: me.value, onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }]);
	
	    return Time;
	}(_Field3.default);
	
	exports.default = Time;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CasedText = function (_Field) {
	    _inherits(CasedText, _Field);
	
	    function CasedText() {
	        _classCallCheck(this, CasedText);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(CasedText).apply(this, arguments));
	    }
	
	    _createClass(CasedText, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            var caseSensitiveField = React.createElement("input", { type: "checkbox", id: me.idPrefix + "-value-caseSensitive", onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	            caseSensitiveField.checked = this.value.caseSensitive || false;
	            return React.createElement(
	                "span",
	                { id: me.idPrefix + "-value" },
	                React.createElement("input", { type: "text", id: me.idPrefix + "-value-text", value: me.value.text || '', placeholder: "     ", onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } }),
	                caseSensitiveField,
	                " ",
	                React.createElement(
	                    "label",
	                    { "for": me.idPrefix + "-value-caseSensitive" },
	                    "Case Sensitive"
	                )
	            );
	        }
	    }, {
	        key: "valueChangeHandler",
	        value: function valueChangeHandler() {
	            this.value = {
	                text: document.getElementById(this.idPrefix + "-value-text").value,
	                caseSensitive: document.getElementById(this.idPrefix + "-value-caseSensitive").checked
	            };
	            this.condition.valueChangeHandler(this.value);
	        }
	    }]);
	
	    return CasedText;
	}(_Field3.default);
	
	exports.default = CasedText;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberX2 = function (_Field) {
	    _inherits(NumberX2, _Field);
	
	    function NumberX2() {
	        _classCallCheck(this, NumberX2);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberX2).apply(this, arguments));
	    }
	
	    _createClass(NumberX2, [{
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'span',
	                { id: me.idPrefix + '-value' },
	                React.createElement('input', { type: 'number', id: me.idPrefix + '-value-0', value: me.value[0] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } }),
	                'and',
	                React.createElement('input', { type: 'number', id: me.idPrefix + '-value-1', value: me.value[1] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } })
	            );
	        }
	    }, {
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler(event) {
	            this.value = [document.getElementById(this.idPrefix + '-value-0').value, document.getElementById(this.idPrefix + '-value-1').value];
	            this.condition.valueChangeHandler(this.value);
	        }
	    }]);
	
	    return NumberX2;
	}(_Field3.default);
	
	exports.default = NumberX2;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberBase26X2 = function (_Field) {
	    _inherits(NumberBase26X2, _Field);
	
	    function NumberBase26X2() {
	        _classCallCheck(this, NumberBase26X2);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBase26X2).apply(this, arguments));
	    }
	
	    _createClass(NumberBase26X2, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                "span",
	                { id: me.idPrefix + "-value" },
	                React.createElement("input", { type: "text", id: me.idPrefix + "-value-0", pattern: "[A-Z]", value: me.value[0] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } }),
	                "and",
	                React.createElement("input", { type: "text", id: me.idPrefix + "-value-1", pattern: "[A-Z]", value: me.value[1] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } })
	            );
	        }
	    }, {
	        key: "valueChangeHandler",
	        value: function valueChangeHandler(event) {
	            event.target.value = event.target.value.toUpperCase();
	            this.value = [document.getElementById(this.idPrefix + "-value-0").value, document.getElementById(this.idPrefix + "-value-1").value];
	            this.condition.valueChangeHandler(this.value);
	        }
	    }]);
	
	    return NumberBase26X2;
	}(_Field3.default);
	
	exports.default = NumberBase26X2;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberBase36X2 = function (_Field) {
	    _inherits(NumberBase36X2, _Field);
	
	    function NumberBase36X2() {
	        _classCallCheck(this, NumberBase36X2);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBase36X2).apply(this, arguments));
	    }
	
	    _createClass(NumberBase36X2, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                "span",
	                { id: me.idPrefix + "-value" },
	                React.createElement("input", { type: "text", id: me.idPrefix + "-value-0", pattern: "[0-9A-Z]", value: me.value[0] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } }),
	                "and",
	                React.createElement("input", { type: "text", id: me.idPrefix + "-value-1", pattern: "[0-9A-Z]", value: me.value[1] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } })
	            );
	        }
	    }, {
	        key: "valueChangeHandler",
	        value: function valueChangeHandler(event) {
	            event.target.value = event.target.value.toUpperCase();
	            this.value = [document.getElementById(this.idPrefix + "-value-0").value, document.getElementById(this.idPrefix + "-value-1").value];
	            this.condition.valueChangeHandler(this.value);
	        }
	    }]);
	
	    return NumberBase36X2;
	}(_Field3.default);
	
	exports.default = NumberBase36X2;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TextX2 = function (_Field) {
	    _inherits(TextX2, _Field);
	
	    function TextX2() {
	        _classCallCheck(this, TextX2);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(TextX2).apply(this, arguments));
	    }
	
	    _createClass(TextX2, [{
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'span',
	                { id: me.idPrefix + '-value' },
	                React.createElement('input', { type: 'text', id: me.idPrefix + '-value-0', value: me.value[0] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } }),
	                'and',
	                React.createElement('input', { type: 'text', id: me.idPrefix + '-value-1', value: me.value[1] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } })
	            );
	        }
	    }, {
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler() {
	            this.value = [document.getElementById(this.idPrefix + '-value-0').value, document.getElementById(this.idPrefix + '-value-1').value];
	            this.condition.valueChangeHandler(this.value);
	        }
	    }]);
	
	    return TextX2;
	}(_Field3.default);
	
	exports.default = TextX2;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TimeX2 = function (_Field) {
	    _inherits(TimeX2, _Field);
	
	    function TimeX2() {
	        _classCallCheck(this, TimeX2);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeX2).apply(this, arguments));
	    }
	
	    _createClass(TimeX2, [{
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'span',
	                { id: me.idPrefix + '-value' },
	                React.createElement('input', { type: 'time', id: me.idPrefix + '-value-0', value: me.value[0] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } }),
	                'and',
	                React.createElement('input', { type: 'time', id: me.idPrefix + '-value-1', value: me.value[1] || '', onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                        me.valueChangeHandler(event);
	                        Meanbee.ShippingRules.history.pushState();
	                    } })
	            );
	        }
	    }, {
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler() {
	            this.value = [document.getElementById(this.idPrefix + '-value-0').value, document.getElementById(this.idPrefix + '-value-1').value];
	            this.condition.valueChangeHandler(this.value);
	        }
	    }]);
	
	    return TimeX2;
	}(_Field3.default);
	
	exports.default = TimeX2;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberList = function (_Field) {
	    _inherits(NumberList, _Field);
	
	    function NumberList() {
	        _classCallCheck(this, NumberList);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberList).apply(this, arguments));
	    }
	
	    _createClass(NumberList, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement("input", { type: "text", id: me.idPrefix + "-value", pattern: "[0-9., ]", value: me.value, onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }, {
	        key: "valueChangeHandler",
	        value: function valueChangeHandler(event) {
	            event.target.value = event.target.value.toUpperCase();
	            _get(Object.getPrototypeOf(NumberList.prototype), "valueChangeHandler", this).call(this, event);
	        }
	    }]);
	
	    return NumberList;
	}(_Field3.default);
	
	exports.default = NumberList;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberBase26List = function (_Field) {
	    _inherits(NumberBase26List, _Field);
	
	    function NumberBase26List() {
	        _classCallCheck(this, NumberBase26List);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBase26List).apply(this, arguments));
	    }
	
	    _createClass(NumberBase26List, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement("input", { type: "text", id: me.idPrefix + "-value", pattern: "[A-Z, ]", value: me.value, onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }, {
	        key: "valueChangeHandler",
	        value: function valueChangeHandler(event) {
	            event.target.value = event.target.value.toUpperCase();
	            _get(Object.getPrototypeOf(NumberBase26List.prototype), "valueChangeHandler", this).call(this, event);
	        }
	    }]);
	
	    return NumberBase26List;
	}(_Field3.default);
	
	exports.default = NumberBase26List;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberBase36List = function (_Field) {
	    _inherits(NumberBase36List, _Field);
	
	    function NumberBase36List() {
	        _classCallCheck(this, NumberBase36List);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBase36List).apply(this, arguments));
	    }
	
	    _createClass(NumberBase36List, [{
	        key: "render",
	        value: function render() {
	            var me = this;
	            return React.createElement("input", { type: "text", id: me.idPrefix + "-value", pattern: "[0-9A-Z, ]", value: me.value, onKeyUp: me.valueChangeHandler.bind(me), onChange: function onChange(event) {
	                    me.valueChangeHandler(event);
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }, {
	        key: "valueChangeHandler",
	        value: function valueChangeHandler(event) {
	            event.target.value = event.target.value.toUpperCase();
	            _get(Object.getPrototypeOf(NumberBase36List.prototype), "valueChangeHandler", this).call(this, event);
	        }
	    }]);
	
	    return NumberBase36List;
	}(_Field3.default);
	
	exports.default = NumberBase36List;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Term2 = __webpack_require__(19);
	
	var _Term3 = _interopRequireDefault(_Term2);
	
	var _Boolean = __webpack_require__(21);
	
	var _Boolean2 = _interopRequireDefault(_Boolean);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Conditional = function (_Term) {
	    _inherits(Conditional, _Term);
	
	    function Conditional(index, parent) {
	        _classCallCheck(this, Conditional);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Conditional).call(this, index, parent));
	
	        _this.aggregator = new _Boolean2.default(0, _this);
	        return _this;
	    }
	
	    _createClass(Conditional, [{
	        key: 'renderValue',
	        value: function renderValue() {
	            var me = this;
	            return React.createElement('input', { id: me.id + '-value', type: 'number', value: me.value, onKeyDown: function onKeyDown(event) {
	                    return me.value = event.target.value;
	                }, onChange: function onChange(event) {
	                    me.value = event.target.value;
	                    me.root.rerender();
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, onKeyDown: me.keyHandler.bind(me), onCopy: me.copyText, tabIndex: 0, draggable: 'true',
	                    onDragStart: me.drag.bind(me), onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
	                'Constant value of ',
	                me.renderValue(),
	                React.createElement(
	                    'span',
	                    { id: me.aggregator.id },
	                    'if ',
	                    me.aggregator.renderCombinator(),
	                    ' of these conditions are ',
	                    me.aggregator.renderValue(),
	                    ': ',
	                    me.renderRemoveButton(),
	                    me.aggregator.renderChildren()
	                )
	            );
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            _get(Object.getPrototypeOf(Conditional.prototype), 'refresh', this).call(this);
	            this.aggregator.refresh();
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            _get(Object.getPrototypeOf(Conditional.prototype), 'init', this).call(this, obj);
	            this.value = obj.value;
	            this.aggregator.init(obj.aggregator);
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Conditional.prototype), 'toJSON', this).call(this);
	            obj.key = 'Conditional';
	            obj.aggregator = this.aggregator;
	            return obj;
	        }
	    }], [{
	        key: 'identifier',
	        value: function identifier() {
	            return 'Conditional Value';
	        }
	    }]);
	
	    return Conditional;
	}(_Term3.default);
	
	exports.default = Conditional;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Term2 = __webpack_require__(19);
	
	var _Term3 = _interopRequireDefault(_Term2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Constant = function (_Term) {
	    _inherits(Constant, _Term);
	
	    function Constant(index, parent) {
	        _classCallCheck(this, Constant);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Constant).call(this, index, parent));
	    }
	
	    _createClass(Constant, [{
	        key: 'renderValue',
	        value: function renderValue() {
	            var me = this;
	            return React.createElement('input', { id: me.id + '-value', type: 'number', value: me.value, onKeyDown: function onKeyDown(event) {
	                    return me.value = event.target.value;
	                }, onChange: function onChange(event) {
	                    me.value = event.target.value;
	                    me.root.rerender();
	                    Meanbee.ShippingRules.history.pushState();
	                } });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, onKeyDown: me.keyHandler.bind(me), onCopy: me.copyText, tabIndex: 0 },
	                'Constant value of ',
	                me.renderValue(),
	                ' ',
	                me.renderRemoveButton()
	            );
	        }
	    }, {
	        key: 'init',
	        value: function init(obj) {
	            _get(Object.getPrototypeOf(Constant.prototype), 'init', this).call(this, obj);
	            this.value = obj.value;
	        }
	    }, {
	        key: 'toJSON',
	        value: function toJSON() {
	            var obj = _get(Object.getPrototypeOf(Constant.prototype), 'toJSON', this).call(this);
	            obj.key = 'Constant';
	            return obj;
	        }
	    }], [{
	        key: 'identifier',
	        value: function identifier() {
	            return 'Constant Value';
	        }
	    }]);
	
	    return Constant;
	}(_Term3.default);
	
	exports.default = Constant;

/***/ },
/* 71 */
/***/ function(module, exports) {

	"use strict";
	
	/*
	 * Stretchy: Form element autosizing, the way it should be.
	 * by Lea Verou http://lea.verou.me
	 * MIT license
	 */
	(function () {
	
		if (!self.Element) {
			return; // super old browser
		}
	
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || null;
		}
	
		if (!Element.prototype.matches) {
			return;
		}
	
		function $$(expr, con) {
			return expr instanceof Node || expr instanceof Window ? [expr] : [].slice.call(typeof expr == "string" ? (con || document).querySelectorAll(expr) : expr || []);
		}
	
		var _ = self.Stretchy = {
			selectors: {
				base: 'textarea, select:not([size]), input:not([type]), input[type="' + "text url email tel".split(" ").join('"], input[type="') + '"]',
				filter: "*"
			},
	
			// Script element this was included with, if any
			script: document.currentScript || $$("script").pop(),
	
			// Autosize one element. The core of Stretchy.
			resize: function resize(element) {
				if (!_.resizes(element)) {
					return;
				}
	
				var cs = getComputedStyle(element);
				var offset = 0;
	
				if (!element.value && element.placeholder) {
					var empty = true;
					element.value = element.placeholder;
				}
	
				var type = element.nodeName.toLowerCase();
	
				if (type == "textarea") {
					element.style.height = "0";
	
					if (cs.boxSizing == "border-box") {
						offset = element.offsetHeight;
					} else if (cs.boxSizing == "content-box") {
						offset = -element.clientHeight;
					}
	
					element.style.height = element.scrollHeight + offset + "px";
				} else if (type == "input") {
					element.style.width = "0";
	
					if (cs.boxSizing == "border-box") {
						offset = element.offsetWidth;
					} else if (cs.boxSizing == "padding-box") {
						offset = element.clientWidth;
					}
	
					// Safari misreports scrollWidth, so we will instead set scrollLeft to a
					// huge number, and read that back to see what it was clipped to
					element.scrollLeft = 1e+10;
	
					var width = Math.max(element.scrollLeft + offset, element.scrollWidth - element.clientWidth);
	
					element.style.width = width + "px";
					if (~['number'].indexOf(element.type)) {
						element.style.width = "calc(" + width + "px + 2em)";
					}
				} else if (type == "select") {
					var selectedIndex = element.selectedIndex > 0 ? element.selectedIndex : 0;
	
					// Need to use dummy element to measure :(
					var option = document.createElement("_");
					if (element.options[selectedIndex]) option.textContent = element.options[selectedIndex].textContent;
					element.parentNode.insertBefore(option, element.nextSibling);
	
					// The name of the appearance property, as it might be prefixed
					var appearance;
	
					for (var property in Object.keys(cs)) {
						if (!/^(width|webkitLogicalWidth)$/.test(property)) {
							//console.log(property, option.offsetWidth, cs[property]);
							option.style[property] = cs[property];
	
							if (/appearance$/i.test(property)) {
								appearance = property;
							}
						}
					}
	
					option.style.width = "";
	
					if (option.offsetWidth > 0) {
						element.style.width = option.offsetWidth + "px";
	
						if (!cs[appearance] || cs[appearance] !== "none") {
							// Account for arrow
							element.style.width = "calc(" + element.style.width + " + 2em)";
						}
					}
	
					option.parentNode.removeChild(option);
					option = null;
				}
	
				if (empty) {
					element.value = "";
				}
			},
	
			// Autosize multiple elements
			resizeAll: function resizeAll(elements) {
				$$(elements || _.selectors.base).forEach(function (element) {
					_.resize(element);
				});
			},
	
			active: true,
	
			// Will stretchy do anything for this element?
			resizes: function resizes(element) {
				return element && element.parentNode && element.matches && element.matches(_.selectors.base) && element.matches(_.selectors.filter);
			},
	
			init: function init() {
				_.selectors.filter = _.script.getAttribute("data-filter") || ($$("[data-stretchy-filter]").pop() || document.body).getAttribute("data-stretchy-filter") || Stretchy.selectors.filter || "*";
	
				_.resizeAll();
			},
	
			$$: $$
		};
	
		// Autosize all elements once the DOM is loaded
	
		// DOM already loaded?
		// if (document.readyState !== "loading") {
		// 	console.log('Already loaded');
		// 	_.init();
		// }
		// else {
		// 	// Wait for it
		// 	document.addEventListener("DOMContentLoaded", _.init);
		// }
	
		// Listen for changes
		var listener = function listener(evt) {
			if (_.active) {
				_.resize(evt.target);
			}
		};
	
		document.documentElement.addEventListener("input", listener);
	
		// Firefox fires a change event instead of an input event
		document.documentElement.addEventListener("change", listener);
	
		// Listen for new elements
		if (self.MutationObserver) {
			new MutationObserver(function (mutations) {
				if (_.active) {
					mutations.forEach(function (mutation) {
						if (mutation.type == "childList") {
							Stretchy.resizeAll(mutation.addedNodes);
						}
					});
				}
			}).observe(document.documentElement, {
				childList: true,
				subtree: true
			});
		}
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map