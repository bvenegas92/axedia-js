/*describe("Array", function() {
    var items = [];

    beforeEach(function() {
        items = ['alfa', 'beta', 'gamma', 'delta'];
    });

    if (Array.clean) {
        it('clean', function() {
            var newItems = Array.clean(['alfa', 'beta', 'gamma', 'delta', '']);

            expect(items).toEqual(newItems);
        });
    }

    if (Array.clone) {
        it('clone', function() {
            var newItems = Array.clone(items);

            expect(newItems == items).toBe(false);
        });
    }

    if (Array.contains) {
        it('contains', function() {
            var contains = Array.contains(items, 'alfa');

            expect(contains).toBe(true);
        });
    }

    if (Array.difference) {
        it('difference', function() {
            var difference = Array.difference(items, ['alfa', 'beta']);

            expect(difference).toEqual(['gamma', 'delta']);
        });
    }

    if (Array.each) {
        it('each', function() {
            var on = {
                each: function(item, index) {
                }
            };

            spyOn(on, 'each');
            Array.each(items, on.each);
            expect(on.each).toHaveBeenCalledTimes(4);
        });
    }

    if (Array.erase) {
        it('erase', function() {
            var erase = Array.erase(items, 1, 2);

            expect(erase).toEqual(['alfa', 'delta']);
        });
    }

    if (Array.every) {
        it('every', function() {
            var every = Array.every(items, function(item) {
                return /alfa|beta|gamma|delta/.test(item);
            });

            expect(every).toBe(true);
        });
    }

    if (Array.filter) {
        it('filter', function() {
            var filter = Array.filter(items, function(item) {
                return /alfa|delta/.test(item);
            });

            expect(filter).toEqual(['alfa', 'delta']);
        });
    }

    if (Array.findBy) {
        it('findBy', function() {
            var find = Array.findBy(items, function(item) {
                return item === 'beta';
            });

            expect(find).toEqual('beta');
        });
    }

    if (Array.flatten) {
        it('flatten', function() {
            var flatten = Array.flatten([
                'alfa',
                [
                    'beta',
                    [
                        'gamma',
                        [
                            'delta'
                        ]
                    ]
                ]
            ]);

            expect(flatten).toEqual(items);
        });
    }

    if (Array.from) {
        it('from', function() {
            var from = Array.from('alfa');

            expect(from).toEqual(['alfa']);
        });
    }

    if (Array.include) {
        it('include', function() {
            var include = ['alfa', 'beta', 'gamma'];
            Array.include(include, 'delta');

            expect(include).toEqual(items);
        });
    }

    if (Array.indexOf) {
        it('indexOf', function() {
            var index;

            index = Array.indexOf(items, 'beta');
            expect(index).toBe(1);
        });
    }

    if (Array.insert) {
        it('insert', function() {
            var insert = ['alfa', 'beta', 'gamma'];
            insert = Array.insert(insert, 2, ['delta']);

            expect(insert).toEqual(['alfa', 'beta', 'delta', 'gamma']);
        });
    }

    if (Array.intersect) {
        it('intersect', function() {
            var arr1 = ['alfa', 'beta', 'gamma'],
            arr2 = ['alfa', 'delta'],
            arr3 = ['alfa', 'gamma'];
            intersect = Array.intersect(arr1, arr2, arr3);

            expect(intersect).toEqual(['alfa']);
        });
    }

    if (Array.map) {
        it('map"item_" a los elementos', function() {
            var newItems = Array.map(items, function(item) {
                return 'item_' + item;
            });

            expect(newItems).toEqual(['item_alfa', 'item_beta', 'item_gamma', 'item_delta']);
        });
    }

    if (Array.max) {
        it('max', function() {
            var max = Array.max([1, 2, 3]);

            expect(max).toEqual(3);
        });
    }

    if (Array.mean) {
        it('mean', function() {
            var mean = Array.mean([1, 2, 3]);

            expect(mean).toEqual(2);
        });
    }

    if (Array.merge) {
        it('merge', function() {
            var newItems = Array.merge(items, ['a', 'b', 'c'], ['a', 1, 2, 3]);

            expect(newItems).toEqual(['alfa', 'beta', 'gamma', 'delta', 'a', 'b', 'c', 1, 2, 3]);
        });
    }

    if (Array.min) {
        it('min', function() {
            var min = Array.min([1, 2, 3]);

            expect(min).toEqual(1);
        });
    }

    if (Array.pluck) {
        it('pluck', function() {
            var pluck = Array.pluck([
                {
                    alfa: 'a',
                    beta: 'b'
                },
                {
                    alfa: 'a',
                    gamma: 'g'
                },
                {
                    alfa: 'a',
                    delta: 'd'
                }
            ], 'alfa');

            expect(pluck).toEqual(['a', 'a', 'a']);
        });
    }

    if (Array.push) {
        it('push', function() {
            var push = Array.push(items, 'epsilon');

            expect(push).toEqual(['alfa', 'beta', 'gamma', 'delta', 'epsilon']);
        });
    }

    if (Array.remove) {
        it('remove', function() {
            var remove = Array.remove(items, 'alfa');

            expect(remove).toEqual(['beta', 'gamma', 'delta']);
        });
    }

    if (Array.replace) {
        it('replace', function() {
            var replace = Array.replace(items, 1, 2, ['a', 'b', 'c']);

            expect(replace).toEqual(['alfa', 'a', 'b', 'c', 'delta']);
        });
    }

    if (Array.slice) {
        it('slice', function() {
            var newItems = Array.slice(items, 0, 2);

            expect(newItems).toEqual(['alfa', 'beta']);
        });
    }

    if (Array.some) {
        it('some', function() {
            var some = Array.some(items, function(item) {
                return /alfa|beta|gamma|delta/.test(item);
            });

            expect(some).toBe(true);
        });
    }

    if (Array.sort) {
        it('sort', function() {
            var sort = Array.sort(items);

            expect(sort).toEqual(['alfa', 'beta', 'delta', 'gamma']);
        });
    }

    if (Array.splice) {
        it('splice', function() {
            Array.splice(items, 2, 1, 'epsilon');

            expect(items).toEqual(['alfa', 'beta', 'epsilon', 'delta']);
        });
    }

    if (Array.sum) {
        it('sum', function() {
            var sum = Array.sum([1, 2, 3]);

            expect(sum).toEqual(6);
        });
    }

    if (Array.toArray) {
        it('toArray', function() {
            var toArray = Array.toArray('alfa');

            expect(toArray).toEqual(['a', 'l', 'f', 'a']);
        });
    }

    if (Array.toMap) {
        it('toMap', function() {
            var toMap = Array.toMap(items);

            expect(toMap).toEqual({
                alfa: 1,
                beta: 2,
                gamma: 3,
                delta: 4
            });
        });
    }

    if (Array.toValueMap) {
        it('toValueMap', function() {
            var toValueMap = Array.toValueMap(items);

            expect(toValueMap).toEqual({
                alfa: 'alfa',
                beta: 'beta',
                gamma: 'gamma',
                delta: 'delta'
            });
        });
    }

    if (Array.unique) {
        it('unique', function() {
            var newItems = Array.unique(['alfa', 'beta', 'gamma', 'alfa', 'delta']);

            expect(items).toEqual(newItems);
        });
    }
});
*/
