'use strict';
var Meanbee = Meanbee || {};
!('ShippingRules' in Meanbee) && (Meanbee.ShippingRules = {});
(function (ShippingRules) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    ctx.font = 'bold 10.8px sans-serif';

    ShippingRules.util = {
        toOptions: function (options, selected) {
            selected = Array.isArray(selected) ? selected : [selected];
            let html = [];
            options.forEach(function (option) {
                if ({}.toString.call(option.value) === '[object Array]') {
                    html.push(<optgroup label={option.label}>{ShippingRules.util.toOptions(option.value, selected)}</optgroup>);
                } else {
                    let optionElement = (() => (<option value={option.value}>{option.label}</option>))();
                    if (~selected.indexOf(option.value)) optionElement.selected = true;
                    if (option.inputType) optionElement.dataset.inputType = option.inputType;
                    if (option.type) optionElement.dataset.type = option.type;
                    html.push(optionElement);
                }
            });
            return html;
        },
        constructInputField: function (condition) {
            let comparator = ShippingRules.ajax.getComparators(condition.attribute).filter(x => x.value === condition.comparator)[0];
            let conditionField = ShippingRules.ajax.getConditionFieldByValue(condition.attribute);
            let prefix = `${condition.prefix}-c${condition.id}`;
            if (!comparator) {
                return (<input id={`${prefix}-value`} />);
            }
            let input = null;
            switch (comparator.inputType) {
            case 'x-interval':
                input = (() => (<span id={`${prefix}-value`}>
                        <input id={`${prefix}-value-min`} /> and <input id={`${prefix}-value-max`} />
                    </span>))();
                Object.defineProperty(input, 'value', {
                    enumerable: true,
                    get: function () {
                        return [
                            document.getElementById(`${input.id}-min`).value,
                            document.getElementById(`${input.id}-max`).value
                        ];
                    },
                    set: function (value) {
                        if (value) {
                            document.getElementById(`${input.id}-min`).value = value[0];
                            document.getElementById(`${input.id}-max`).value = value[1];
                        }
                    }
                });
                break;
            case 'x-multiselect':
                input = (() => (<select id={`${prefix}-value`} multiple="multiple">
                        {ShippingRules.util.toOptions(conditionField.options, condition.value)}
                    </select>))();
                break;
            case 'select':
                input = (() => (<select id={`${prefix}-value`}>
                    {ShippingRules.util.toOptions(conditionField.options, condition.value)}
                </select>))();
                break;
            default:
                input = (() => (<input id={`${prefix}-value`} type={comparator.inputType || 'text'} />))();
                if (comparator.inputPattern) {
                    input.pattern = comparator.inputPattern;
                }
                break;
            }
            input.value = condition.value;
            input.addEventListener('keyup', () => condition.value = input.value, false);
            input.addEventListener('change', () => condition.value = input.value, false);
            return input;
        },
        addButton: function (ctx, handler) {
            return (<button id={`${ctx.prefix}-t${ctx.id}-add`} type="button" class="add" onClick={handler}></button>);
        },
        removeButton: function (ctx, handler) {
            return (<button id={`${ctx.id}-remove`} aria-label="Remove" type="button" class="remove" onClick={handler}></button>);
        },
        fieldTextSize: function (text) {
            return (Math.floor(ctx.measureText(text).width) + 25) + 'px';
        },
        textWidth: function (text) {
            return ctx.measureText(text).width;
        },
        resizeFields: function () {
            [].forEach.call(document.querySelectorAll('.calculator-tree select:not([multiple])'), function (select) {
                let text = select.selectedOptions[0] ? select.selectedOptions[0].innerText : '';
                select.style.width = ShippingRules.util.fieldTextSize(text);
            });
            [].forEach.call(document.querySelectorAll('.calculator-tree input'), function (input) {
                let text = input.value || (input.type === 'time' ? '-------' : '---');
                input.style.width = ShippingRules.util.fieldTextSize(text);
            });
        },
        loadData: function (path) {
            if (!('data' in ShippingRules)) ShippingRules.data = {};
            if (ShippingRules.data[path]) return;
            let url = ShippingRules.ajaxBasePath + path;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    ShippingRules.data[path] = JSON.parse(xhr.responseText);
                    if (ShippingRules.calculators)
                        Object.keys(ShippingRules.calculators).forEach(calcName => {
                            ShippingRules.calculators[calcName].refresh();
                            ShippingRules.calculators[calcName].rerender();
                        });
                }
            };
            let formData = new FormData();
            formData.set('form_key', ShippingRules.formKey);
            xhr.send(formData);
        },
        flatten: function flatten (arr) {
            const flat = [].concat(...arr)
            return flat.some(Array.isArray) ? flatten(flat) : flat;
        }
    };
})(Meanbee.ShippingRules);
