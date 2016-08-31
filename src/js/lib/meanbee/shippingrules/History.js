/**
 * Encapsulates the changes made to the calculator fields on the page in a
 * temporally ordered form, allowing for time travelling through
 * present-past-present and present-future-present states, where this object
 * serves as the objective cannonical record of time.
 *
 * @memberof Meanbee.ShippingRules
 */
class History {
    constructor() {
        this.history = [];
        this.pointer = 0; // The index of the history array at which new entries should be added.
    }

    /**
     * Adds a new state to the history truncating the history, removing past-future-present states.
     * @returns {boolean} Whether paste-future-present states have been lost.
     */
    pushState() {
        let historyEntry = this.getCurrentState();
        let lostStates = this.history.length > this.pointer;
        this.history.length = this.pointer; // Truncate history array removing past-future-present states.
        this.history[this.pointer] = historyEntry;
        this.pointer++;
        return lostStates;
    }

    /**
     * Steps back to the next present-past-present state.
     * @returns {Object} The historic state that was replaced.
     */
    undo() {
        let replaced = this.getCurrentState();
        this.pointer--;
        let historyEntry = this.history[this.pointer - 1];
        if (!historyEntry) {
            this.pointer++;
            return;
        }
        this.renderHistoricState(historyEntry);
        return replaced;
    }

    /**
     * Steps forward to the next present-future-present states.
     * @returns {Object} The historic state that was replaced
     */
    redo() {
        let replaced = this.getCurrentState();
        let historyEntry = this.history[this.pointer];
        if (!historyEntry) {
            return;
        }
        this.pointer++;
        this.renderHistoricState(historyEntry);
        return replaced;
    }

    /**
     * Renders a historic state to the page regarless of its point in history,
     * present-present, present-past-present or present-future-present.
     * @param {Object} historicEntry The historic state to render.
     * @returns {Object} The historic state that was replaced
     */
    renderHistoricState(historyEntry) {
        let replaced = this.getCurrentState();
        Object.keys(historyEntry).forEach(function (calculator) {
            Meanbee.ShippingRules.calculators[calculator].init(JSON.parse(historyEntry[calculator]));
            Meanbee.ShippingRules.calculators[calculator].rerender();
        });
        return replaced;
    }

    /**
     * Gets the currrent rendered state.
     * @returns {Object} A historic state representing the present-present.
     */
    getCurrentState() {
        let currentState = {};
        Object.keys(Meanbee.ShippingRules.calculators).forEach(function (calculator) {
            currentState[calculator] = JSON.stringify(Meanbee.ShippingRules.calculators[calculator]);
        });
        return currentState;
    }
}

export default History