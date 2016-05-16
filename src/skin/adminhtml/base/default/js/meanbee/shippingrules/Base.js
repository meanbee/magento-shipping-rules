'use strict';
(function (ShippingRules) {
    ShippingRules.Base = class {
        constructor(index, parent, container) {
            this.index = index;
            this.parent = parent;
            this.container = container;
        }

        set index(param) {
            this._index = param;
            return this;
        }

        get index() {
            return this._index;
        }

        get id() {
            if (this.parent instanceof ShippingRules.Base) {
                return `${this.parent.id}.${this.index}`;
            } else {
                return this.index;
            }
        }

        get root() {
            let root = this;
            while (root.parent instanceof ShippingRules.Base) {
                root = root.parent;
            }
            return root;
        }

        set context(context) {
            this._context = context;
            return this;
        }

        get context() {
            return this._context || this.parent && this.parent.context;
        }

        set field(input) {
            this._field = input;
            this.init(JSON.parse(input.value));
            return this;
        }

        get field() {
            return this._field;
        }

        init() {}

        getObjectById(id) {
            if (this.id === id) {
                return this;
            }
            if (!this.children) {
                return null;
            }
            for (let i = 0; i < this.children.length; i++) {
                let childResult = this.children[i].getObjectById(id);
                if (childResult) {
                    return childResult;
                }
            }
            return null;
        }

        rerender() {
            let focussedElementId = document.activeElement.id;
            this.container.innerHTML = '';
            this.container.appendChild(this.render());
            ShippingRules.util.resizeFields();
            this.focus(focussedElementId);
            this.root.field.value = JSON.stringify(this.root);
        }

        focus(id) {
            let element = document.getElementById(id);
            if (element) {
                element.focus();
            }
        }

        renderRemoveButton() {
            if (this.parent instanceof ShippingRules.Base) {
                return ShippingRules.util.removeButton(this, () => {
                    this.parent.removeChildByIndex(this.index);
                    this.root.rerender();
                    this.focus(this.id);
                });
            }
            return [];
        }

        keyHandler(event) {
            let i;
            let caught = false;
            if (~['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].indexOf(event.target.tagName)) {
                caught = true;
                if (event.keyCode === 27) { // Escape
                    event.preventDefault();
                    event.target.closest('li').focus();
                }
            } else {
                switch  (event.keyCode) {
                case 13: // Enter
                    if (event.target.tagName === 'LI') {
                        caught = true;
                        event.target.querySelector('input, select, button, textarea').focus();
                    }
                    break;
                case 37: // Left Arrow
                    if (event.target.tagName === 'LI') {
                        caught = true;
                        if (event.target.parentElement.parentElement.tagName === 'LI') {
                            event.target.parentElement.parentElement.focus();
                        }
                    }
                    break;
                case 38: // Up Arrow
                    caught = true;
                    if (event.target.tagName === 'LI') {
                        event.preventDefault();
                        let treeItems = Array.from(this.root.container.querySelectorAll('li'));
                        i = treeItems.indexOf(event.target);
                        if (treeItems[i - 1]) {
                            treeItems[i - 1].focus();
                        }
                    }
                    break;
                case 39: // Right Arrow
                    caught = true;
                    if (event.target.tagName === 'LI') {
                        event.preventDefault();
                        if (~(i = Array.from(event.target.children).map(child => child.tagName).indexOf('UL'))) {
                            event.target.children[i].children[0].focus();
                        }
                    }
                    break;
                case 40: // Down Arrow
                    caught = true;
                    if (event.target.tagName === 'LI') {
                        let treeItems = Array.from(this.root.container.querySelectorAll('li'));
                        i = treeItems.indexOf(event.target);
                        if (treeItems[i + 1]) {
                            treeItems[i + 1].focus();
                        }
                    }
                    break;
                case 45: // Insert
                case 59: // Equals [Plus, onshift]
                case 61: // Equals [Plus, onshift] (firefox)
                case 107: // Add [NumPad]
                case 187: // Equals [Plus, onshift]
                    caught = true;
                    if (event.target.tagName === 'LI') {
                        let target = this.root.getObjectById(event.target.id);
                        while (target.children === void 0) {
                            target = target.parent;
                        }
                        this.focus(target.id + '-childselector');
                    }
                    break;
                case 8: // Backspace
                case 46: // Delete
                case 109: // Subtract [NumPad]
                case 173: // Minus (firefox)
                case 189: // Dash
                    caught = true;
                    if (event.target.tagName === 'LI') {
                        let target = this.root.getObjectById(event.target.id);
                        if (target && target.parent) {
                            target.parent.removeChildByIndex(target.index);
                            this.root.rerender();
                            this.focus(target.id);
                        }
                    }
                    break;
                default:
                }
                if (caught) {
                    event.preventDefault();
                }
            }
            if (caught)  {
                event.stopPropagation();
            }
        }
    }
})(Meanbee.ShippingRules);