import './vendor/jsx-only-react';
import Base from './Base';

import aggregatorRegister from './Register/aggregator';
import comparatorRegister from './Register/comparator';
import conditionRegister from './Register/condition';
import fieldRegister from './Register/field';
import termRegister from './Register/term';

import navigation from './navigation';
import util from './util';
import clipboard from './clipboard';
import History from './History';

import Aggregator from './Aggregator';
import BooleanAggregator from './Aggregator/Boolean';
import NumericAggregator from './Aggregator/Numeric';
import ProductSetAggregator from './Aggregator/ProductSet';

import Comparator from './Comparator';
import BetweenComparator from './Comparator/Between';
import NotBetweenComparator from './Comparator/NotBetween';
import ContainsComparator from './Comparator/Contains';
import NotContainComparator from './Comparator/NotContain';
import BeginsComparator from './Comparator/Begins';
import NotBeginComparator from './Comparator/NotBegin';
import EndsComparator from './Comparator/Ends';
import NotEndComparator from './Comparator/NotEnd';
import EqualComparator from './Comparator/Equal';
import NotEqualComparator from './Comparator/NotEqual';
import GreaterThanComparator from './Comparator/GreaterThan';
import GreaterThanOrEqualComparator from './Comparator/GreaterThanOrEqual';
import LessThanComparator from './Comparator/LessThan';
import LessThanOrEqualComparator from './Comparator/LessThanOrEqual';
import MatchesRegExComparator from './Comparator/MatchesRegEx';
import NotMatchRegExComparator from './Comparator/NotMatchRegEx';
import OneOfComparator from './Comparator/OneOf';
import NotOneOfComparator from './Comparator/NotOneOf';

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
import MultiselectField from './Field/Multiselect';
import TextField from './Field/Text';
import TimeField from './Field/Time';
import CasedTextField from './Field/CasedText';
import NumberX2Field from './Field/NumberX2';
import NumberBase26X2Field from './Field/NumberBase26X2';
import NumberBase36X2Field from './Field/NumberBase36X2';
import TextX2Field from './Field/TextX2';
import TimeX2Field from './Field/TimeX2';
import NumberListField from './Field/NumberList';
import NumberBase26ListField from './Field/NumberBase26List';
import NumberBase36ListField from './Field/NumberBase36List';

import Term from './Term';
import ConditionalTerm from './Term/Conditional';
import ConstantTerm from './Term/Constant';
import ProductSubselectionTerm from './Term/ProductSubselection';

import './vendor/stretchy';
window.Stretchy.selectors.filter = '.calculator-tree *';
window.Stretchy.selectors.base += ', input[type="number"]';

/** @namespace Meanbee */
if (! ('Meanbee' in window)) window.Meanbee = {};
/** @namespace Meanbee.ShippingRules */
if (! ('ShippingRules' in Meanbee)) Meanbee.ShippingRules = {};

/**
 * @prop {Object} ShippingRules.registers Object of the client-side registers
 * @prop {Meanbee.ShippingRules.Register} ShippingRules.register.aggregator Aggregator Register
 * @prop {Meanbee.ShippingRules.Register} ShippingRules.register.comparator Comparator Register
 * @prop {Meanbee.ShippingRules.Register} ShippingRules.register.condition Condition Register
 * @prop {Meanbee.ShippingRules.Register} ShippingRules.register.field Field Register
 * @prop {Meanbee.ShippingRules.Register} ShippingRules.register.term Term Register
 */
Meanbee.ShippingRules.registers = {
    aggregator: aggregatorRegister,
    comparator: comparatorRegister,
    condition: conditionRegister,
    field: fieldRegister,
    term: termRegister
};

/** @prop {Meanbee.ShippingRules.History} ShippingRules.history Manages the historical states of calculator fields and time-travelling through them. */
Meanbee.ShippingRules.history = new History;
/** @prop {module:util} ShippingRules.util Module containing utility functions. */
Meanbee.ShippingRules.util = util;
Meanbee.ShippingRules.Base = Base;
/** @prop {module:clipboard} ShippingRules.clipboard Module managing the ShippingRules clipboard */
Meanbee.ShippingRules.clipboard = clipboard;
/** @prop {module:navigation} ShippingRules.navigation Module managing keyboard navigation. */
Meanbee.ShippingRules.navigation = navigation;

