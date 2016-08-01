
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
ctx.font = 'bold 10.8px sans-serif';

let util = {
    removeButton: function (ctx, handler) {
        return (<button id={`${ctx.id}-remove`} aria-label="Remove" type="button" class="remove" onClick={handler}></button>);
    },
    textWidth: function (text) {
        return ctx.measureText(text).width;
    },
    loadData: function (path) {
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
                        Meanbee.ShippingRules.calculators[calcName].rerender();
                    });
            }
        };
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`form_key=${Meanbee.ShippingRules.formKey}`);
    },
    flatten: function flatten (arr) {
        const flat = [].concat(...arr)
        return flat.some(Array.isArray) ? flatten(flat) : flat;
    }
};

export default util;