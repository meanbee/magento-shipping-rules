let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
ctx.font = 'bold 10.8px sans-serif';

/** @module */
export default {
    /**
     * Creates a remove button.
     * @param  {Meanbee.ShippingRules.Base} ctx Tree item to which the button belongs.
     * @param  {function} handler The on click event handler.
     * @returns {HTMLButton}
     */
    removeButton(ctx, handler) {
        return (<button id={`${ctx.id}-remove`} aria-label="Remove" type="button" class="remove" onClick={handler}></button>);
    },

    /**
     * Measures the width of the passed text.
     * @param {String} text Text to Measure.
     * @returns {Number} Width of text in CSS pixels.
     */
    textWidth(text) {
        return ctx.measureText(text).width;
    },

    /**
     * Loads data from a ShippingRules ajax route. Routes are defined as `<register>/<registerKey>/<method>`,
     * referring to a register, registerKey and method on the server, where the methods signature is prefixed with `ajax`.
     * Stores result in `Meanbee.ShippingRules.data` indexed by using route as the key,
     * and refreshes and rerenders the calculators.
     * @param {String} path Ajax route.
     * @returns {XMLHttpRequest} The ajax request.
     */
    loadData(path) {
        if (!('data' in Meanbee.ShippingRules)) Meanbee.ShippingRules.data = {};
        if (Meanbee.ShippingRules.data[path]) return;
        let url = Meanbee.ShippingRules.ajaxBasePath + path;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                Meanbee.ShippingRules.data[path] = JSON.parse(xhr.responseText);
                if (Meanbee.ShippingRules.calculators)
                    Object.keys(Meanbee.ShippingRules.calculators).forEach(calcName => {
                        Meanbee.ShippingRules.calculators[calcName].refresh();
                        Meanbee.ShippingRules.calculators[calcName].rerender();
                    });
            }
        };
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`form_key=${Meanbee.ShippingRules.formKey}`);
        return xhr;
    },

    /**
     * Flattens a multidimentional or varidimentional array to one dimention.
     * @param {Array} arr Multidimentional or varidimentional array.
     * @returns {Array} One dimentional array.
     */
    flatten(arr) {
        const flat = [].concat(...arr)
        return flat.some(Array.isArray) ? this.flatten(flat) : flat;
    }
};