Meanbee.ShippingRules.Aggregator = Aggregator;
Meanbee.ShippingRules.registers.aggregator.add(BooleanAggregator.CONJUNCTIVE, Meanbee.ShippingRules.Aggregator.Conjunctive = BooleanAggregator);
Meanbee.ShippingRules.registers.aggregator.add(BooleanAggregator.DISJUNCTIVE, Meanbee.ShippingRules.Aggregator.Disjunctive = BooleanAggregator);
Meanbee.ShippingRules.registers.aggregator.add('Summative', Meanbee.ShippingRules.Aggregator.Summative = NumericAggregator);
Meanbee.ShippingRules.registers.aggregator.add(ProductSetAggregator.INTERSECTIONAL, Meanbee.ShippingRules.Aggregator.Intersectional = ProductSetAggregator);
Meanbee.ShippingRules.registers.aggregator.add(ProductSetAggregator.UNIONAL, Meanbee.ShippingRules.Aggregator.Unional = ProductSetAggregator);

Meanbee.ShippingRules.Comparator = Comparator;
Meanbee.ShippingRules.registers.comparator.add('Between', Meanbee.ShippingRules.Comparator.Between = BetweenComparator);
Meanbee.ShippingRules.registers.comparator.add('NotBetween', Meanbee.ShippingRules.Comparator.NotBetween =  NotBetweenComparator);
Meanbee.ShippingRules.registers.comparator.add('Contains', Meanbee.ShippingRules.Comparator.Contains =  ContainsComparator);
Meanbee.ShippingRules.registers.comparator.add('NotContain', Meanbee.ShippingRules.Comparator.NotContain =  NotContainComparator);
Meanbee.ShippingRules.registers.comparator.add('Begins', Meanbee.ShippingRules.Comparator.Begins =  BeginsComparator);
Meanbee.ShippingRules.registers.comparator.add('NotBegin', Meanbee.ShippingRules.Comparator.NotBegin =  NotBeginComparator);
Meanbee.ShippingRules.registers.comparator.add('Ends', Meanbee.ShippingRules.Comparator.Ends =  EndsComparator);
Meanbee.ShippingRules.registers.comparator.add('NotEnd', Meanbee.ShippingRules.Comparator.NotEnd =  NotEndComparator);
Meanbee.ShippingRules.registers.comparator.add('Equal', Meanbee.ShippingRules.Comparator.Equal =  EqualComparator);
Meanbee.ShippingRules.registers.comparator.add('NotEqual', Meanbee.ShippingRules.Comparator.NotEqual =  NotEqualComparator);
Meanbee.ShippingRules.registers.comparator.add('GreaterThan', Meanbee.ShippingRules.Comparator.GreaterThan =  GreaterThanComparator);
Meanbee.ShippingRules.registers.comparator.add('GreaterThanOrEqual', Meanbee.ShippingRules.Comparator.GreaterThanOrEqual =  GreaterThanOrEqualComparator);
Meanbee.ShippingRules.registers.comparator.add('LessThan', Meanbee.ShippingRules.Comparator.LessThan =  LessThanComparator);
Meanbee.ShippingRules.registers.comparator.add('LessThanOrEqual', Meanbee.ShippingRules.Comparator.LessThanOrEqual =  LessThanOrEqualComparator);
Meanbee.ShippingRules.registers.comparator.add('MatchesRegEx', Meanbee.ShippingRules.Comparator.MatchesRegEx =  MatchesRegExComparator);
Meanbee.ShippingRules.registers.comparator.add('NotMatchRegEx', Meanbee.ShippingRules.Comparator.NotMatchRegEx =  NotMatchRegExComparator);
Meanbee.ShippingRules.registers.comparator.add('OneOf', Meanbee.ShippingRules.Comparator.OneOf =  OneOfComparator);
Meanbee.ShippingRules.registers.comparator.add('NotOneOf', Meanbee.ShippingRules.Comparator.NotOneOf =  NotOneOfComparator);

