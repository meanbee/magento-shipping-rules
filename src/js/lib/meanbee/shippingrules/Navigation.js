/** @module navigation */

export default {
    /**
     * Move keyboard focus to nearest parent tree item.
     * @param {KeyboardEvent} event
     * @returns {undefined}
     */
    escape(event) {
        event.preventDefault();
        if (~['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].indexOf(event.target.tagName)) {
            event.target.closest('li').focus();
        } else {
            document.body.focus();
        }
    },

    /**
     * Move keyboard focus to first input field that is a child of the currently
     * focussed tree item.
     * @param {KeyboardEvent} event
     * @returns {undefined}
     */
    firstField(event) {
        if (event.target.tagName === 'LI') {
            event.preventDefault();
            event.target.querySelector('input, select, button, textarea').focus();
        }
    },

    /**
     * Move keyboard focus to the parent tree item if applicable.
     * @param {KeyboardEvent} event
     * @returns {undefined}
     */
    parentTree(event) {
        if (event.target.tagName === 'LI') {
            event.preventDefault();
            if (event.target.parentElement.parentElement.tagName === 'LI') {
                event.target.parentElement.parentElement.focus();
            } else if (event.target.parentElement.parentElement.parentElement.tagName === 'LI') {
                event.target.parentElement.parentElement.parentElement.focus();
            }
        }
    },

    /**
     * Move keyboard focus to first child tree item if applicable.
     * @param {KeyboardEvent} event
     * @returns {undefined}
     */
    childTree(event) {
        if (event.target.tagName === 'LI') {
            event.preventDefault();
            let i;
            if (~(i = Array.from(event.target.children).map(child => child.tagName).indexOf('UL'))) {
                event.target.children[i].children[0].focus();
            } else if (~(i = Array.from(event.target.lastChild.children).map(child => child.tagName).indexOf('UL'))) {
                event.target.lastChild.children[i].children[0].focus();
            }
        }
    },

    /**
     * Moves keyboard focus to the previous sibling tree item or the direct parent tree item.
     * @param {KeyboardEvent} event
     * @param {Meanbee.ShippingRules.Base} context The object representing the currently focussed tree item.
     * @returns {undefined}
     */
    previous(event, context) {
        if (event.target.tagName === 'LI') {
            event.preventDefault();
            let i;
            let treeItems = Array.from(context.root.container.querySelectorAll('li'));
            i = treeItems.indexOf(event.target);
            if (treeItems[i - 1]) {
                treeItems[i - 1].focus();
            }
        }
    },

    /**
     * Moves keyboard focus to the next sibling tree item or the direct parent's next sibling tree item.
     * @param {KeyboardEvent} event
     * @param {Meanbee.ShippingRules.Base} context The object representing the currently focussed tree item.
     * @returns {undefined}
     */
    next(event, context) {
        if (event.target.tagName === 'LI') {
            event.preventDefault();
            let i;
            let treeItems = Array.from(context.root.container.querySelectorAll('li'));
            i = treeItems.indexOf(event.target);
            if (treeItems[i + 1]) {
                treeItems[i + 1].focus();
            }
        }
    },

    /**
     * Move keyboard focus to the tree item that allows the user to create a new tree item.
     * @param {KeyboardEvent} event
     * @param {Meanbee.ShippingRules.Base} context The object representing the currently focussed tree item.
     * @returns {undefined}
     */
    new(event, context) {
        if (event.target.tagName === 'LI') {
            event.preventDefault();
            let target = target.root.getObjectById(event.target.id);
            while (target.children === void 0) {
                target = target.parent;
            }
            context.focus(target.id + '-childselector');
        }
    }
};