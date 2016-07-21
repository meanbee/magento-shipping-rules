QUnit.test('Aggregator Serialization', function(assert) {
    Object.keys(Meanbee.ShippingRules.registers.aggregator.children).forEach(function (aggregatorKey) {
        var aggregator = new (Meanbee.ShippingRules.registers.aggregator.get(aggregatorKey));
        assert.deepEqual(aggregator.toJSON().register, 'Aggregator');
        assert.ok(typeof aggregator.toJSON().key === 'string');
        assert.ok(aggregator.toJSON().key);
        assert.ok(Array.isArray(aggregator.toJSON().children));
    });
});

QUnit.test('Condition Serialization', function(assert) {
    Object.keys(Meanbee.ShippingRules.registers.condition.children).forEach(function (conditionKey) {
        var condition = new (Meanbee.ShippingRules.registers.condition.get(conditionKey));
        assert.deepEqual(condition.toJSON().register, 'Condition');
        assert.deepEqual(condition.toJSON().key, conditionKey);
    });
});

QUnit.test('Comparator Serialization', function (assert) {
    Object.keys(Meanbee.ShippingRules.registers.comparator.children).forEach(function (comparatorKey) {
        var comparator = new (Meanbee.ShippingRules.registers.comparator.get(comparatorKey));
        assert.deepEqual(comparator.toJSON().register, 'Comparator');
        assert.deepEqual(comparator.toJSON().key, comparatorKey);
    });
});

QUnit.test('Term Serialization', function (assert) {
    Object.keys(Meanbee.ShippingRules.registers.term.children).forEach(function (termKey) {
        var term = new (Meanbee.ShippingRules.registers.term.get(termKey));
        assert.deepEqual(term.toJSON().register, 'Term');
        assert.deepEqual(term.toJSON().key, termKey);
    });
});