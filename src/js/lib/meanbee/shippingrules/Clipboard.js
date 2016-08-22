export default {
    copy(target) {
        if (window.Storage) {
            let targetDescriptor = JSON.stringify(target);
            window.sessionStorage.meanbeeShippingRulesClipboard = targetDescriptor;
        }
    },
    paste(target) {
        if (window.Storage) {
            let clipboardItemDescriptor = JSON.parse(window.sessionStorage.meanbeeShippingRulesClipboard);
            let clipboardItem = Meanbee.ShippingRules.registers[clipboardItemDescriptor.register.toLowerCase()].get(clipboardItemDescriptor.key);
            if (target.aggregator) {
                target = target.aggregator;
            }
            let child;
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