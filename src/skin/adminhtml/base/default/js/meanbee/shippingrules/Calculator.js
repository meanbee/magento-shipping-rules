'use strict';
(function (global) {
    !('Meanbee' in global) && (global.Meanbee = {});
    !('ShippingRules' in global.Meanbee) && (global.Meanbee.ShippingRules = {});

    global.Meanbee.ShippingRules.Calculator = function (container, field, id = 0) {
        var me = this;
        this.container = container;
        this.id = id;
        this.field = field;
        this.terms = [];
        this.focusedElement = null;
        this.addTerm = function (constant = false) {
            this.terms.push(new global.Meanbee.ShippingRules.Term(this, `c${this.id}`, this.terms.length, constant));
        };
        this.addTerm(true);
        this.removeTerm = function (id) {
            this.terms.splice(id, 1);
            this.terms.forEach((t, i) => t.id = i);
            this.focusedElement = (id < this.terms.length && `c${this.id}-t${id}`)               ||
                                  (this.terms.length && `c${this.id}-t${this.terms.length - 1}`) ||
                                  `c${this.id}`;
        };
        this.render = function () {
            this.focusedElement = this.focusedElement || document.activeElement.id;
            [].forEach.call(this.container.children, (function (child) {
                this.container.removeChild(child);
            }).bind(this));
            container.classList.add('calculator-tree');
            container.appendChild(<ul id={`c${me.id}`} tabIndex="0" onKeyUp={event => {
                switch (event.which || event.keyCode) {
                case 32: // Space
                case 39: // Right Arrow
                    event.stopPropagation();
                    event.target.firstElementChild.focus();
                    break;
                case 187: // = (+)
                    event.stopPropagation();
                    me.focusedElement = `${me.id}-t${me.terms.length}`;
                    me.addTerm();
                    me.render();
                    break;
                default:
                    // NO-OP
                }
            }}>
                {me.terms.map(t => t.render())}
                <li>{global.Meanbee.ShippingRules.util.addButton(me, () => {
                    me.focusedElement = `c${me.id}-t${me.terms.length}`;
                    me.addTerm();
                    me.render();
                })}</li>
            </ul>);
            if (this.focusedElement) {
                document.getElementById(this.focusedElement).focus();
                this.focusedElement = null;
            }
            global.Meanbee.ShippingRules.util.resizeFields()
            this.field.value = JSON.stringify(this);
            return this;
        };
        this.toJSON = function () {
            return {
                '@type'   : 'Aggregator',
                aggregator: 'Summative',
                id        : this.id,
                children : this.terms
            };
        };
    };
})(window);
