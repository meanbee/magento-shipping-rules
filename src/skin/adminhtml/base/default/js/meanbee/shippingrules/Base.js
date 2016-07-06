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
            if (this.aggregator)  {
                let aggregatorResult = this.aggregator.getObjectById(id);
                if (aggregatorResult) {
                    return aggregatorResult;
                }
            }
            if (this.term)  {
                let termResult = this.term.getObjectById(id);
                if (termResult) {
                    return termResult;
                }
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

        delete(navDir) {
            if (this.parent) {
                document.getElementById(this.id).className += 'deleting';
                this.parent.removeChildByIndex(this.index);
                this.focus(this.id);
                let target;
                if ((target = this.parent.children[this.index - 1]) && !navDir) {
                    this.focus(target.id);
                }
                this.root.updateJSON();
                setTimeout(this.root.rerender.bind(this.root), 200);
                ShippingRules.history.pushState();
            }
        }

        rerender() {
            let focussedElementId = document.activeElement.id;
            this.container.innerHTML = '';
            this.container.appendChild(this.render());
            ShippingRules.util.resizeFields();
            this.focus(focussedElementId);
            this.root.updateJSON();
        }

        refresh() {
            // NOOP
        }

        updateJSON() {
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
                return ShippingRules.util.removeButton(this, this.delete.bind(this));
            }
            return [];
        }

        keyHandler(event) {
            if (~['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].indexOf(event.target.tagName)) {
                if (event.keyCode === 27) { // Escape
                    ShippingRules.navigateTo.escape(event);
                }
            } else {
                switch  (event.keyCode) {
                case 13: // Enter
                    ShippingRules.navigateTo.firstField(event);
                    break;
                case 27: // Escape
                    ShippingRules.navigateTo.escape(event);
                    break;
                case 37: // Left Arrow
                    ShippingRules.navigateTo.parentTree(event);
                    break;
                case 38: // Up Arrow
                    ShippingRules.navigateTo.previous(event, this);
                    break;
                case 39: // Right Arrow
                    ShippingRules.navigateTo.childTree(event);
                    break;
                case 40: // Down Arrow
                    ShippingRules.navigateTo.next(event, this);
                    break;
                case 45: // Insert
                case 59: // Equals [Plus, onshift]
                case 61: // Equals [Plus, onshift] (firefox)
                case 107: // Add [NumPad]
                case 187: // Equals [Plus, onshift]
                    ShippingRules.navigateTo.new(event, this);
                    break;
                case 8: // Backspace
                case 46: // Delete
                case 109: // Subtract [NumPad]
                case 173: // Minus (firefox)
                case 189: // Dash
                    if (event.target.tagName === 'LI') {
                        event.preventDefault();
                        this.root.getObjectById(event.target.id).delete(event.keyCode !== 8); // Backspace
                    }
                    break;
                case 67: // C
                    if (event.metaKey || event.ctrlKey) { // ⌘C | Ctrl-C
                        if (event.target.tagName === 'LI') {
                            ShippingRules.clipboard.copy(this.root.getObjectById(event.target.id));
                        }
                    }
                    break;
                case 86: // V
                    if (event.metaKey || event.ctrlKey) { // ⌘V | Ctrl-V
                        event.preventDefault();
                        if (event.target.tagName === 'LI') {
                            ShippingRules.clipboard.paste(this.root.getObjectById(event.target.id));
                        }
                    }
                    break;
                case 88: // X
                    if (event.metaKey || event.ctrlKey) { // ⌘X | Ctrl-X
                        event.preventDefault();
                        if (event.target.tagName === 'LI') {
                            ShippingRules.clipboard.copy(this.root.getObjectById(event.target.id));
                            this.root.getObjectById(event.target.id).delete();
                        }
                    }
                    break;
                case 89: // Y
                    if (event.metaKey || event.ctrlKey) { // ⌘Y | Ctrl-Y
                        event.preventDefault();
                        ShippingRules.history.redo();
                    }
                    break;
                case 90: // Z
                    if (event.metaKey || event.ctrlKey) { // ⌘Z | Ctrl-Z
                        event.preventDefault();
                        ShippingRules.history.undo();
                    }
                    break;
                default:
                }
            }
            if (event.target.tagName === 'LI') {
                event.stopPropagation();
            }
        }

        copyText(event) {
            let text = Array.from(this.childNodes).map(function naturalise(node) {
                if (node instanceof Text) return node.data.trim();
                if (node instanceof HTMLSelectElement) {
                    if (node.id.endsWith('-childselector')) return [];
                    return node.selectedOptions[0].innerText;
                }
                if (node instanceof HTMLInputElement) return node.value;
                if (node instanceof HTMLUListElement) return '<ul>' + ShippingRules.util.flatten(Array.from(node.childNodes).map(naturalise)).join(' ') + '</ul>';
                if (node instanceof HTMLLIElement) return '<li>' + ShippingRules.util.flatten(Array.from(node.childNodes).map(naturalise)).join(' ') + '</li>';
                return ShippingRules.util.flatten(Array.from(node.childNodes).map(naturalise));
            }).join(' ').replace(/<li><\/li>/g,'').replace(/>\s</g,'><').replace(/<ul><\/ul>/g,'');
            event.clipboardData.setData('text/html', text);
            event.preventDefault();
        }
    }
})(Meanbee.ShippingRules);