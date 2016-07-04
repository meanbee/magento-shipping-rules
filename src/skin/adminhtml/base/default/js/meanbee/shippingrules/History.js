'use strict';
(function (ShippingRules) {
    ShippingRules.History = class
    {
        constructor() {
            this.history = [];
            this.pointer = 0; // The index of the history array at which new entries should be added.
        }
        
        pushState() {
            let historyEntry = {}
            Object.keys(ShippingRules.calculators).forEach(function (calculator) {
                historyEntry[calculator] = JSON.stringify(ShippingRules.calculators[calculator]);
            });
            this.history.length = this.pointer; // Truncate history array removing past-future-present states.
            this.history[this.pointer] = historyEntry;
            this.pointer++;
        }

        undo() {
            this.pointer--;
            let historyEntry = this.history[this.pointer - 1];
            if (!historyEntry) {
                this.pointer++;
                return;
            }
            this.renderHistoricState(historyEntry);
        }

        redo() {
            let historyEntry = this.history[this.pointer];
            if (!historyEntry) {
                return;
            }
            this.pointer++;
            this.renderHistoricState(historyEntry);
        }

        renderHistoricState(historyEntry) {
            Object.keys(historyEntry).forEach(function (calculator) {
                ShippingRules.calculators[calculator].init(JSON.parse(historyEntry[calculator]));
                ShippingRules.calculators[calculator].rerender();
            });
        }
    };
    ShippingRules.history = new ShippingRules.History;
})(Meanbee.ShippingRules);