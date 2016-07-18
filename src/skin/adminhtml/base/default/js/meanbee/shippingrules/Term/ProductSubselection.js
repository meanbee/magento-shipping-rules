import Term from '../Term';
import ProductSetAggregator from '../Aggregator/ProductSet';

export default class ProductSubselection extends Term
{
    constructor(index, parent) {
        super(index, parent);
        this.aggregator = new ProductSetAggregator(0, this);
        this.aggregator.context = this;
        this.value = 1;
        this.attribute = null;
    }

    renderValue() {
        let me = this;
        return (<input id={`${me.id}-value`} type="number" value={me.value} onCopy={me.copyText} onKeyDown={event => me.value = event.target.value} onChange={event => {
            me.value = event.target.value;
            me.root.rerender();
            Meanbee.ShippingRules.history.pushState();
        }} />);
    }

    renderAttributeSelector() {
        let me = this;
        if (!Meanbee.ShippingRules.data['condition/product_subselection/attributes']) return (<select id={`${me.id}-attribute`}></select>);
        return (<select id={`${me.id}-attribute`} onChange={event => {
            me.attribute = event.target.value;
            me.root.rerender();
            Meanbee.ShippingRules.history.pushState();
        }}>
            <option disabled="disabled" selected="selected">[SELECT]</option>
            {Object.keys(Meanbee.ShippingRules.data['condition/product_subselection/attributes'])
                .filter((id) => ~Meanbee.ShippingRules.data['condition/product_subselection/attributes'][id].type.indexOf('number'))
                .map((id) => {
                    let option = (<option value={id}>{Meanbee.ShippingRules.data['condition/product_subselection/attributes'][id].label}</option>);
                    if (me.attribute === id) option.selected = true;
                    return option;
                })}
        </select>);
    }

    render() {
        let me = this;
        return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} tabIndex={0} draggable="true" onDragStart={me.drag.bind(me)}
            onDragOver={me.allowDrop.bind(me)} onDrop={me.drop.bind(me)} onDragEnter={me.dragIn.bind(me)} onDragLeave={me.dragOut.bind(me)}>
            Sum of {me.renderAttributeSelector()} ✕ {me.renderValue()} for a subselection of items in cart where {me.aggregator.renderCombinator()} of these conditions are {me.aggregator.renderValue()}: {me.renderRemoveButton()}
            {me.aggregator.renderChildren()}
        </li>);
    }

    refresh() {
        super.refresh();
        this.aggregator.refresh();
    }

    init(obj) {
        this.attribute = obj.attribute;
        this.value = obj.value;
        this.aggregator.init(obj.aggregator);
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Product_Subselection';
        obj.attribute = this.attribute;
        obj.aggregator = this.aggregator;
        return obj;
    }

    static name() {
        return 'Product Subselection';
    }
}