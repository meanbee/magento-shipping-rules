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
	
	var _polyfills = __webpack_require__(2);
	
	var _polyfills2 = _interopRequireDefault(_polyfills);
	
	var _aggregator = __webpack_require__(3);
	
	var _aggregator2 = _interopRequireDefault(_aggregator);
	
	var _comparator = __webpack_require__(9);
	
	var _comparator2 = _interopRequireDefault(_comparator);
	
	var _condition = __webpack_require__(11);
	
	var _condition2 = _interopRequireDefault(_condition);
	
	var _field = __webpack_require__(13);
	
	var _field2 = _interopRequireDefault(_field);
	
	var _term = __webpack_require__(15);
	
	var _term2 = _interopRequireDefault(_term);
	
	var _util = __webpack_require__(17);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _History = __webpack_require__(18);
	
	var _History2 = _interopRequireDefault(_History);
	
	var _Boolean = __webpack_require__(19);
	
	var _Boolean2 = _interopRequireDefault(_Boolean);
	
	var _Numeric = __webpack_require__(20);
	
	var _Numeric2 = _interopRequireDefault(_Numeric);
	
	var _ProductSet = __webpack_require__(21);
	
	var _ProductSet2 = _interopRequireDefault(_ProductSet);
	
	var _Between = __webpack_require__(22);
	
	var _Between2 = _interopRequireDefault(_Between);
	
	var _Equal = __webpack_require__(23);
	
	var _Equal2 = _interopRequireDefault(_Equal);
	
	var _NotEqual = __webpack_require__(24);
	
	var _NotEqual2 = _interopRequireDefault(_NotEqual);
	
	var _GreaterThan = __webpack_require__(25);
	
	var _GreaterThan2 = _interopRequireDefault(_GreaterThan);
	
	var _GreaterThanOrEqual = __webpack_require__(26);
	
	var _GreaterThanOrEqual2 = _interopRequireDefault(_GreaterThanOrEqual);
	
	var _LessThan = __webpack_require__(27);
	
	var _LessThan2 = _interopRequireDefault(_LessThan);
	
	var _LessThanOrEqual = __webpack_require__(28);
	
	var _LessThanOrEqual2 = _interopRequireDefault(_LessThanOrEqual);
	
	var _Cart = __webpack_require__(29);
	
	var _Cart2 = _interopRequireDefault(_Cart);
	
	var _Customer = __webpack_require__(30);
	
	var _Customer2 = _interopRequireDefault(_Customer);
	
	var _Destination = __webpack_require__(31);
	
	var _Destination2 = _interopRequireDefault(_Destination);
	
	var _Environment = __webpack_require__(32);
	
	var _Environment2 = _interopRequireDefault(_Environment);
	
	var _PostalCode = __webpack_require__(33);
	
	var _PostalCode2 = _interopRequireDefault(_PostalCode);
	
	var _ProductSubselection = __webpack_require__(34);
	
	var _ProductSubselection2 = _interopRequireDefault(_ProductSubselection);
	
	var _Promotion = __webpack_require__(36);
	
	var _Promotion2 = _interopRequireDefault(_Promotion);
	
	var _Time = __webpack_require__(37);
	
	var _Time2 = _interopRequireDefault(_Time);
	
	var _Boolean3 = __webpack_require__(38);
	
	var _Boolean4 = _interopRequireDefault(_Boolean3);
	
	var _Number = __webpack_require__(39);
	
	var _Number2 = _interopRequireDefault(_Number);
	
	var _NumberBase = __webpack_require__(40);
	
	var _NumberBase2 = _interopRequireDefault(_NumberBase);
	
	var _NumberBase3 = __webpack_require__(41);
	
	var _NumberBase4 = _interopRequireDefault(_NumberBase3);
	
	var _Select = __webpack_require__(42);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _Text = __webpack_require__(43);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	var _Time3 = __webpack_require__(44);
	
	var _Time4 = _interopRequireDefault(_Time3);
	
	var _NumberX = __webpack_require__(45);
	
	var _NumberX2 = _interopRequireDefault(_NumberX);
	
	var _NumberBase26X = __webpack_require__(46);
	
	var _NumberBase26X2 = _interopRequireDefault(_NumberBase26X);
	
	var _NumberBase36X = __webpack_require__(47);
	
	var _NumberBase36X2 = _interopRequireDefault(_NumberBase36X);
	
	var _TextX = __webpack_require__(48);
	
	var _TextX2 = _interopRequireDefault(_TextX);
	
	var _TimeX = __webpack_require__(49);
	
	var _TimeX2 = _interopRequireDefault(_TimeX);
	
	var _Conditional = __webpack_require__(50);
	
	var _Conditional2 = _interopRequireDefault(_Conditional);
	
	var _Constant = __webpack_require__(51);
	
	var _Constant2 = _interopRequireDefault(_Constant);
	
	var _ProductSubselection3 = __webpack_require__(35);
	
	var _ProductSubselection4 = _interopRequireDefault(_ProductSubselection3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.React = {
	    createElement: function createElement(tagName, attributes) {
	        var element = document.createElement(tagName);
	        if (attributes) Object.keys(attributes).forEach(function (attributeName) {
	            if (/^on/.test(attributeName)) {
	                return element.addEventListener(attributeName.slice(3).toLowerCase(), attributes[attributeName]);
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
	
	(function () {
	    if (!('Meanbee' in window)) window.Meanbee = {};
	    if (!('ShippingRules' in Meanbee)) Meanbee.ShippingRules = {};
	
	    Meanbee.ShippingRules.registers = {
	        aggregator: _aggregator2.default,
	        comparator: _comparator2.default,
	        condition: _condition2.default,
	        field: _field2.default,
	        term: _term2.default
	    };
	    Meanbee.ShippingRules.util = _util2.default;
	    Meanbee.ShippingRules.history = new _History2.default();
	
	    Meanbee.ShippingRules.registers.aggregator.add(_Boolean2.default.CONJUNCTIVE, _Boolean2.default);
	    Meanbee.ShippingRules.registers.aggregator.add(_Boolean2.default.DISJUNCTIVE, _Boolean2.default);
	    Meanbee.ShippingRules.registers.aggregator.add('Summative', _Numeric2.default);
	    Meanbee.ShippingRules.registers.aggregator.add(_ProductSet2.default.INTERSECTIONAL, _ProductSet2.default);
	    Meanbee.ShippingRules.registers.aggregator.add(_ProductSet2.default.UNIONAL, _ProductSet2.default);
	
	    Meanbee.ShippingRules.registers.comparator.add('Between', _Between2.default);
	    Meanbee.ShippingRules.registers.comparator.add('Equal', _Equal2.default);
	    Meanbee.ShippingRules.registers.comparator.add('NotEqual', _NotEqual2.default);
	    Meanbee.ShippingRules.registers.comparator.add('GreaterThan', _GreaterThan2.default);
	    Meanbee.ShippingRules.registers.comparator.add('GreaterThanOrEqual', _GreaterThanOrEqual2.default);
	    Meanbee.ShippingRules.registers.comparator.add('LessThan', _LessThan2.default);
	    Meanbee.ShippingRules.registers.comparator.add('LessThanOrEqual', _LessThanOrEqual2.default);
	
	    Meanbee.ShippingRules.registers.condition.add('Cart', _Cart2.default);
	    Meanbee.ShippingRules.registers.condition.add('Customer', _Customer2.default);
	    Meanbee.ShippingRules.registers.condition.add('Destination', _Destination2.default);
	    Meanbee.ShippingRules.registers.condition.add('Environment', _Environment2.default);
	    Meanbee.ShippingRules.registers.condition.add('Destination_PostalCode', _PostalCode2.default);
	    Meanbee.ShippingRules.registers.condition.add('Product_Subselection', _ProductSubselection2.default);
	    Meanbee.ShippingRules.registers.condition.add('Promotion', _Promotion2.default);
	    Meanbee.ShippingRules.registers.condition.add('Time', _Time2.default);
	
	    Meanbee.ShippingRules.registers.field.add('Boolean', _Boolean4.default);
	    Meanbee.ShippingRules.registers.field.add('Number', _Number2.default);
	    Meanbee.ShippingRules.registers.field.add('NumberBase26', _NumberBase2.default);
	    Meanbee.ShippingRules.registers.field.add('NumberBase36', _NumberBase4.default);
	    Meanbee.ShippingRules.registers.field.add('Select', _Select2.default);
	    Meanbee.ShippingRules.registers.field.add('Text', _Text2.default);
	    Meanbee.ShippingRules.registers.field.add('Time', _Time4.default);
	    Meanbee.ShippingRules.registers.field.add('NumberX2', _NumberX2.default);
	    Meanbee.ShippingRules.registers.field.add('NumberBase26X2', _NumberBase26X2.default);
	    Meanbee.ShippingRules.registers.field.add('NumberBase36X2', _NumberBase36X2.default);
	    Meanbee.ShippingRules.registers.field.add('TextX2', _TextX2.default);
	    Meanbee.ShippingRules.registers.field.add('TimeX2', _TimeX2.default);
	
	    Meanbee.ShippingRules.registers.term.add('Conditional', _Conditional2.default);
	    Meanbee.ShippingRules.registers.term.add('Constant', _Constant2.default);
	    Meanbee.ShippingRules.registers.term.add('Product_Subselection', _ProductSubselection4.default);
	
	    Meanbee.ShippingRules.util.loadData('condition/product_subselection/attributes');
	    Meanbee.ShippingRules.util.loadData('condition/destination_postalcode/formats');
	
	    document.addEventListener('DOMContentLoaded', function () {
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
	
	        function changeHandler(event) {
	            if (~['INPUT', 'SELECT'].indexOf(event.target.tagName)) Meanbee.ShippingRules.util.resizeFields();
	        }
	
	        document.body.addEventListener('change', changeHandler, false);
	        document.body.addEventListener('keyup', changeHandler, false);
	
	        Meanbee.ShippingRules.util.resizeFields();
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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(4);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Aggregator = __webpack_require__(5);
	
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
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
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
	                    _this.get(key).name()
	                );
	            });
	        }
	    }]);
	
	    return Register;
	}();
	
	exports.default = Register;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Base2 = __webpack_require__(6);
	
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
	            if (obj.register !== 'Aggregator' || Meanbee.ShippingRules.registers.aggregator.get(obj.key) !== this.constructor) {
	                return;
	            }
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _navigation = __webpack_require__(7);
	
	var _navigation2 = _interopRequireDefault(_navigation);
	
	var _clipboard = __webpack_require__(8);
	
	var _clipboard2 = _interopRequireDefault(_clipboard);
	
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
	            var focussedElementId = document.activeElement.id;
	            this.container.innerHTML = '';
	            this.container.appendChild(this.render());
	            Meanbee.ShippingRules.util.resizeFields();
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
	                return Meanbee.ShippingRules.util.removeButton(this, this.delete.bind(this));
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
	                if (node instanceof HTMLUListElement) return (format === 'rich' ? '<ul>' : '') + ShippingRules.util.flatten(Array.from(node.childNodes).map(naturalise)).join(' ') + (format === 'rich' ? '</ul>' : '');
	                if (node instanceof HTMLLIElement) return (format === 'rich' ? '<li>' : '\n\t') + ShippingRules.util.flatten(Array.from(node.childNodes).map(naturalise)).join(' ') + (format === 'rich' ? '</li>' : '');
	                return ShippingRules.util.flatten(Array.from(node.childNodes).map(naturalise));
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
	            var origin = ShippingRules.calculators[event.dataTransfer.getData('calculator')].getObjectById(event.dataTransfer.getData('id'));
	            var childDesc = JSON.parse(event.dataTransfer.getData('descriptor'));
	            var child = parent.addChild(ShippingRules.Register[childDesc.register.toLowerCase()].get(childDesc.key), index);
	            child.init(childDesc);
	            if (!(event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.dataTransfer.effectAllowed === 'copy')) {
	                origin.delete(0);
	            }
	            this.focus(child.id);
	            this.root.rerender();
	            ShippingRules.history.pushState();
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
	            this.init(JSON.parse(input.value));
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(4);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Comparator = __webpack_require__(10);
	
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
	            options[key].name(type)
	        );
	        option.selected = options[key].name(type) === selectedName;
	        return option;
	    });
	};
	
	exports.default = comparatorRegister;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Comparator = function () {
	    function Comparator(type) {
	        _classCallCheck(this, Comparator);
	
	        this.type = type;
	    }
	
	    _createClass(Comparator, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                register: 'Comparator'
	            };
	        }
	    }, {
	        key: 'name',
	        get: function get() {
	            return this.constructor.name(this.type);
	        }
	    }], [{
	        key: 'supportedTypes',
	        value: function supportedTypes() {
	            return [];
	        }
	    }, {
	        key: 'canHandleType',
	        value: function canHandleType(type) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = type[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var t = _step.value;
	
	                    if (~this.supportedTypes().indexOf(t)) {
	                        return true;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return false;
	        }
	    }, {
	        key: 'name',
	        value: function name(type) {
	            // eslint-disable-line no-unused-vars
	            return {};
	        }
	    }]);
	
	    return Comparator;
	}();
	
	exports.default = Comparator;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(4);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Condition = __webpack_require__(12);
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Base2 = __webpack_require__(6);
	
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
	            var _this2 = this;
	
	            var me = this;
	            return React.createElement(
	                'select',
	                { id: me.id + '-comparator', onChange: function onChange(event) {
	                        me.comparator = new (Meanbee.ShippingRules.registers.comparator.get(event.target.value))(_this2.type);
	                        me.valueField = new (Meanbee.ShippingRules.registers.field.get(me.comparator.getField()))(me, me.value);
	                        me.root.rerender();
	                        Meanbee.ShippingRules.history.pushState();
	                    } },
	                Meanbee.ShippingRules.registers.comparator.getAsOptions(me.type, me.comparator.name)
	            );
	        }
	    }, {
	        key: 'valueChangeHandler',
	        value: function valueChangeHandler(value) {
	            this.value = value;
	            this.root.updateJSON();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var me = this;
	            return React.createElement(
	                'li',
	                { id: me.id, tabIndex: 0, onCopy: me.copyText, draggable: 'true', onDragStart: me.drag.bind(me), onDragOver: me.allowDrop.bind(me), onDrop: me.drop.bind(me), onDragEnter: me.dragIn.bind(me), onDragLeave: me.dragOut.bind(me) },
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(4);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Field = __webpack_require__(14);
	
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
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
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
	    }]);
	
	    return Field;
	}();
	
	exports.default = Field;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Register = __webpack_require__(4);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _Term = __webpack_require__(16);
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Base2 = __webpack_require__(6);
	
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
	            if (!isNaN(parseInt(param, 10))) {
	                this._value = parseInt(param, 10);
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
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	ctx.font = 'bold 10.8px sans-serif';
	
	exports.default = {
	    toOptions: function toOptions(options, selected) {
	        selected = Array.isArray(selected) ? selected : [selected];
	        var html = [];
	        options.forEach(function (option) {
	            if ({}.toString.call(option.value) === '[object Array]') {
	                html.push(React.createElement(
	                    'optgroup',
	                    { label: option.label },
	                    Meanbee.ShippingRules.util.toOptions(option.value, selected)
	                ));
	            } else {
	                var optionElement = function () {
	                    return React.createElement(
	                        'option',
	                        { value: option.value },
	                        option.label
	                    );
	                }();
	                if (~selected.indexOf(option.value)) optionElement.selected = true;
	                if (option.inputType) optionElement.dataset.inputType = option.inputType;
	                if (option.type) optionElement.dataset.type = option.type;
	                html.push(optionElement);
	            }
	        });
	        return html;
	    },
	    constructInputField: function constructInputField(condition) {
	        var comparator = Meanbee.ShippingRules.ajax.getComparators(condition.attribute).filter(function (x) {
	            return x.value === condition.comparator;
	        })[0];
	        var conditionField = Meanbee.ShippingRules.ajax.getConditionFieldByValue(condition.attribute);
	        var prefix = condition.prefix + '-c' + condition.id;
	        if (!comparator) {
	            return React.createElement('input', { id: prefix + '-value' });
	        }
	        var input = null;
	        switch (comparator.inputType) {
	            case 'x-interval':
	                input = function () {
	                    return React.createElement(
	                        'span',
	                        { id: prefix + '-value' },
	                        React.createElement('input', { id: prefix + '-value-min' }),
	                        ' and ',
	                        React.createElement('input', { id: prefix + '-value-max' })
	                    );
	                }();
	                Object.defineProperty(input, 'value', {
	                    enumerable: true,
	                    get: function get() {
	                        return [document.getElementById(input.id + '-min').value, document.getElementById(input.id + '-max').value];
	                    },
	                    set: function set(value) {
	                        if (value) {
	                            document.getElementById(input.id + '-min').value = value[0];
	                            document.getElementById(input.id + '-max').value = value[1];
	                        }
	                    }
	                });
	                break;
	            case 'x-multiselect':
	                input = function () {
	                    return React.createElement(
	                        'select',
	                        { id: prefix + '-value', multiple: 'multiple' },
	                        Meanbee.ShippingRules.util.toOptions(conditionField.options, condition.value)
	                    );
	                }();
	                break;
	            case 'select':
	                input = function () {
	                    return React.createElement(
	                        'select',
	                        { id: prefix + '-value' },
	                        Meanbee.ShippingRules.util.toOptions(conditionField.options, condition.value)
	                    );
	                }();
	                break;
	            default:
	                input = function () {
	                    return React.createElement('input', { id: prefix + '-value', type: comparator.inputType || 'text' });
	                }();
	                if (comparator.inputPattern) {
	                    input.pattern = comparator.inputPattern;
	                }
	                break;
	        }
	        input.value = condition.value;
	        input.addEventListener('keyup', function () {
	            return condition.value = input.value;
	        }, false);
	        input.addEventListener('change', function () {
	            return condition.value = input.value;
	        }, false);
	        return input;
	    },
	    addButton: function addButton(ctx, handler) {
	        return React.createElement('button', { id: ctx.prefix + '-t' + ctx.id + '-add', type: 'button', 'class': 'add', onClick: handler });
	    },
	    removeButton: function removeButton(ctx, handler) {
	        return React.createElement('button', { id: ctx.id + '-remove', 'aria-label': 'Remove', type: 'button', 'class': 'remove', onClick: handler });
	    },
	    fieldTextSize: function fieldTextSize(text) {
	        return Math.floor(ctx.measureText(text).width) + 25 + 'px';
	    },
	    textWidth: function textWidth(text) {
	        return ctx.measureText(text).width;
	    },
	    resizeFields: function resizeFields() {
	        [].forEach.call(document.querySelectorAll('.calculator-tree select:not([multiple])'), function (select) {
	            var text = select.selectedOptions[0] ? select.selectedOptions[0].innerText : '';
	            select.style.width = Meanbee.ShippingRules.util.fieldTextSize(text);
	        });
	        [].forEach.call(document.querySelectorAll('.calculator-tree input'), function (input) {
	            var text = input.value || (input.type === 'time' ? '-------' : '---');
	            input.style.width = Meanbee.ShippingRules.util.fieldTextSize(text);
	        });
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
	                    Meanbee.ShippingRules.calculators[calcName].refresh();
	                    Meanbee.ShippingRules.calculators[calcName].rerender();
	                });
	            }
	        };
	        var formData = new FormData();
	        formData.set('form_key', Meanbee.ShippingRules.formKey);
	        xhr.send(formData);
	    },
	    flatten: function flatten(arr) {
	        var _ref;
	
	        var flat = (_ref = []).concat.apply(_ref, _toConsumableArray(arr));
	        return flat.some(Array.isArray) ? flatten(flat) : flat;
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Aggregator2 = __webpack_require__(5);
	
	var _Aggregator3 = _interopRequireDefault(_Aggregator2);
	
	var _Condition = __webpack_require__(12);
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Aggregator2 = __webpack_require__(5);
	
	var _Aggregator3 = _interopRequireDefault(_Aggregator2);
	
	var _Term = __webpack_require__(16);
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Aggregator2 = __webpack_require__(5);
	
	var _Aggregator3 = _interopRequireDefault(_Aggregator2);
	
	var _Condition = __webpack_require__(12);
	
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Comparator2 = __webpack_require__(10);
	
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
	        key: 'name',
	        value: function name(type) {
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Comparator2 = __webpack_require__(10);
	
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
	        key: 'name',
	        value: function name(type) {
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Comparator2 = __webpack_require__(10);
	
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
	        key: 'name',
	        value: function name(type) {
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
	                    return 'DOESN\'T EQUAL';
	                default:
	                    return 'IS NOT';
	            }
	        }
	    }]);
	
	    return NotEqual;
	}(_Comparator3.default);
	
	exports.default = NotEqual;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Comparator2 = __webpack_require__(10);
	
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
	        key: 'name',
	        value: function name(type) {
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Comparator2 = __webpack_require__(10);
	
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
	        key: 'name',
	        value: function name(type) {
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Comparator2 = __webpack_require__(10);
	
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
	        key: 'name',
	        value: function name(type) {
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Comparator2 = __webpack_require__(10);
	
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
	        key: 'name',
	        value: function name(type) {
	            var _this3 = this;
	
	            type = type.filter(function (t) {
	                return ~_this3.supportedTypes().indexOf(t);
	            }.bind(this));
	            switch (type[0]) {
	                case 'numeric_b10':
	                case 'numeric_b26':
	                case 'numeric_b36':
	                    return 'PRECEEDS OR EQUALS';
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Condition2 = __webpack_require__(12);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Condition2 = __webpack_require__(12);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Condition2 = __webpack_require__(12);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Destination = function (_Condition) {
	    _inherits(Destination, _Condition);
	
	    function Destination(index, parent, variable) {
	        _classCallCheck(this, Destination);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Destination).call(this, index, parent, variable));
	    }
	
	    _createClass(Destination, [{
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Condition2 = __webpack_require__(12);
	
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Condition2 = __webpack_require__(12);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	var _Boolean = __webpack_require__(19);
	
	var _Boolean2 = _interopRequireDefault(_Boolean);
	
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
	        key: 'renderFormatDecoration',
	        value: function renderFormatDecoration() {
	            var _this2 = this;
	
	            return Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].filter(function (f) {
	                return f.value === _this2.format && Meanbee.ShippingRules.util.textWidth(f.decoration) < 2 * Meanbee.ShippingRules.util.textWidth('🇦');
	            }).map(function (f) {
	                return React.createElement(
	                    'span',
	                    null,
	                    f.decoration
	                );
	            });
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
	                        format.label
	                    );
	                    option.selected = me.format === format.value;
	                    return option;
	                })
	            );
	        }
	    }, {
	        key: 'renderHelp',
	        value: function renderHelp(item) {
	            var _this3 = this;
	
	            item.addEventListener('focus', function () {
	                var popper = void 0;
	                if (popper = item.querySelector('.popper')) {
	                    popper.classList.remove('hidden');
	                } else {
	                    var _ret = function () {
	                        var postalCodeFormatData = Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].filter(function (f) {
	                            return f.value === _this3.format;
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
	                        _this3._popper = popper = new Popper(item.querySelector('.popper-target'), help, {
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
	                    me.renderFormatDecoration(),
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
	            var _this4 = this;
	
	            if (this.context instanceof this.constructor) {
	                if (this.variable in this.constructor.getVariables(this.context)) {
	                    (function () {
	                        var validComparators = Meanbee.ShippingRules.registers.comparator.getByType(_this4.type);
	                        if (Object.keys(validComparators).reduce(function (accumulator, key) {
	                            return accumulator || _this4.comparator instanceof validComparators[key];
	                        }, false)) {
	                            _this4.comparator.type = _this4.type;
	                        } else {
	                            var comparator = validComparators[Object.keys(validComparators)[0]];
	                            _this4.comparator = comparator ? new comparator(_this4.type) : null;
	                        }
	                    })();
	                } else {
	                    this.parent.removeChildByIndex(this.index);
	                }
	            } else {
	                this.aggregator.refresh();
	            }
	            if (this._popper) {
	                this._popper.destroy();
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Condition2 = __webpack_require__(12);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	var _ProductSubselection = __webpack_require__(35);
	
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
	        key: 'name',
	        value: function name() {
	            return 'Product Subselection';
	        }
	    }]);
	
	    return ProductSubselection;
	}(_Condition3.default);
	
	exports.default = ProductSubselection;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Term2 = __webpack_require__(16);
	
	var _Term3 = _interopRequireDefault(_Term2);
	
	var _ProductSet = __webpack_require__(21);
	
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
	        key: 'name',
	        value: function name() {
	            return 'Product Subselection';
	        }
	    }]);
	
	    return ProductSubselection;
	}(_Term3.default);
	
	exports.default = ProductSubselection;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Condition2 = __webpack_require__(12);
	
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Condition2 = __webpack_require__(12);
	
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
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
	        Meanbee.ShippingRules.util.loadData(_this.dataKey);
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
	                        optionDesc.label
	                    );
	                    if (optionDesc.value === me.value) option.selected = true;
	                    return option;
	                }) : []
	            );
	        }
	    }]);
	
	    return Select;
	}(_Field3.default);
	
	exports.default = Select;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Field2 = __webpack_require__(14);
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Term2 = __webpack_require__(16);
	
	var _Term3 = _interopRequireDefault(_Term2);
	
	var _Boolean = __webpack_require__(19);
	
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
	        key: 'name',
	        value: function name() {
	            return 'Conditional Value';
	        }
	    }]);
	
	    return Conditional;
	}(_Term3.default);
	
	exports.default = Conditional;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Term2 = __webpack_require__(16);
	
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
	        key: 'name',
	        value: function name() {
	            return 'Constant Value';
	        }
	    }]);
	
	    return Constant;
	}(_Term3.default);

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map