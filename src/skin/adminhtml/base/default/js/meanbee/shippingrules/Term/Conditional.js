import Term from '../Term';
import BooleanAggregator from '../Aggregator/Boolean';

export default class Conditional extends Term
{
    constructor(index, parent) {
        super(index, parent);
        this.aggregator = new BooleanAggregator(0, this);
    }

    renderValue() {
        let me = this;
        return (<input id={`${me.id}-value`} type="number" value={me.value} onKeyDown={event => me.value = event.target.value} onChange={event => {
            me.value = event.target.value;
            me.root.rerender();
            Meanbee.ShippingRules.history.pushState();
        }} />);
    }

    render() {
        let me = this;
        return (<li id={me.id} onKeyDown={me.keyHandler.bind(me)} onCopy={me.copyText} tabIndex={0} draggable="true"
            onDragStart={me.drag.bind(me)} onDragOver={me.allowDrop.bind(me)} onDrop={me.drop.bind(me)} onDragEnter={me.dragIn.bind(me)} onDragLeave={me.dragOut.bind(me)}>
            Constant value of {me.renderValue()}
            <span id={me.aggregator.id}>
                if {me.aggregator.renderCombinator()} of these conditions are {me.aggregator.renderValue()}: {me.renderRemoveButton()}
                {me.aggregator.renderChildren()}
            </span>
        </li>);
    }
    
    refresh() {
        super.refresh();
        this.aggregator.refresh();
    }

    init(obj) {
        super.init(obj);
        this.value = obj.value;
        this.aggregator.init(obj.aggregator);
    }

    toJSON() {
        let obj = super.toJSON();
        obj.key = 'Conditional';
        obj.aggregator = this.aggregator;
        return obj;
    }

    static identifier() {
        return 'Conditional Value';
    }
}