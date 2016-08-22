import Condition from '../Condition';
import ProductSubselectionTerm from '../Term/ProductSubselection'

export default class ProductSubselection extends Condition
{
    constructor(index, parent, variable) {
        super(index, parent, variable);
        this.term = new ProductSubselectionTerm(0, this);
        this.term.aggregator.context = this;
    }
    
    static getCategory(context) {
        if (context instanceof this || context instanceof ProductSubselectionTerm) return 'Product Attributes';
        return 'Product Conditions';
    }

    static getVariables(context) {
        let variables = {};
        if (!context) {
            variables['product_subselection'] = { label: 'Product Subselection', type: ['number'] };
        } else if ((context instanceof this || context instanceof ProductSubselectionTerm) && Meanbee.ShippingRules.data['condition/product_subselection/attributes']) {
            variables = Object.assign(variables, Meanbee.ShippingRules.data['condition/product_subselection/attributes']);
        }
        return variables;
    }

    render() {
        if (this.parent.context instanceof this.constructor || this.parent.context instanceof ProductSubselectionTerm) return super.render();
        let me = this;
        return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} onCopy={me.copyText} tabIndex={0} draggable="true"
            onDragStart={me.drag.bind(me)} onDragOver={me.allowDrop.bind(me)} onDrop={me.drop.bind(me)} onDragEnter={me.dragIn.bind(me)} onDragLeave={me.dragOut.bind(me)}>
            If sum of {me.term.renderAttributeSelector()} {me.renderComparator()} {me.valueField.render ? me.valueField.render() : []} for a subselection of items in cart where {me.term.aggregator.renderCombinator()} of these conditions are {me.term.aggregator.renderValue()}: {me.renderRemoveButton()}
            {me.term.aggregator.renderChildren()}
        </li>);
    }

    refresh() {
        super.refresh();
        this.term.refresh();
    }

    init(obj) {
        super.init(obj);
        if (this.parent.context instanceof this.constructor || this.parent.context instanceof ProductSubselectionTerm) return;
        this.term.init(obj.term);
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Product_Subselection';
        obj.term = this.term;
        return obj;
    }

    static identifier() {
        return 'Product Subselection';
    }
}