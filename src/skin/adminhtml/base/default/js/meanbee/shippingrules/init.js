import './polyfills';
import aggregatorRegister from './Register/aggregator';
import comparatorRegister from './Register/comparator';
import conditionRegister from './Register/condition';
import fieldRegister from './Register/field';
import termRegister from './Register/term';
import util from './util';
import History from './History';

import Aggregator from './Aggregator';
import BooleanAggregator from './Aggregator/Boolean';
import NumericAggregator from './Aggregator/Numeric';
import ProductSetAggregator from './Aggregator/ProductSet';

import Comparator from './Comparator';
import BetweenComparator from './Comparator/Between';
import NotBetweenComparator from './Comparator/NotBetween';
import EqualComparator from './Comparator/Equal';
import NotEqualComparator from './Comparator/NotEqual';
import GreaterThanComparator from './Comparator/GreaterThan';
import GreaterThanOrEqualComparator from './Comparator/GreaterThanOrEqual';
import LessThanComparator from './Comparator/LessThan';
import LessThanOrEqualComparator from './Comparator/LessThanOrEqual';

import Condition from './Condition';
import CartCondition from './Condition/Cart';
import CustomerCondition from './Condition/Customer';
import DestinationCondition from './Condition/Destination';
import EnvironmentCondition from './Condition/Environment';
import PostalCodeCondition from './Condition/PostalCode';
import ProductSubselectionCondition from './Condition/ProductSubselection';
import PromotionCondition from './Condition/Promotion';
import TimeCondition from './Condition/Time';

import Field from './Field';
import BooleanField from './Field/Boolean';
import NumberField from './Field/Number';
import NumberBase26Field from './Field/NumberBase26';
import NumberBase36Field from './Field/NumberBase36';
import SelectField from './Field/Select';
import TextField from './Field/Text';
import TimeField from './Field/Time';
import NumberX2Field from './Field/NumberX2';
import NumberBase26X2Field from './Field/NumberBase26X2';
import NumberBase36X2Field from './Field/NumberBase36X2';
import TextX2Field from './Field/TextX2';
import TimeX2Field from './Field/TimeX2';

import Term from './Term';
import ConditionalTerm from './Term/Conditional';
import ConstantTerm from './Term/Constant';
import ProductSubselectionTerm from './Term/ProductSubselection';

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

