import navigateTo from './navigation';
import clipboard from './clipboard'
import util from './util';

/**
 * The base class from which all tree items should inherit.
 * @memberof Meanbee.ShippingRules
 */
class Base
{
    /**
     * @param {(number|string)} index The index at which you can find this among the children of it's parent.
     * @param {Meanbee.ShippingRules.Base} parent The parent tree item.
     * @param {Element} container The element in which this calculator field is rendered.
     */
    constructor(index, parent, container) {
        this.index = index;
        this.parent = parent;
        this.container = container;
    }

    /**
     * The index at which you can find this among the children of it's parent.
     * @type {(number|string)}
     */
    set index(param) {
        this._index = param;
        return this;
    }

    get index() {
        return this._index;
    }

    /**
     * The unique identifier of the tree item, used the the id attibute on it's root element.
     * @type {string}
     */
    get id() {
        if (this.parent instanceof Base) {
            return this.parent.id + '.' + this.index;
        } else {
            return this.index;
        }
    }

    /**
     * The root tree item.
     * @type {Meanbee.ShippingRules.Aggregator}
     */
    get root() {
        let root = this;
        while (root.parent instanceof Base) {
            root = root.parent;
        }
        return root;
    }

    /**
     * The tree item that defines the context of its children.
     * @type {Meanbee.ShippingRules.Base}
     */
    set context(context) {
        this._context = context;
        return this;
    }

    get context() {
        return this._context || this.parent && this.parent.context;
    }

    /**
     * The input field that holds the serialised form of the calculator field. 
     * @type {HTMLInputElement}
     */
    set field(input) {
        this._field = input;
        this.init(JSON.parse(input.value || '{}'));
        return this;
    }

    get field() {
        return this._field;
    }

    /**
     * Initialises the trree item with its serialised form.
     * @abstract
     * @return {this}
     */
    init() {
        return this;
    }

    /**
     * Gets the child that matches the passed id.
     * @param {string} id The id to search for.
     * @return {Meanbee.ShippingRules.Base} The matching child.
     */
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

    /**
     * Removes the tree item from its parent, thereby deleting it.
     * @param {number} navDir The direction (+/-) in which to move the keyboard focus.
     * @return {this} The removed tree item.
     */
    delete(navDir) {
        if (this.parent) {
            document.getElementById(this.id).className += 'deleting';
            this.parent.removeChildByIndex(this.index);
            if (navDir > 0) this.focus(this.id);
            let target;
            if ((target = this.parent.children[this.index - 1]) && navDir < 0) {
                this.focus(target.id);
            }
            this.root.updateJSON();
            setTimeout(this.root.rerender.bind(this.root), 200);
            Meanbee.ShippingRules.history.pushState();
        }
        return this
    }

    /**
     * Rerenders the calculator form in its [container]{@link Base#container}.
     * @return {this}
     */
    rerender() {
        if (!this.container) return;
        let focussedElementId = document.activeElement.id;
        this.container.innerHTML = '';
        this.container.appendChild(this.render());
        window.Stretchy.resizeAll();
        this.focus(focussedElementId);
        this.root.updateJSON();
        return this;
    }

    /**
     * Called when tree item may need to update in respose to changes made in higher nesting scopes.
     * @abstract
     * @return {this}
     */
    refresh() {
        // NOOP
        return this
    }

    /**
     * Updates the associated input field with the serialised form of the calulator field.
     * @returns this
     */
    updateJSON() {
        this.root.field.value = JSON.stringify(this.root);
        return this;
    }

    /**
     * Moves keyboard focus to the element with [id]{@link Base.id}.
     * @param {string} id
     */
    focus(id) {
        let element = document.getElementById(id);
        if (element) {
            element.focus();
        }
    }

    /**
     * Creates the common remove button.
     * @return {HTMLButtonElement|Array} Remove button.
     */
    renderRemoveButton() {
        if (this.parent instanceof Base) {
            return util.removeButton(this, this.delete.bind(this));
        }
        return [];
    }

