'use strict';
(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
            return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = '';
    return __webpack_require__(0);
}([
    function (module, exports, __webpack_require__) {
        __webpack_require__(1);
        __webpack_require__(3);
    },
    function (module, exports, __webpack_require__) {
        (function () {
            if (typeof HTMLElement.prototype.setAttributes !== 'function') {
                HTMLElement.prototype.setAttributes = function (attributes) {
                    return __webpack_require__(2)(element, attributes);
                };
            }
        }());
    },
    function (module, exports) {
        module.exports = function setAttributes(element, attributes) {
            var isPlainObject = Object.prototype.toString.call(attributes) === '[object Object]' && typeof attributes.constructor === 'function' && Object.prototype.toString.call(attributes.constructor.prototype) === '[object Object]' && attributes.constructor.prototype.hasOwnProperty('isPrototypeOf');
            if (isPlainObject) {
                for (var key in attributes) {
                    element.setAttribute(key, attributes[key]);
                }
            } else {
                throw new DOMException('Failed to execute \'setAttributes\' on \'Element\': ' + Object.prototype.toString.call(attributes) + ' is not a plain object.');
            }
        };
    },
    function (module, exports, __webpack_require__) {
        (function () {
            if (typeof HTMLElement.prototype.appendChildren !== 'function') {
                HTMLElement.prototype.appendChildren = function (children) {
                    return __webpack_require__(4)(this, children);
                };
            }
        }());
    },
    function (module, exports) {
        module.exports = function appendChildren(element, children) {
            children = Array.isArray(children) ? children : [children];
            children.forEach(function (child) {
                if (child instanceof HTMLElement) {
                    element.appendChild(child);
                } else if (child) {
                    element.appendChild(document.createTextNode(child.toString()));
                } else {
                    throw new DOMException('Failed to execute \'appendChildren\' on \'Element\': ' + Object.prototype.toString.call(child) + ' is not valid.');
                }
            });
        };
    }
]));
'use strict';
(function () {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function fNOP() {
            }, fBound = function fBound() {
                return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        if (this.prototype) {
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        return fBound;
    };
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
}());
'use strict';
var Meanbee = Meanbee || {};
!('ShippingRules' in Meanbee) && (Meanbee.ShippingRules = {});
(function (ShippingRules) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.font = 'bold 10.8px sans-serif';
    ShippingRules.util = {
        toOptions: function toOptions(options, selected) {
            selected = Array.isArray(selected) ? selected : [selected];
            var html = [];
            options.forEach(function (option) {
                if ({}.toString.call(option.value) === '[object Array]') {
                    html.push(function () {
                        var $$a = document.createElement('optgroup');
                        $$a.setAttribute('label', option.label);
                        $$a.appendChildren(ShippingRules.util.toOptions(option.value, selected));
                        return $$a;
                    }());
                } else {
                    var optionElement = function () {
                        return function () {
                            var $$c = document.createElement('option');
                            $$c.setAttribute('value', option.value);
                            $$c.appendChildren(option.label);
                            return $$c;
                        }();
                    }();
                    if (~selected.indexOf(option.value))
                        optionElement.selected = true;
                    if (option.inputType)
                        optionElement.dataset.inputType = option.inputType;
                    if (option.type)
                        optionElement.dataset.type = option.type;
                    html.push(optionElement);
                }
            });
            return html;
        },
        constructInputField: function constructInputField(condition) {
            var comparator = ShippingRules.ajax.getComparators(condition.attribute).filter(function (x) {
                return x.value === condition.comparator;
            })[0];
            var conditionField = ShippingRules.ajax.getConditionFieldByValue(condition.attribute);
            var prefix = condition.prefix + '-c' + condition.id;
            if (!comparator) {
                return function () {
                    var $$e = document.createElement('input');
                    $$e.setAttribute('id', prefix + '-value');
                    return $$e;
                }();
            }
            var input = null;
            switch (comparator.inputType) {
            case 'x-interval':
                input = function () {
                    return function () {
                        var $$f = document.createElement('span');
                        $$f.setAttribute('id', prefix + '-value');
                        var $$g = document.createElement('input');
                        $$g.setAttribute('id', prefix + '-value-min');
                        $$f.appendChild($$g);
                        var $$h = document.createTextNode(' and ');
                        $$f.appendChild($$h);
                        var $$i = document.createElement('input');
                        $$i.setAttribute('id', prefix + '-value-max');
                        $$f.appendChild($$i);
                        return $$f;
                    }();
                }();
                Object.defineProperty(input, 'value', {
                    enumerable: true,
                    get: function get() {
                        return [
                            document.getElementById(input.id + '-min').value,
                            document.getElementById(input.id + '-max').value
                        ];
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
                    return function () {
                        var $$j = document.createElement('select');
                        $$j.setAttribute('id', prefix + '-value');
                        $$j.setAttribute('multiple', 'multiple');
                        $$j.appendChildren(ShippingRules.util.toOptions(conditionField.options, condition.value));
                        return $$j;
                    }();
                }();
                break;
            case 'select':
                input = function () {
                    return function () {
                        var $$l = document.createElement('select');
                        $$l.setAttribute('id', prefix + '-value');
                        $$l.appendChildren(ShippingRules.util.toOptions(conditionField.options, condition.value));
                        return $$l;
                    }();
                }();
                break;
            default:
                input = function () {
                    return function () {
                        var $$n = document.createElement('input');
                        $$n.setAttribute('id', prefix + '-value');
                        $$n.setAttribute('type', comparator.inputType || 'text');
                        return $$n;
                    }();
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
            return function () {
                var $$o = document.createElement('button');
                $$o.setAttribute('id', ctx.prefix + '-t' + ctx.id + '-add');
                $$o.setAttribute('type', 'button');
                $$o.setAttribute('class', 'add');
                $$o.addEventListener('click', handler);
                return $$o;
            }();
        },
        removeButton: function removeButton(ctx, handler) {
            return function () {
                var $$p = document.createElement('button');
                $$p.setAttribute('id', ctx.id + '-remove');
                $$p.setAttribute('aria-label', 'Remove');
                $$p.setAttribute('type', 'button');
                $$p.setAttribute('class', 'remove');
                $$p.addEventListener('click', handler);
                return $$p;
            }();
        },
        fieldTextSize: function fieldTextSize(text) {
            return Math.floor(ctx.measureText(text).width) + 25 + 'px';
        },
        resizeFields: function resizeFields() {
            [].forEach.call(document.querySelectorAll('.calculator-tree select:not([multiple])'), function (select) {
                var text = select.selectedOptions[0] ? select.selectedOptions[0].innerText : '';
                select.style.width = ShippingRules.util.fieldTextSize(text);
            });
            [].forEach.call(document.querySelectorAll('.calculator-tree input'), function (input) {
                var text = input.value || '---';
                input.style.width = ShippingRules.util.fieldTextSize(text);
            });
        }
    };
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
(function (ShippingRules) {
    ShippingRules.Register = function () {
        function _class() {
            _classCallCheck(this, _class);
            this.children = {};
        }
        _createClass(_class, [
            {
                key: 'remove',
                value: function remove(key) {
                    var child = this.get(key);
                    delete this.children[key];
                    return child;
                }
            },
            {
                key: 'has',
                value: function has(key) {
                    return this.children.hasOwnProperty(key);
                }
            },
            {
                key: 'get',
                value: function get(key) {
                    return this.has(key) && this.children[key];
                }
            },
            {
                key: 'getAsOptions',
                value: function getAsOptions() {
                    var _this = this;
                    return Object.keys(this.children).map(function (key) {
                        return function () {
                            var $$a = document.createElement('option');
                            $$a.setAttribute('value', key);
                            $$a.appendChildren(_this.get(key).name());
                            return $$a;
                        }();
                    });
                }
            }
        ]);
        return _class;
    }();
}(Meanbee.ShippingRules));
'use strict';
(function (ShippingRules) {
    ShippingRules.Register.aggregator = new ShippingRules.Register();
    ShippingRules.Register.aggregator.add = function (key, child) {
        if (!this.has(key) && new child() instanceof ShippingRules.Aggregator) {
            this.children[key] = child;
        }
        return this;
    };
}(Meanbee.ShippingRules));
'use strict';
(function (ShippingRules) {
    ShippingRules.Register.comparator = new ShippingRules.Register();
    ShippingRules.Register.comparator.add = function (key, child) {
        if (!this.has(key) && new child() instanceof ShippingRules.Comparator) {
            this.children[key] = child;
        }
        return this;
    };
    ShippingRules.Register.comparator.getByType = function (type) {
        var _this = this;
        return Object.keys(this.children).reduce(function (accumulator, key) {
            if (_this.children[key].canHandleType(type)) {
                accumulator[key] = _this.children[key];
            }
            return accumulator;
        }, {});
    };
    ShippingRules.Register.comparator.getAsOptions = function (type, selectedName) {
        var options = type ? this.getByType(type) : this.children;
        return Object.keys(options).map(function (key) {
            return function () {
                var $$a = document.createElement('option');
                $$a.setAttribute('value', key);
                $$a.setAttribute('selected', options[key].name(type) === selectedName);
                $$a.appendChildren(options[key].name(type));
                return $$a;
            }();
        });
    };
}(Meanbee.ShippingRules));
'use strict';
function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
(function (ShippingRules) {
    ShippingRules.Register.condition = new ShippingRules.Register();
    ShippingRules.Register.condition.add = function (key, child) {
        if (!this.has(key) && new child() instanceof ShippingRules.Condition) {
            this.children[key] = child;
        }
        return this;
    };
    ShippingRules.Register.condition.getAsOptions = function (context) {
        var _this = this;
        var categorised = Object.keys(this.children).map(function (key) {
            return _defineProperty({}, _this.children[key].getCategory(context), Object.keys(_this.children[key].getVariables()).map(function (variable) {
                return function () {
                    var $$a = document.createElement('option');
                    $$a.setAttribute('value', variable);
                    $$a.setAttribute('data-register-key', key);
                    $$a.appendChildren(_this.children[key].getVariables()[variable].label);
                    return $$a;
                }();
            }));
        }).reduce(function (accumulator, current) {
            var k = Object.keys(current)[0];
            return Object.assign(accumulator, accumulator[k] ? _defineProperty({}, k, [].concat(_toConsumableArray(accumulator[k]), _toConsumableArray(current[k]))) : _defineProperty({}, k, current[k]));
        });
        return Object.keys(categorised).map(function (category) {
            return function () {
                var $$c = document.createElement('optgroup');
                $$c.setAttribute('label', category);
                $$c.appendChildren(categorised[category]);
                return $$c;
            }();
        });
    };
}(Meanbee.ShippingRules));
'use strict';
(function (ShippingRules) {
    ShippingRules.Register.field = new ShippingRules.Register();
    ShippingRules.Register.field.add = function (key, child) {
        if (!this.has(key) && new child() instanceof ShippingRules.Field) {
            this.children[key] = child;
        }
        return this;
    };
}(Meanbee.ShippingRules));
'use strict';
(function (ShippingRules) {
    ShippingRules.Register.term = new ShippingRules.Register();
    ShippingRules.Register.term.add = function (key, child) {
        if (!this.has(key) && new child() instanceof ShippingRules.Term) {
            this.children[key] = child;
        }
        return this;
    };
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
(function (ShippingRules) {
    ShippingRules.Base = function () {
        function _class(index, parent, container) {
            _classCallCheck(this, _class);
            this.index = index;
            this.parent = parent;
            this.container = container;
        }
        _createClass(_class, [
            {
                key: 'init',
                value: function init() {
                }
            },
            {
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
            },
            {
                key: 'rerender',
                value: function rerender() {
                    var focussedElementId = document.activeElement.id;
                    this.container.innerHTML = '';
                    this.container.appendChild(this.render());
                    ShippingRules.util.resizeFields();
                    this.focus(focussedElementId);
                    this.root.updateJSON();
                }
            },
            {
                key: 'updateJSON',
                value: function updateJSON() {
                    this.root.field.value = JSON.stringify(this.root);
                }
            },
            {
                key: 'focus',
                value: function focus(id) {
                    var element = document.getElementById(id);
                    if (element) {
                        element.focus();
                    }
                }
            },
            {
                key: 'renderRemoveButton',
                value: function renderRemoveButton() {
                    var _this = this;
                    if (this.parent instanceof ShippingRules.Base) {
                        return ShippingRules.util.removeButton(this, function () {
                            document.getElementById(_this.id).className += 'deleting';
                            _this.parent.removeChildByIndex(_this.index);
                            setTimeout(_this.root.rerender.bind(_this.root), 200);
                            _this.focus(_this.id);
                        });
                    }
                    return [];
                }
            },
            {
                key: 'keyHandler',
                value: function keyHandler(event) {
                    var i = undefined;
                    var caught = false;
                    if (~[
                            'INPUT',
                            'SELECT',
                            'BUTTON',
                            'TEXTAREA'
                        ].indexOf(event.target.tagName)) {
                        caught = true;
                        if (event.keyCode === 27) {
                            event.preventDefault();
                            event.target.closest('li').focus();
                        }
                    } else {
                        switch (event.keyCode) {
                        case 13:
                            if (event.target.tagName === 'LI') {
                                caught = true;
                                event.target.querySelector('input, select, button, textarea').focus();
                            }
                            break;
                        case 37:
                            if (event.target.tagName === 'LI') {
                                caught = true;
                                if (event.target.parentElement.parentElement.tagName === 'LI') {
                                    event.target.parentElement.parentElement.focus();
                                } else if (event.target.parentElement.parentElement.parentElement.tagName === 'LI') {
                                    event.target.parentElement.parentElement.parentElement.focus();
                                }
                            }
                            break;
                        case 38:
                            caught = true;
                            if (event.target.tagName === 'LI') {
                                event.preventDefault();
                                var treeItems = Array.from(this.root.container.querySelectorAll('li'));
                                i = treeItems.indexOf(event.target);
                                if (treeItems[i - 1]) {
                                    treeItems[i - 1].focus();
                                }
                            }
                            break;
                        case 39:
                            caught = true;
                            if (event.target.tagName === 'LI') {
                                event.preventDefault();
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
                            break;
                        case 40:
                            caught = true;
                            if (event.target.tagName === 'LI') {
                                var treeItems = Array.from(this.root.container.querySelectorAll('li'));
                                i = treeItems.indexOf(event.target);
                                if (treeItems[i + 1]) {
                                    treeItems[i + 1].focus();
                                }
                            }
                            break;
                        case 45:
                        case 59:
                        case 61:
                        case 107:
                        case 187:
                            caught = true;
                            if (event.target.tagName === 'LI') {
                                var target = this.root.getObjectById(event.target.id);
                                while (target.children === void 0) {
                                    target = target.parent;
                                }
                                this.focus(target.id + '-childselector');
                            }
                            break;
                        case 8:
                        case 46:
                        case 109:
                        case 173:
                        case 189:
                            caught = true;
                            if (event.target.tagName === 'LI') {
                                var target = this.root.getObjectById(event.target.id);
                                if (target && target.parent) {
                                    event.target.className += 'deleting';
                                    target.parent.removeChildByIndex(target.index);
                                    this.focus(target.id);
                                    if ((target = target.parent.children[target.index - 1]) && event.keyCode === 8) {
                                        this.focus(target.id);
                                    }
                                    setTimeout(this.root.rerender.bind(this.root), 200);
                                }
                            }
                            break;
                        default:
                        }
                        if (caught) {
                            event.preventDefault();
                        }
                    }
                    if (caught) {
                        event.stopPropagation();
                    }
                }
            },
            {
                key: 'index',
                set: function set(param) {
                    this._index = param;
                    return this;
                },
                get: function get() {
                    return this._index;
                }
            },
            {
                key: 'id',
                get: function get() {
                    if (this.parent instanceof ShippingRules.Base) {
                        return this.parent.id + '.' + this.index;
                    } else {
                        return this.index;
                    }
                }
            },
            {
                key: 'root',
                get: function get() {
                    var root = this;
                    while (root.parent instanceof ShippingRules.Base) {
                        root = root.parent;
                    }
                    return root;
                }
            },
            {
                key: 'context',
                set: function set(context) {
                    this._context = context;
                    return this;
                },
                get: function get() {
                    return this._context || this.parent && this.parent.context;
                }
            },
            {
                key: 'field',
                set: function set(input) {
                    this._field = input;
                    this.init(JSON.parse(input.value));
                    return this;
                },
                get: function get() {
                    return this._field;
                }
            }
        ]);
        return _class;
    }();
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Aggregator = function (_ShippingRules$Base) {
        _inherits(_class, _ShippingRules$Base);
        function _class(index) {
            var parent = arguments.length <= 1 || arguments[1] === undefined ? function () {
                var $$a = document.createElement('noscript');
                return $$a;
            }() : arguments[1];
            var container = arguments[2];
            _classCallCheck(this, _class);
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent, container));
            _this.children = [];
            _this.combinator = null;
            return _this;
        }
        _createClass(_class, [
            {
                key: 'removeChildByIndex',
                value: function removeChildByIndex(index) {
                    this.children.splice(index, 1);
                    this.reindexChildren();
                }
            },
            {
                key: 'reindexChildren',
                value: function reindexChildren() {
                    this.children.forEach(function (child, i) {
                        return child.index = i;
                    });
                    return this;
                }
            },
            {
                key: 'sortChildren',
                value: function sortChildren() {
                    this.children = this.children.sort(function (a, b) {
                        return a.index - b.index;
                    });
                    return this;
                }
            },
            {
                key: 'renderChildren',
                value: function renderChildren() {
                    var me = this;
                    return function () {
                        var $$b = document.createElement('ul');
                        $$b.appendChildren(me.children.map(function (child) {
                            return child.render();
                        }));
                        $$b.appendChildren(me.renderChildSelector());
                        return $$b;
                    }();
                }
            },
            {
                key: 'init',
                value: function init(obj) {
                    if (obj.register !== 'Aggregator' || ShippingRules.Register.aggregator.get(obj.key) !== this.constructor) {
                        return;
                    }
                    this.combinator = obj.type;
                }
            },
            {
                key: 'toJSON',
                value: function toJSON() {
                    return {
                        children: this.children,
                        register: 'Aggregator',
                        key: this.combinator
                    };
                }
            }
        ]);
        return _class;
    }(ShippingRules.Base);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _get = function get(object, property, receiver) {
    if (object === null)
        object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ('value' in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Aggregator.Boolean = function (_ShippingRules$Aggreg) {
        _inherits(_class, _ShippingRules$Aggreg);
        function _class(index) {
            var parent = arguments.length <= 1 || arguments[1] === undefined ? function () {
                var $$a = document.createElement('noscript');
                return $$a;
            }() : arguments[1];
            var container = arguments[2];
            _classCallCheck(this, _class);
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent, container));
            _this.combinator = ShippingRules.Aggregator.Boolean.CONJUNCTIVE;
            _this.value = true;
            return _this;
        }
        _createClass(_class, [
            {
                key: 'addChild',
                value: function addChild(childClass, index) {
                    index = index === void 0 || index === null ? this.children.length : index;
                    for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        params[_key - 2] = arguments[_key];
                    }
                    var reindex = index !== this.children.length, child = new (Function.prototype.bind.apply(childClass, [null].concat([
                            index,
                            this
                        ], params)))();
                    if (child instanceof ShippingRules.Condition || child instanceof this.constructor) {
                        this.children.splice(index, 0, child);
                        if (reindex)
                            this.reindexChildren();
                        return this.children[index];
                    } else {
                        console.error('ShippingRules: Boolean Aggregators only accept Conditions and Boolean Aggregators: ' + childClass + ' passed.');
                    }
                }
            },
            {
                key: 'replaceChildByIndex',
                value: function replaceChildByIndex(newChildClass, index) {
                    this.removeChildByIndex(index);
                    for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                        params[_key2 - 2] = arguments[_key2];
                    }
                    this.addChild.apply(this, [
                        newChildClass,
                        index
                    ].concat(params));
                    return this;
                }
            },
            {
                key: 'renderCombinator',
                value: function renderCombinator() {
                    var me = this;
                    return function () {
                        var $$b = document.createElement('select');
                        $$b.setAttribute('id', me.id + '-combinator');
                        $$b.addEventListener('change', function (event) {
                            return me.combinator = event.target.value;
                        });
                        var $$c = document.createElement('option');
                        $$c.setAttribute('value', ShippingRules.Aggregator.Boolean.CONJUNCTIVE);
                        $$b.appendChild($$c);
                        var $$d = document.createTextNode('ALL');
                        $$c.appendChild($$d);
                        var $$e = document.createElement('option');
                        $$e.setAttribute('value', ShippingRules.Aggregator.Boolean.DISJUNCTIVE);
                        $$b.appendChild($$e);
                        var $$f = document.createTextNode('ANY');
                        $$e.appendChild($$f);
                        return $$b;
                    }();
                }
            },
            {
                key: 'renderValue',
                value: function renderValue() {
                    var me = this;
                    return function () {
                        var $$g = document.createElement('select');
                        $$g.setAttribute('id', me.id + '-value');
                        $$g.addEventListener('change', function (event) {
                            return me.value = !!+event.target.value;
                        });
                        var $$h = document.createElement('option');
                        $$h.setAttribute('value', '1');
                        $$g.appendChild($$h);
                        var $$i = document.createTextNode('TRUE');
                        $$h.appendChild($$i);
                        var $$j = document.createElement('option');
                        $$j.setAttribute('value', '0');
                        $$g.appendChild($$j);
                        var $$k = document.createTextNode('FALSE');
                        $$j.appendChild($$k);
                        return $$g;
                    }();
                }
            },
            {
                key: 'renderChildSelector',
                value: function renderChildSelector() {
                    var me = this;
                    return function () {
                        var $$l = document.createElement('li');
                        $$l.setAttribute('id', me.id + '.' + me.children.length);
                        $$l.addEventListener('keydown', me.keyHandler.bind(me));
                        $$l.setAttribute('tabIndex', 0);
                        var $$m = document.createElement('select');
                        $$m.setAttribute('id', me.id + '-childselector');
                        $$m.setAttribute('aria-label', 'Condition');
                        $$m.addEventListener('change', function (event) {
                            var selected = event.target.selectedOptions[0];
                            var registerKey = selected.getAttribute('data-register-key');
                            var variable = selected.value;
                            var id = undefined;
                            if (variable === 'this') {
                                id = me.addChild(me.constructor).id;
                            } else {
                                id = me.addChild(ShippingRules.Register.condition.get(registerKey), void 0, variable).id;
                            }
                            me.root.rerender();
                            me.root.focus(id);
                        });
                        $$l.appendChild($$m);
                        var $$n = document.createElement('option');
                        $$n.disabled = true;
                        $$n.setAttribute('selected', 'selected');
                        $$m.appendChild($$n);
                        var $$o = document.createTextNode('[SELECT]');
                        $$n.appendChild($$o);
                        $$m.appendChildren(ShippingRules.Register.condition.getAsOptions(me.context));
                        var $$q = document.createElement('option');
                        $$q.setAttribute('value', 'this');
                        $$m.appendChild($$q);
                        var $$r = document.createTextNode('Condition Combination');
                        $$q.appendChild($$r);
                        return $$l;
                    }();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    return function () {
                        var $$s = document.createElement('li');
                        $$s.setAttribute('id', me.id);
                        $$s.addEventListener('keydown', me.keyHandler.bind(me));
                        $$s.setAttribute('tabIndex', 0);
                        var $$t = document.createTextNode('\n                If ');
                        $$s.appendChild($$t);
                        $$s.appendChildren(me.renderCombinator());
                        var $$v = document.createTextNode(' of these conditions are ');
                        $$s.appendChild($$v);
                        $$s.appendChildren(me.renderValue());
                        var $$x = document.createTextNode(': ');
                        $$s.appendChild($$x);
                        $$s.appendChildren(me.renderRemoveButton());
                        $$s.appendChildren(me.renderChildren());
                        return $$s;
                    }();
                }
            },
            {
                key: 'init',
                value: function init(obj) {
                    var _this2 = this;
                    _get(Object.getPrototypeOf(_class.prototype), 'init', this).call(this, obj);
                    this.value = typeof obj.value === 'boolean' ? obj.value : true;
                    if (obj.children) {
                        obj.children.forEach(function (child) {
                            if (child.register === 'Condition') {
                                _this2.addChild(ShippingRules.Register.condition.get(child.key)).init(child);
                            } else if (child.register === 'Aggregator') {
                                _this2.addChild(ShippingRules.Register.aggregator.get(child.key)).init(child);
                            }
                        });
                    }
                }
            },
            {
                key: 'toJSON',
                value: function toJSON() {
                    var obj = _get(Object.getPrototypeOf(_class.prototype), 'toJSON', this).call(this);
                    obj.value = this.value;
                    return obj;
                }
            },
            {
                key: 'combinator',
                set: function set(param) {
                    if (~[
                            ShippingRules.Aggregator.Boolean.CONJUNCTIVE,
                            ShippingRules.Aggregator.Boolean.DISJUNCTIVE
                        ].indexOf(param)) {
                        this._combinator = param;
                    }
                    return this;
                },
                get: function get() {
                    return this._combinator;
                }
            }
        ]);
        return _class;
    }(ShippingRules.Aggregator);
    Object.defineProperties(ShippingRules.Aggregator.Boolean, {
        CONJUNCTIVE: { value: 'Conjunctive' },
        DISJUNCTIVE: { value: 'Disjunctive' }
    });
    ShippingRules.Register.aggregator.add('Boolean', ShippingRules.Aggregator.Boolean);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _get = function get(object, property, receiver) {
    if (object === null)
        object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ('value' in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Aggregator.Numeric = function (_ShippingRules$Aggreg) {
        _inherits(_class, _ShippingRules$Aggreg);
        function _class(index) {
            var parent = arguments.length <= 1 || arguments[1] === undefined ? function () {
                var $$a = document.createElement('noscript');
                return $$a;
            }() : arguments[1];
            var container = arguments[2];
            _classCallCheck(this, _class);
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent, container));
            _this.combinator = 'Summative';
            return _this;
        }
        _createClass(_class, [
            {
                key: 'addChild',
                value: function addChild(childClass, index) {
                    index = index === void 0 || index === null ? this.children.length : index;
                    for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        params[_key - 2] = arguments[_key];
                    }
                    var reindex = index !== this.children.length, child = new (Function.prototype.bind.apply(childClass, [null].concat([
                            index,
                            this
                        ], params)))();
                    if (child instanceof ShippingRules.Term || child instanceof this.constructor) {
                        this.children.splice(index, 0, child);
                        if (reindex)
                            this.reindexChildren();
                        return this.children[index];
                    } else {
                        console.error('ShippingRules: Numeric Aggregators only accept Terms and Numeric Aggregators: ' + childClass + ' passed.');
                    }
                }
            },
            {
                key: 'replaceChildByIndex',
                value: function replaceChildByIndex(newChildClass, index) {
                    this.removeChildByIndex(index);
                    for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                        params[_key2 - 2] = arguments[_key2];
                    }
                    this.addChild.apply(this, [
                        newChildClass,
                        index
                    ].concat(params));
                    return this;
                }
            },
            {
                key: 'renderChildSelector',
                value: function renderChildSelector() {
                    var me = this;
                    return function () {
                        var $$b = document.createElement('li');
                        $$b.setAttribute('id', me.id + '.' + me.children.length);
                        $$b.addEventListener('keydown', me.keyHandler.bind(me));
                        $$b.setAttribute('tabIndex', 0);
                        var $$c = document.createElement('select');
                        $$c.setAttribute('id', me.id + '-childselector');
                        $$c.setAttribute('aria-label', 'Type of value');
                        $$c.addEventListener('change', function (event) {
                            var child = event.target.value === 'this' ? me.constructor : ShippingRules.Register.term.get(event.target.value);
                            var id = me.addChild(child).id;
                            me.root.rerender();
                            me.root.focus(id);
                        });
                        $$b.appendChild($$c);
                        var $$d = document.createElement('option');
                        $$d.disabled = true;
                        $$d.setAttribute('selected', 'selected');
                        $$c.appendChild($$d);
                        var $$e = document.createTextNode('[SELECT]');
                        $$d.appendChild($$e);
                        $$c.appendChildren(ShippingRules.Register.term.getAsOptions());
                        var $$g = document.createElement('option');
                        $$g.setAttribute('value', 'this');
                        $$c.appendChild($$g);
                        var $$h = document.createTextNode('Sum of values');
                        $$g.appendChild($$h);
                        return $$b;
                    }();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    return function () {
                        var $$i = document.createElement('li');
                        $$i.setAttribute('id', me.id);
                        $$i.addEventListener('keydown', me.keyHandler.bind(me));
                        $$i.setAttribute('tabIndex', 0);
                        var $$j = document.createTextNode('\n                Sum of these values: ');
                        $$i.appendChild($$j);
                        $$i.appendChildren(me.renderRemoveButton());
                        $$i.appendChildren(me.renderChildren());
                        return $$i;
                    }();
                }
            },
            {
                key: 'init',
                value: function init(obj) {
                    var _this2 = this;
                    _get(Object.getPrototypeOf(_class.prototype), 'init', this).call(this, obj);
                    if (obj.children) {
                        obj.children.forEach(function (child) {
                            if (child.register === 'Term') {
                                _this2.addChild(ShippingRules.Register.term.get(child.key)).init(child);
                            } else if (child.register === 'Aggregator') {
                                _this2.addChild(ShippingRules.Register.aggregator.get(child.key)).init(child);
                            }
                        });
                    }
                }
            }
        ]);
        return _class;
    }(ShippingRules.Aggregator);
    ShippingRules.Register.aggregator.add('Numeric', ShippingRules.Aggregator.Numeric);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Term = function (_ShippingRules$Base) {
        _inherits(_class, _ShippingRules$Base);
        function _class(index, parent) {
            _classCallCheck(this, _class);
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent));
            _this._value = 0;
            return _this;
        }
        _createClass(_class, [
            {
                key: 'init',
                value: function init(obj) {
                    if (obj.register !== 'Term' || ShippingRules.Register.term.get(obj.key) !== this.constructor) {
                        return;
                    }
                    this.combinator = obj.type;
                }
            },
            {
                key: 'toJSON',
                value: function toJSON() {
                    return {
                        register: 'Term',
                        value: this.value
                    };
                }
            },
            {
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
            }
        ]);
        return _class;
    }(ShippingRules.Base);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _get = function get(object, property, receiver) {
    if (object === null)
        object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ('value' in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Term.Conditional = function (_ShippingRules$Term) {
        _inherits(_class, _ShippingRules$Term);
        function _class(index, parent) {
            _classCallCheck(this, _class);
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent));
            _this.aggregator = new ShippingRules.Aggregator.Boolean(0, _this);
            return _this;
        }
        _createClass(_class, [
            {
                key: 'renderValue',
                value: function renderValue() {
                    var me = this;
                    return function () {
                        var $$a = document.createElement('input');
                        $$a.setAttribute('id', me.id + '-value');
                        $$a.setAttribute('type', 'number');
                        $$a.setAttribute('value', me.value);
                        $$a.addEventListener('keydown', function (event) {
                            return me.value = event.target.value;
                        });
                        return $$a;
                    }();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    return function () {
                        var $$b = document.createElement('li');
                        $$b.setAttribute('id', me.id);
                        $$b.addEventListener('keydown', me.keyHandler.bind(me));
                        $$b.setAttribute('tabIndex', 0);
                        var $$c = document.createTextNode('\n                Constant value of ');
                        $$b.appendChild($$c);
                        $$b.appendChildren(me.renderValue());
                        var $$e = document.createElement('span');
                        $$e.setAttribute('id', me.aggregator.id);
                        $$b.appendChild($$e);
                        var $$f = document.createTextNode('\n                    if ');
                        $$e.appendChild($$f);
                        $$e.appendChildren(me.aggregator.renderCombinator());
                        var $$h = document.createTextNode(' of these conditions are ');
                        $$e.appendChild($$h);
                        $$e.appendChildren(me.aggregator.renderValue());
                        var $$j = document.createTextNode(': ');
                        $$e.appendChild($$j);
                        $$e.appendChildren(me.renderRemoveButton());
                        $$e.appendChildren(me.aggregator.renderChildren());
                        return $$b;
                    }();
                }
            },
            {
                key: 'init',
                value: function init(obj) {
                    _get(Object.getPrototypeOf(_class.prototype), 'init', this).call(this, obj);
                    this.aggregator.init(obj.aggregator);
                }
            },
            {
                key: 'toJSON',
                value: function toJSON() {
                    var obj = _get(Object.getPrototypeOf(_class.prototype), 'toJSON', this).call(this);
                    obj.key = 'Conditional';
                    obj.aggregator = this.aggregator;
                    return obj;
                }
            }
        ], [{
                key: 'name',
                value: function name() {
                    return 'Conditional Value';
                }
            }]);
        return _class;
    }(ShippingRules.Term);
    ShippingRules.Register.term.add('Conditional', ShippingRules.Term.Conditional);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _get = function get(object, property, receiver) {
    if (object === null)
        object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ('value' in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Term.Constant = function (_ShippingRules$Term) {
        _inherits(_class, _ShippingRules$Term);
        function _class(index, parent) {
            _classCallCheck(this, _class);
            return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent));
        }
        _createClass(_class, [
            {
                key: 'renderValue',
                value: function renderValue() {
                    var me = this;
                    return function () {
                        var $$a = document.createElement('input');
                        $$a.setAttribute('id', me.id + '-value');
                        $$a.setAttribute('type', 'number');
                        $$a.setAttribute('value', me.value);
                        $$a.addEventListener('keydown', function (event) {
                            return me.value = event.target.value;
                        });
                        return $$a;
                    }();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    return function () {
                        var $$b = document.createElement('li');
                        $$b.setAttribute('id', me.id);
                        $$b.addEventListener('keydown', me.keyHandler.bind(me));
                        $$b.setAttribute('tabIndex', 0);
                        var $$c = document.createTextNode('Constant value of ');
                        $$b.appendChild($$c);
                        $$b.appendChildren(me.renderValue());
                        $$b.appendChildren(me.renderRemoveButton());
                        return $$b;
                    }();
                }
            },
            {
                key: 'toJSON',
                value: function toJSON() {
                    var obj = _get(Object.getPrototypeOf(_class.prototype), 'toJSON', this).call(this);
                    obj.key = 'Constant';
                    return obj;
                }
            }
        ], [{
                key: 'name',
                value: function name() {
                    return 'Constant Value';
                }
            }]);
        return _class;
    }(ShippingRules.Term);
    ShippingRules.Register.term.add('Constant', ShippingRules.Term.Constant);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Condition = function (_ShippingRules$Base) {
        _inherits(_class, _ShippingRules$Base);
        function _class(index, parent, variable) {
            _classCallCheck(this, _class);
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent));
            _this.variable = variable;
            var validComparators = ShippingRules.Register.comparator.getByType(_this.type);
            var comparator = validComparators[Object.keys(validComparators)[0]];
            _this.comparator = comparator ? new comparator(_this.type) : function () {
                var $$a = document.createElement('noscript');
                return $$a;
            }();
            _this.value = '';
            _this.valueField = comparator ? new (ShippingRules.Register.field.get(_this.comparator.getField()))(_this, _this.value) : function () {
                var $$b = document.createElement('noscript');
                return $$b;
            }();
            return _this;
        }
        _createClass(_class, [
            {
                key: 'renderComparator',
                value: function renderComparator() {
                    var me = this;
                    return function () {
                        var $$c = document.createElement('select');
                        $$c.setAttribute('id', me.id + '-comparator');
                        $$c.addEventListener('change', function (event) {
                            me.comparator = new (ShippingRules.Register.comparator.get(event.target.value))();
                            me.valueField = new (ShippingRules.Register.field.get(me.comparator.getField()))(me, me.value);
                            me.root.render();
                        });
                        $$c.appendChildren(ShippingRules.Register.comparator.getAsOptions(me.type, me.comparator.name));
                        return $$c;
                    }();
                }
            },
            {
                key: 'valueChangeHandler',
                value: function valueChangeHandler(value) {
                    this.value = value;
                    this.root.updateJSON();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var me = this;
                    return function () {
                        var $$e = document.createElement('li');
                        $$e.setAttribute('id', me.id);
                        $$e.setAttribute('tabIndex', 0);
                        $$e.appendChildren(me.label);
                        $$e.appendChildren(me.renderComparator());
                        $$e.appendChildren(me.valueField.render());
                        $$e.appendChildren(me.renderRemoveButton());
                        return $$e;
                    }();
                }
            },
            {
                key: 'init',
                value: function init(obj) {
                    this.variable = obj.variable;
                    this.value = obj.value;
                    this.comparator = new (ShippingRules.Register.comparator.get(obj.comparator.key))(this.type);
                    this.valueField = new (ShippingRules.Register.field.get(this.comparator.getField()))(this, this.value);
                }
            },
            {
                key: 'toJSON',
                value: function toJSON() {
                    return {
                        register: 'Condition',
                        variable: this.variable,
                        comparator: this.comparator,
                        value: this.value
                    };
                }
            },
            {
                key: 'label',
                get: function get() {
                    var variable = this.constructor.getVariables(this.parent && this.parent.context)[this.variable];
                    return variable ? variable.label : '';
                }
            },
            {
                key: 'type',
                get: function get() {
                    var variable = this.constructor.getVariables(this.parent && this.parent.context)[this.variable];
                    return variable ? variable.type : [];
                }
            }
        ], [
            {
                key: 'getCategory',
                value: function getCategory(context) {
                    return null;
                }
            },
            {
                key: 'getVariables',
                value: function getVariables(context) {
                    return {};
                }
            }
        ]);
        return _class;
    }(ShippingRules.Base);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _get = function get(object, property, receiver) {
    if (object === null)
        object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ('value' in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Condition.Cart = function (_ShippingRules$Condit) {
        _inherits(_class, _ShippingRules$Condit);
        function _class(index, parent, variable) {
            _classCallCheck(this, _class);
            return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent, variable));
        }
        _createClass(_class, [{
                key: 'toJSON',
                value: function toJSON() {
                    var obj = _get(Object.getPrototypeOf(_class.prototype), 'toJSON', this).call(this);
                    obj.key = 'Cart';
                    return obj;
                }
            }], [
            {
                key: 'getCategory',
                value: function getCategory(context) {
                    return 'Cart Conditions';
                }
            },
            {
                key: 'getVariables',
                value: function getVariables(context) {
                    var variables = {};
                    if (!context) {
                        variables['package_weight'] = {
                            label: 'Total Weight',
                            type: ['number']
                        };
                        variables['package_quantity'] = {
                            label: 'Total Items Quantity',
                            type: ['number']
                        };
                        variables['package_value'] = {
                            label: 'Subtotal excl. Tax',
                            type: ['currency']
                        };
                        variables['base_subtotal_incl_tax'] = {
                            label: 'Subtotal incl. Tax',
                            type: ['currency']
                        };
                        variables['package_value_with_discount'] = {
                            label: 'Subtotal after Discount',
                            type: ['currency']
                        };
                    }
                    return variables;
                }
            }
        ]);
        return _class;
    }(ShippingRules.Condition);
    ShippingRules.Register.condition.add('Cart', ShippingRules.Condition.Cart);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _get = function get(object, property, receiver) {
    if (object === null)
        object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ('value' in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Condition.Customer = function (_ShippingRules$Condit) {
        _inherits(_class, _ShippingRules$Condit);
        function _class(index, parent, variable) {
            _classCallCheck(this, _class);
            return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, index, parent, variable));
        }
        _createClass(_class, [{
                key: 'toJSON',
                value: function toJSON() {
                    var obj = _get(Object.getPrototypeOf(_class.prototype), 'toJSON', this).call(this);
                    obj.key = 'Customer';
                    return obj;
                }
            }], [
            {
                key: 'getCategory',
                value: function getCategory(context) {
                    return 'Customer Conditions';
                }
            },
            {
                key: 'getVariables',
                value: function getVariables(context) {
                    var variables = {};
                    if (!context) {
                        variables['customer_group'] = {
                            label: 'Customer Group',
                            type: ['number']
                        };
                    }
                    return variables;
                }
            }
        ]);
        return _class;
    }(ShippingRules.Condition);
    ShippingRules.Register.condition.add('Customer', ShippingRules.Condition.Customer);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
(function (ShippingRules) {
    ShippingRules.Comparator = function () {
        function _class(type) {
            _classCallCheck(this, _class);
            this.type = type;
        }
        _createClass(_class, [
            {
                key: 'toJSON',
                value: function toJSON() {
                    return { register: 'Comparator' };
                }
            },
            {
                key: 'name',
                get: function get() {
                    return this.constructor.name(this.type);
                }
            }
        ], [
            {
                key: 'supportedTypes',
                value: function supportedTypes() {
                    return [];
                }
            },
            {
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
            },
            {
                key: 'name',
                value: function name(type) {
                    return {};
                }
            }
        ]);
        return _class;
    }();
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _get = function get(object, property, receiver) {
    if (object === null)
        object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ('value' in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Comparator.Equal = function (_ShippingRules$Compar) {
        _inherits(_class, _ShippingRules$Compar);
        function _class(type) {
            _classCallCheck(this, _class);
            return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, type));
        }
        _createClass(_class, [
            {
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
            },
            {
                key: 'toJSON',
                value: function toJSON() {
                    var obj = _get(Object.getPrototypeOf(_class.prototype), 'toJSON', this).call(this);
                    obj.key = 'Equal';
                    return obj;
                }
            }
        ], [
            {
                key: 'supportedTypes',
                value: function supportedTypes() {
                    return [
                        'number',
                        'currency',
                        'string',
                        'enum',
                        'date',
                        'time',
                        'datetime'
                    ];
                }
            },
            {
                key: 'name',
                value: function name(type) {
                    var _this3 = this;
                    type = type.filter(function (t) {
                        return ~_this3.supportedTypes().indexOf(t);
                    }.bind(this));
                    switch (type[0]) {
                    case 'number':
                    case 'currency':
                        return 'EQUALS';
                    default:
                        return 'IS';
                    }
                }
            }
        ]);
        return _class;
    }(ShippingRules.Comparator);
    ShippingRules.Register.comparator.add('Equal', ShippingRules.Comparator.Equal);
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
(function (ShippingRules) {
    ShippingRules.Field = function () {
        function _class(condition, value) {
            _classCallCheck(this, _class);
            this.condition = condition;
            this.idPrefix = condition ? condition.id : function () {
                var $$a = document.createElement('noscript');
                return $$a;
            }();
            this.value = value;
        }
        _createClass(_class, [{
                key: 'valueChangeHandler',
                value: function valueChangeHandler(event) {
                    this.condition.valueChangeHandler(event.target.value);
                }
            }]);
        return _class;
    }();
}(Meanbee.ShippingRules));
'use strict';
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
(function (ShippingRules) {
    ShippingRules.Field.Text = function (_ShippingRules$Field) {
        _inherits(_class, _ShippingRules$Field);
        function _class() {
            _classCallCheck(this, _class);
            return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
        }
        _createClass(_class, [{
                key: 'render',
                value: function render() {
                    var me = this;
                    return function () {
                        var $$a = document.createElement('input');
                        $$a.setAttribute('type', 'text');
                        $$a.setAttribute('id', me.idPrefix + '-value');
                        $$a.setAttribute('value', me.value);
                        $$a.addEventListener('change', me.valueChangeHandler.bind(me));
                        return $$a;
                    }();
                }
            }]);
        return _class;
    }(ShippingRules.Field);
    ShippingRules.Register.field.add('Text', ShippingRules.Field.Text);
}(Meanbee.ShippingRules));
'use strict';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var priceField = document.getElementById('price');
        priceField.hidden = true;
        var priceContainer = document.createElement('ul');
        priceContainer.classList.add('calculator-tree');
        priceField.parentElement.appendChild(priceContainer);
        window.priceCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Numeric'))('priceCalculator', null, priceContainer);
        window.priceCalc.field = priceField;
        priceContainer.appendChild(window.priceCalc.render());
        var costField = document.getElementById('cost');
        costField.hidden = true;
        var costContainer = document.createElement('ul');
        costContainer.classList.add('calculator-tree');
        costField.parentElement.appendChild(costContainer);
        window.costCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Numeric'))('costCalculator', null, costContainer);
        window.costCalc.field = costField;
        costContainer.appendChild(window.costCalc.render());
        var condField = document.getElementById('conditions');
        condField.hidden = true;
        var condContainer = document.createElement('ul');
        condContainer.classList.add('calculator-tree');
        condField.parentElement.appendChild(condContainer);
        window.condCalc = new (Meanbee.ShippingRules.Register.aggregator.get('Boolean'))('conditionCalculator', null, condContainer);
        window.condCalc.field = condField;
        condContainer.appendChild(window.condCalc.render());
        function changeHandler(event) {
            if (~[
                    'INPUT',
                    'SELECT'
                ].indexOf(event.target.tagName))
                Meanbee.ShippingRules.util.resizeFields();
        }
        document.body.addEventListener('change', changeHandler, false);
        document.body.addEventListener('keyup', changeHandler, false);
        Meanbee.ShippingRules.util.resizeFields();
    });
}());