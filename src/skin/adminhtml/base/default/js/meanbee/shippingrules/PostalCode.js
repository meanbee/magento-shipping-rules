'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.PostalCode = function (calculator, group, prefix = '', id = 0) {
        this.calculator = calculator;
        this.group = group;
        this.id = id;
        this.prefix = prefix;
        this.conditions = [];
        this.format = global.Meanbee.ShippingRules.ajax.getPostalCodeFormats()[0].value;
        this.aggregator = null;
        this.value = null;
        this.addCondition = function () {
            this.conditions.push(new global.Meanbee.ShippingRules.PostalCodeCondition(this.calculator, this, this, `${this.prefix}-c${this.id}`, this.conditions.length));
        };
        this.removeCondition = function (id) {
            this.conditions.splice(id, 1);
            this.conditions.forEach((c, i) => c.id = i);
            this.calculator.focusedElement = (id < this.conditions.length && `${this.prefix}-c${this.id}-c${id}`)                    ||
                                             (this.conditions.length && `${this.prefix}-c${this.id}-c${this.conditions.length - 1}`) ||
                                             `${this.prefix}-c${this.id}`;
        };
        this.replaceCondition = function (id, condition) {
            this.conditions[id] = condition;
        };
        this.render = function () {
            var me = this;
            return (<li id={`${me.prefix}-c${me.id}`} tabIndex="0" onKeyUp={event => {
                switch (event.which || event.keyCode) {
                case 187: // = (+)
                    event.stopPropagation();
                    me.calculator.focusedElement = `${me.prefix}-c${me.id}-c${me.conditions.length}`;
                    me.addCondition();
                    me.calculator.render();
                    break;
                case 189: // -
                    event.stopPropagation();
                    me.group.removeCondition(me.id);
                    me.calculator.render();
                    break;
                default:
                    // NO-OP
                }
            }}>
                Postal Code of
                <select id={`${me.prefix}-c${me.id}-format`} value={me.format} onChange={event => {
                    me.format = event.target.value;
                    me.calculator.render();
                }}>{global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getPostalCodeFormats())}</select>
                where
                <select id={`${me.prefix}-c${me.id}-aggregator`} value={me.aggregator} onChange={event => me.aggregator = event.target.value}>
                    {global.Meanbee.ShippingRules.util.toOptions(global.Meanbee.ShippingRules.ajax.getAggregators())}
                </select>
                of these conditions are
                <select id={`${me.prefix}-c${me.id}-value`} value={me.value} onChange={event => me.value = event.target.value}>
                    <option value="1">TRUE</option>
                    <option value="0">FALSE</option>
                </select>:
                {(function () {
                    var formatData = global.Meanbee.ShippingRules.ajax.getPostalCodeFormatByCountryCode(me.format);
                    if (formatData.example) {
                        return (<div class="helpWrapper" tabIndex="0">
                            <span class="help">?</span>
                            <div class="helpContainer">
                                <div class="exampleWrapper">
                                    <div class="examplePostalCode">
                                        {formatData.example.map((p, i) => {
                                            if (formatData.parts[i+1])
                                                return <div class="part" data-part={i+1}>{p}</div>;
                                            return p;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>);
                    }
                })()}
                <button id={`${me.prefix}-t${me.id}-remove`} type="button" class="remove" onClick={() => {
                    me.group.removeCondition(me.id);
                    me.calculator.render();
                }}>-</button>
                <ul>
                    {me.conditions.map(c => c.render())}
                    <li><button id={`${me.prefix}-c${me.id}-cNew`} type="button" class="add" onClick={() => {
                        me.calculator.focusedElement = `${me.prefix}-c${me.id}-c${me.conditions.length}`;
                        me.addCondition();
                        me.calculator.render();
                    }}>+</button></li>
                </ul>
            </li>);
        };
        this.toJSON = function () {
            return {
                '@type'   : 'CompoundCondition',
                compound  : 'PostalCode',
                id        : this.id,
                format    : this.format,
                aggregator: {
                    '@type'   : 'Aggregator',
                    aggregator: this.aggregator,
                    value     : this.value,
                    children  : this.conditions
                }
            };
        };
    };

})(window);