(function () {
    if (! ('Meanbee' in window)) window.Meanbee = {};
    if (! ('ShippingRules' in Meanbee)) Meanbee.ShippingRules = {};

    Meanbee.ShippingRules.registers = {
        aggregator: aggregatorRegister,
        comparator: comparatorRegister,
        condition: conditionRegister,
        field: fieldRegister,
        term: termRegister
    };
    Meanbee.ShippingRules.history = new History;

    Meanbee.ShippingRules.Aggregator = Aggregator;
    Meanbee.ShippingRules.registers.aggregator.add(BooleanAggregator.CONJUNCTIVE, BooleanAggregator);
    Meanbee.ShippingRules.registers.aggregator.add(BooleanAggregator.DISJUNCTIVE, BooleanAggregator);
    Meanbee.ShippingRules.registers.aggregator.add('Summative', NumericAggregator);
    Meanbee.ShippingRules.registers.aggregator.add(ProductSetAggregator.INTERSECTIONAL, ProductSetAggregator);
    Meanbee.ShippingRules.registers.aggregator.add(ProductSetAggregator.UNIONAL, ProductSetAggregator);

    Meanbee.ShippingRules.Comparator = Comparator;
    Meanbee.ShippingRules.registers.comparator.add('Between', BetweenComparator);
    Meanbee.ShippingRules.registers.comparator.add('NotBetween', NotBetweenComparator);
    Meanbee.ShippingRules.registers.comparator.add('Equal', EqualComparator);
    Meanbee.ShippingRules.registers.comparator.add('NotEqual', NotEqualComparator);
    Meanbee.ShippingRules.registers.comparator.add('GreaterThan', GreaterThanComparator);
    Meanbee.ShippingRules.registers.comparator.add('GreaterThanOrEqual', GreaterThanOrEqualComparator);
    Meanbee.ShippingRules.registers.comparator.add('LessThan', LessThanComparator);
    Meanbee.ShippingRules.registers.comparator.add('LessThanOrEqual', LessThanOrEqualComparator);

    Meanbee.ShippingRules.Condition = Condition;
    Meanbee.ShippingRules.registers.condition.add('Cart', CartCondition);
    Meanbee.ShippingRules.registers.condition.add('Customer', CustomerCondition);
    Meanbee.ShippingRules.registers.condition.add('Destination', DestinationCondition);
    Meanbee.ShippingRules.registers.condition.add('Environment', EnvironmentCondition);
    Meanbee.ShippingRules.registers.condition.add('Destination_PostalCode', PostalCodeCondition);
    Meanbee.ShippingRules.registers.condition.add('Product_Subselection', ProductSubselectionCondition);
    Meanbee.ShippingRules.registers.condition.add('Promotion', PromotionCondition);
    Meanbee.ShippingRules.registers.condition.add('Time', TimeCondition);

    Meanbee.ShippingRules.Field = Field;
    Meanbee.ShippingRules.registers.field.add('Boolean', BooleanField);
    Meanbee.ShippingRules.registers.field.add('Number', NumberField);
    Meanbee.ShippingRules.registers.field.add('NumberBase26', NumberBase26Field);
    Meanbee.ShippingRules.registers.field.add('NumberBase36', NumberBase36Field);
    Meanbee.ShippingRules.registers.field.add('Select', SelectField);
    Meanbee.ShippingRules.registers.field.add('Text', TextField);
    Meanbee.ShippingRules.registers.field.add('Time', TimeField);
    Meanbee.ShippingRules.registers.field.add('NumberX2', NumberX2Field);
    Meanbee.ShippingRules.registers.field.add('NumberBase26X2', NumberBase26X2Field);
    Meanbee.ShippingRules.registers.field.add('NumberBase36X2', NumberBase36X2Field);
    Meanbee.ShippingRules.registers.field.add('TextX2', TextX2Field);
    Meanbee.ShippingRules.registers.field.add('TimeX2', TimeX2Field);

    Meanbee.ShippingRules.Term = Term;
    Meanbee.ShippingRules.registers.term.add('Conditional', ConditionalTerm);
    Meanbee.ShippingRules.registers.term.add('Constant', ConstantTerm);
    Meanbee.ShippingRules.registers.term.add('Product_Subselection', ProductSubselectionTerm);

    util.loadData('condition/product_subselection/attributes');
    util.loadData('condition/destination_postalcode/formats');
    
    document.addEventListener('DOMContentLoaded', function () {
        let priceField = document.getElementById('price');
        priceField.hidden = true;
        let priceContainer = document.createElement('ul');
        priceContainer.classList.add('calculator-tree');
        priceField.parentElement.appendChild(priceContainer);
        let priceCalc = new (Meanbee.ShippingRules.registers.aggregator.get('Summative'))('priceCalculator', null, priceContainer);
        priceCalc.field = priceField;
        priceContainer.appendChild(priceCalc.render());

        let costField = document.getElementById('cost');
        costField.hidden = true;
        let costContainer = document.createElement('ul');
        costContainer.classList.add('calculator-tree');
        costField.parentElement.appendChild(costContainer);
        let costCalc = new (Meanbee.ShippingRules.registers.aggregator.get('Summative'))('costCalculator', null, costContainer);
        costCalc.field = costField;
        costContainer.appendChild(costCalc.render());

        let condField = document.getElementById('conditions');
        condField.hidden = true;
        let condContainer = document.createElement('ul');
        condContainer.classList.add('calculator-tree');
        condField.parentElement.appendChild(condContainer);
        let condCalc = new (Meanbee.ShippingRules.registers.aggregator.get('Conjunctive'))('conditionCalculator', null, condContainer);
        condCalc.field = condField;
        condContainer.appendChild(condCalc.render());

        Meanbee.ShippingRules.history.pushState();

        function changeHandler (event) {
            if (~['INPUT', 'SELECT'].indexOf(event.target.tagName)) util.resizeFields();
        }

        document.body.addEventListener('change', changeHandler, false);
        document.body.addEventListener('keyup', changeHandler, false);

        util.resizeFields();
    });
})();
