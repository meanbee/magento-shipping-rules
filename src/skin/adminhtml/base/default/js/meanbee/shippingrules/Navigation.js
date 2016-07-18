export default {
    escape(event) {
        event.preventDefault();
        if (~['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].indexOf(event.target.tagName)) {
            event.target.closest('li').focus();
        } else {
            document.body.focus();
        }
    },
    firstField(event) {
        if (event.target.tagName === 'LI') {
            event.preventDefault();
            event.target.querySelector('input, select, button, textarea').focus();
        }
    },
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