    /**
     * Common keboard event listener.
     * @listens keyDown
     * @param {KeyboardEvent} event
     * @return {undefined}
     */
    keyHandler(event) {
        if (~['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].indexOf(event.target.tagName)) {
            if (event.keyCode === 27) { // Escape
                navigateTo.escape(event);
            }
        } else {
            switch  (event.keyCode) {
            case 13: // Enter
                navigateTo.firstField(event);
                break;
            case 27: // Escape
                navigateTo.escape(event);
                break;
            case 37: // Left Arrow
                navigateTo.parentTree(event);
                break;
            case 38: // Up Arrow
                navigateTo.previous(event, this);
                break;
            case 39: // Right Arrow
                navigateTo.childTree(event);
                break;
            case 40: // Down Arrow
                navigateTo.next(event, this);
                break;
            case 45: // Insert
            case 59: // Equals [Plus, onshift]
            case 61: // Equals [Plus, onshift] (firefox)
            case 107: // Add [NumPad]
            case 187: // Equals [Plus, onshift]
                navigateTo.new(event, this);
                break;
            case 8: // Backspace
            case 46: // Delete
            case 109: // Subtract [NumPad]
            case 173: // Minus (firefox)
            case 189: // Dash
                if (event.target.tagName === 'LI') {
                    event.preventDefault();
                    this.root.getObjectById(event.target.id).delete(event.keyCode === 8 ? -1 : +1); // Backspace
                }
                break;
            case 67: // C
                if (event.metaKey || event.ctrlKey) { // ⌘C | Ctrl-C
                    if (event.target.tagName === 'LI') {
                        clipboard.copy(this.root.getObjectById(event.target.id));
                    }
                }
                break;
            case 86: // V
                if (event.metaKey || event.ctrlKey) { // ⌘V | Ctrl-V
                    event.preventDefault();
                    if (event.target.tagName === 'LI') {
                        clipboard.paste(this.root.getObjectById(event.target.id));
                    }
                }
                break;
            case 88: // X
                if (event.metaKey || event.ctrlKey) { // ⌘X | Ctrl-X
                    event.preventDefault();
                    if (event.target.tagName === 'LI') {
                        clipboard.copy(this.root.getObjectById(event.target.id));
                        this.root.getObjectById(event.target.id).delete(+1);
                    }
                }
                break;
            case 89: // Y
                if (event.metaKey || event.ctrlKey) { // ⌘Y | Ctrl-Y
                    event.preventDefault();
                    Meanbee.ShippingRules.history.redo();
                }
                break;
            case 90: // Z
                if (event.metaKey || event.ctrlKey) { // ⌘Z | Ctrl-Z
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

    /**
     * Common copy event listener.
     * @listens copy
     * @param {ClipboardEvent} event
     * @returns {undefined}
     */
    copyText(event) {
        event.clipboardData.setData('text/html', this.toText(event.target, 'rich'));
        event.preventDefault();
    }

    /**
     * Converts the tree item and its children to immutable text.
     * @param {Element} target
     * @param {string} format
     * @returns {String}
     */
    toText(target, format) {
        let text = Array.from(target.childNodes).map(function naturalise(node) {
            if (node instanceof Text) return node.data.trim();
            if (node instanceof HTMLSelectElement) {
                if (node.id.endsWith('-childselector')) return [];
                return node.selectedOptions[0].innerText;
            }
            if (node instanceof HTMLInputElement) return node.value;
            if (node instanceof HTMLUListElement) return (format === 'rich' ? '<ul>' : '') + util.flatten(Array.from(node.childNodes).map(naturalise)).join(' ') + (format === 'rich' ? '</ul>' : '');
            if (node instanceof HTMLLIElement) return (format === 'rich' ? '<li>' : '\n\t') + util.flatten(Array.from(node.childNodes).map(naturalise)).join(' ') + (format === 'rich' ? '</li>' : '');
            return util.flatten(Array.from(node.childNodes).map(naturalise));
        }).join(' ').replace(/<li><\/li>/g,'').replace(/>\s</g,'><').replace(/<ul><\/ul>/g,'');
        return text;
    }

    /**
     * Common dragStart event listener.
     * @listens dragStart
     * @param {DragEvent} event
     * @returns {undefined}
     */
    drag(event) {
        event.effectAllowed = 'copyMove';
        event.dataTransfer.setData('calculator', this.root.id);
        event.dataTransfer.setData('descriptor', JSON.stringify(this));
        event.dataTransfer.setData('id', this.id);
        event.dataTransfer.items.add(this.toText(event.target, 'plain'), 'text/plain');
        event.dataTransfer.items.add(this.toText(event.target, 'rich'), 'text/html');
        event.stopPropagation();
    }

    /**
     * Common drop event listener.
     * @listens drop
     * @param {DragEvent} event
     * @returns {undefined}
     */
    drop(event) {
        event.preventDefault();
        let index = 0, parent;
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
        let origin = Meanbee.ShippingRules.calculators[event.dataTransfer.getData('calculator')].getObjectById(event.dataTransfer.getData('id'));
        let childDesc = JSON.parse(event.dataTransfer.getData('descriptor'));
        let child = parent.addChild(Meanbee.ShippingRules.registers[childDesc.register.toLowerCase()].get(childDesc.key), index);
        child.init(childDesc);
        if (!(event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.dataTransfer.effectAllowed === 'copy')) {
            origin.delete(0);
        }
        this.focus(child.id);
        this.root.rerender();
        Meanbee.ShippingRules.history.pushState();
        event.stopPropagation();
    }

    /**
     * Common dragOver event listener.
     * @listens dragOver
     * @param {DragEvent}
     * @returns {undefined}
     */
    allowDrop(event) {
        event.preventDefault();
        if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
            event.dataTransfer.dropEffect = 'copy';
        } else {
            event.dataTransfer.dropEffect = 'move';
        }
    }

    /**
     * Common dragEnter event listener.
     * @listens dragEnter
     * @param {DragEvent} event
     * @returns {undefined}
     */
    dragIn (event) {
        event.target.classList.add('drop-target');
        event.stopPropagation();
    }

    /**
     * Common dragLeave event listener.
     * @listens dragLeave
     * @param {DragEvent} event
     * @returns {undefined}
     */
    dragOut (event) {
        event.target.classList.remove('drop-target');
    }
}

export default Base