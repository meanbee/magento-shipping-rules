'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.util = {
        toOptions: function (options) {
            let html = [];
            options.forEach(function (option) {
                if ({}.toString.call(option.value) === '[object Array]') {
                    html.push(<optgroup label={option.label}>{global.Meanbee.ShippingRules.util.toOptions(option.value)}</optgroup>);
                } else {
                    let optionElement = (() => (<option value={option.value}>{option.label}</option>))();
                    if (option.inputType) optionElement.dataset.inputType = option.inputType;
                    if (option.type) optionElement.dataset.type = option.type;
                    html.push(optionElement);
                }
            });
            return html;
        },
        constructInputField: function (condition) {
            let comparator = global.Meanbee.ShippingRules.ajax.getComparators(condition.attribute).filter(x => x.value === condition.comparator)[0];
            let conditionField = global.Meanbee.ShippingRules.ajax.getConditionFieldByValue(condition.attribute);
            let prefix = `${condition.prefix}-c${condition.id}`;
            if (!comparator) {
                return (<input />);
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
                        {global.Meanbee.ShippingRules.util.toOptions(conditionField.options)}
                    </select>))();
                break;
            case 'select':
                input = (() => (<select id={`${prefix}-value`}>
                    {global.Meanbee.ShippingRules.util.toOptions(conditionField.options)}
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
        }
    };
})(window);
