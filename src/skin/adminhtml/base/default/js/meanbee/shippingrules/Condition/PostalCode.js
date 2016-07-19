import Condition from '../Condition';
import BooleanAggregator from '../Aggregator/Boolean';
import Popper from 'popper.js';
import util from '../util';

export default class PostalCode extends Condition
{
    constructor(index, parent, variable) {
        super(index, parent, variable);
        this.aggregator = new BooleanAggregator(0, this);
        this.aggregator.context = this;
        this.format = null;
    }

    static getCategory(context) { // eslint-disable-line no-unused-vars
        if (context instanceof this) return 'Postal Code Conditions';
        return 'Destination Conditions';
    }

    static getVariables(context) {
        let variables = {};
        if (!context) {
            variables['dest_postal_code'] = { label: 'Postal Code', type: ['string'] };
        } else if (context instanceof this && context.format && Meanbee.ShippingRules.data['condition/destination_postalcode/formats']) {
            let formatData = Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].filter(f => f.value === context.format);
            if (formatData.length) {
                formatData[0].parts.forEach((part, index) => {
                    if (part) variables[index ? 'dest_postal_code_part' + index : 'dest_postal_code_full'] = { label: index ? 'Part ' + index : 'Entire Code', type: [part === 'str' ? 'string' : 'numeric_' + part]};
                });
            }
        }
        return variables;
    }

    renderFormatDecoration() {
        return Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].filter(f => (f.value === this.format && util.textWidth(f.decoration) < 2 * util.textWidth('🇦'))).map(f => (<span>{f.decoration}</span>));
    }

    renderFormatSelector() {
        let me = this;
        return (<select id={`${me.id}-format`} onchange={event => {
            me.format = event.target.value;
            me.refresh();
            me.root.rerender();
            Meanbee.ShippingRules.history.pushState();
        }}>
            <option disabled={true} selected={!me.format}>[SELECT]</option>
            {Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].sort((a, b) => ((a.label.toUpperCase() < b.label.toUpperCase()) ? -1 : 1)).map((format) => {
                let option = (<option value={format.value} dir='rtl'>{format.label}</option>);
                option.selected = me.format === format.value;
                return option;
            })}
        </select>);
    }

    renderHelp(item) {
        item.addEventListener('focus', () => {
            let popper;
            if ((popper = item.querySelector('.popper'))) {
                popper.classList.remove('hidden');
            } else {
                let postalCodeFormatData = Meanbee.ShippingRules.data['condition/destination_postalcode/formats'].filter(f => f.value === this.format);
                if (!postalCodeFormatData || !postalCodeFormatData.length) return;
                let postalCodeFormatDatum = postalCodeFormatData[0];
                let help = (<div class="popper" tabIndex={0}><div class="postalcode-full">
                    {postalCodeFormatDatum.example.map((examplePart, index) => (<span class="postalcode-part" data-part={index+1} data-type={postalCodeFormatDatum.parts[index+1] || 'const'}>{examplePart}</span>))}
                </div><div class="popper__arrow"></div></div>);
                item.querySelector('.popper-target').insertAdjacentElement('afterend', help);
                this._popper = popper = new Popper(item.querySelector('.popper-target'), help, {
                    placement: 'top',
                    removeOnDestroy: true
                });
            }
        }, true);
        item.addEventListener('blur', () => {
            Array.from(item.querySelectorAll('.popper')).forEach(popper => popper.classList.add('hidden'));
        }, true);
    }

    render() {
        if (this.parent.context instanceof this.constructor) return super.render();
        let me = this;
        if (!(Meanbee.ShippingRules.data && Meanbee.ShippingRules.data['condition/destination_postalcode/formats'])) return (<li id={me.id}>Loading...</li>);
        let item = (<li id={me.id} onKeyUp={me.keyHandler.bind(me)} onCopy={me.copyText} tabIndex={0} draggable="true"
            onDragStart={me.drag.bind(me)} onDragOver={me.allowDrop.bind(me)} onDrop={me.drop.bind(me)} onDragEnter={me.dragIn.bind(me)} onDragLeave={me.dragOut.bind(me)}>
            {me.label} matches the format of
            <span class="popper-target">
                {me.renderFormatDecoration()}
                {me.renderFormatSelector()}
            </span>
            <span id={me.aggregator.id}>
                and {me.aggregator.renderCombinator()} of these conditions are {me.aggregator.renderValue()}: {me.renderRemoveButton()}
                {me.aggregator.renderChildren()}
            </span>
        </li>);
        this.renderHelp(item);
        return item;
    }

    refresh() {
        if (this.context instanceof this.constructor) {
            if (this.variable in this.constructor.getVariables(this.context)) {
                let validComparators = Meanbee.ShippingRules.registers.comparator.getByType(this.type);
                if (Object.keys(validComparators).reduce((accumulator, key) => (accumulator || this.comparator instanceof validComparators[key]), false)) {
                    this.comparator.type = this.type;
                } else {
                    let comparator = validComparators[Object.keys(validComparators)[0]];
                    this.comparator = comparator ? new comparator(this.type) : null;
                }
            } else {
                this.parent.removeChildByIndex(this.index);
            }
        } else {
            this.aggregator.refresh();
        }
        if (this._popper) {
            this._popper.destroy();
        }
    }

    init(obj) {
        if (this.parent.context instanceof this.constructor) return super.init(obj);
        this.variable = obj.variable;
        this.format = obj.value;
        this.aggregator.init(obj.aggregator);
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Destination_PostalCode';
        obj.aggregator = this.aggregator;
        obj.value = this.format || this.value;
        return obj;
    }
}