/*describe("Object", function() {
    var obj;

    beforeEach(function() {
        obj = {
            number: 1,
            string: 'str',
            array: [],
            fn: function() {

            },
            boolean: true
        };
    });

    if (Object.chain) {
        it('chain', function() {
            var value = Object.chain(obj);

            expect(value.__proto__).toEqual(obj);
        });
    }

    if (Object.clear) {
        it('clear', function() {
            var value = Object.clear(obj);

            expect(value).toEqual({});
        });
    }

    if (Object.clone) {
        it('clone', function() {
            var value = Object.clone({number: 2});

            expect(value).toEqual({number: 2});
        });
    }

    if (Object.copy) {
        it('copy', function() {
            var value = Object.copy({number: 2});

            expect(value).toEqual({number: 2});
        });
    }

    if (Object.copyIf) {
        it('copyIf', function() {
            var value = Object.copyIf({number: 2}, obj);

            expect(value.number).toEqual(2);
        });
    }

    if (Object.equals) {
        it('equals', function() {
            var value = Object.equals({number: 2}, {number: 2});

            expect(value).toBe(true);
        });
    }

    if (Object.getAllKeys) {
        it('getAllKeys', function() {
            var value = Object.getAllKeys(obj);

            expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
        });
    }

    if (Object.getKey) {
        it('getKey', function() {
            var value = Object.getKey(obj, 1);

            expect(value).toEqual('number');
        });
    }

    if (Object.getKeys) {
        it('getKeys', function() {
            var value = Object.getKeys(obj);

            expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
        });
    }

    if (Object.getSize) {
        it('getSize', function() {
            var value = Object.getSize(obj);

            expect(value).toEqual(5);
        });
    }

    if (Object.getValues) {
        it('getValues', function() {
            var value = Object.getValues(obj);

            expect(value.length).toEqual(5);
        });
    }

    if (Object.isEmpty) {
        it('isEmpty', function() {
            var value = Object.isEmpty(obj);

            expect(value).toBe(false);
        });
    }

    if (Object.merge) {
        it('merge', function() {
            var value = Object.merge({alfa: 'a'}, {beta: 1});

            expect(value).toEqual({alfa: 'a', beta: 1});
        });
    }
});
*/
