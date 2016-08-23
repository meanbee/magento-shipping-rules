window.React = {
    createElement(tagName, attributes, ...children) {
        let element = document.createElement(tagName);
        if (attributes) Object.keys(attributes).forEach(attributeName => {
            if (/^on/.test(attributeName)) {
                return element.addEventListener(attributeName.slice(2).toLowerCase(), attributes[attributeName]);
            }
            element.setAttribute(attributeName, attributes[attributeName]);
        });
        children.forEach(function appendChildren (child) {
            if (Array.isArray(child)) return child.forEach(appendChildren);
            if (typeof child === 'string') return element.appendChild(document.createTextNode(child));
            element.appendChild(child);
        });
        return element;
    }
};