Meanbee.ShippingRules.Condition = Condition;
Meanbee.ShippingRules.registers.condition.add('Cart', Meanbee.ShippingRules.Condition.Cart = CartCondition);
Meanbee.ShippingRules.registers.condition.add('Customer', Meanbee.ShippingRules.Condition.Customer = CustomerCondition);
Meanbee.ShippingRules.registers.condition.add('Destination', Meanbee.ShippingRules.Condition.Destination = DestinationCondition);
Meanbee.ShippingRules.registers.condition.add('Environment', Meanbee.ShippingRules.Condition.Environment = EnvironmentCondition);
Meanbee.ShippingRules.registers.condition.add('Destination_PostalCode', Meanbee.ShippingRules.Condition.Destination.PostalCode = PostalCodeCondition);
Meanbee.ShippingRules.registers.condition.add('Product_Subselection', Meanbee.ShippingRules.Condition.ProductSubselection = ProductSubselectionCondition);
Meanbee.ShippingRules.registers.condition.add('Promotion', Meanbee.ShippingRules.Condition.Promotion = PromotionCondition);
Meanbee.ShippingRules.registers.condition.add('Time', Meanbee.ShippingRules.Condition.Time = TimeCondition);

Meanbee.ShippingRules.Field = Field;
Meanbee.ShippingRules.registers.field.add('Boolean', Meanbee.ShippingRules.Field.Boolean = BooleanField);
Meanbee.ShippingRules.registers.field.add('Number', Meanbee.ShippingRules.Field.Number = NumberField);
Meanbee.ShippingRules.registers.field.add('NumberBase26', Meanbee.ShippingRules.Field.Number.Base26 = NumberBase26Field);
Meanbee.ShippingRules.registers.field.add('NumberBase36', Meanbee.ShippingRules.Field.Number.Base36 = NumberBase36Field);
Meanbee.ShippingRules.registers.field.add('Select', Meanbee.ShippingRules.Field.Select = SelectField);
Meanbee.ShippingRules.registers.field.add('Multiselect', Meanbee.ShippingRules.Field.Multiselect = MultiselectField);
Meanbee.ShippingRules.registers.field.add('Text', Meanbee.ShippingRules.Field.Text = TextField);
Meanbee.ShippingRules.registers.field.add('Time', Meanbee.ShippingRules.Field.Time = TimeField);
Meanbee.ShippingRules.registers.field.add('CasedText', Meanbee.ShippingRules.Field.Text.Cased = CasedTextField);
Meanbee.ShippingRules.registers.field.add('NumberX2', Meanbee.ShippingRules.Field.NumberX2 = NumberX2Field);
Meanbee.ShippingRules.registers.field.add('NumberBase26X2', Meanbee.ShippingRules.Field.NumberX2.Base26 = NumberBase26X2Field);
Meanbee.ShippingRules.registers.field.add('NumberBase36X2', Meanbee.ShippingRules.Field.NumberX2.Base36 = NumberBase36X2Field);
Meanbee.ShippingRules.registers.field.add('TextX2', Meanbee.ShippingRules.Field.TextX2 = TextX2Field);
Meanbee.ShippingRules.registers.field.add('TimeX2', Meanbee.ShippingRules.Field.TimeX2 = TimeX2Field);
Meanbee.ShippingRules.registers.field.add('NumberList', Meanbee.ShippingRules.Field.Number.List = NumberListField);
Meanbee.ShippingRules.registers.field.add('NumberBase26List', Meanbee.ShippingRules.Field.Number.Base26.List = NumberBase26ListField);
Meanbee.ShippingRules.registers.field.add('NumberBase36List', Meanbee.ShippingRules.Field.Number.Base36.List = NumberBase36ListField);

Meanbee.ShippingRules.Term = Term;
Meanbee.ShippingRules.registers.term.add('Constant', Meanbee.ShippingRules.Term.Constant = ConstantTerm);
Meanbee.ShippingRules.registers.term.add('Conditional', Meanbee.ShippingRules.Term.Condition = ConditionalTerm);
Meanbee.ShippingRules.registers.term.add('Product_Subselection', Meanbee.ShippingRules.Term.ProductSubselection = ProductSubselectionTerm);

util.loadData('condition/product_subselection/attributes');
util.loadData('condition/destination_postalcode/formats');