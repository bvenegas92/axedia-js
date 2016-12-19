/*describe("Array", function() {
    var items = [];

    beforeEach(function() {
        items = ['alfa', 'beta', 'gamma', 'delta'];
    });

    it('clean', function() {
        var newItems = Array.clean(['alfa', 'beta', 'gamma', 'delta', '']);

        expect(items).toEqual(newItems);
    });

    it('clone', function() {
        var newItems = Array.clone(items);

        expect(newItems == items).toBe(false);
    });

    it('contains', function() {
        var contains = Array.contains(items, 'alfa');

        expect(contains).toBe(true);
    });

    it('difference', function() {
        var difference = Array.difference(items, ['alfa', 'beta']);

        expect(difference).toEqual(['gamma', 'delta']);
    });

    it('each', function() {
        var on = {
            each: function(item, index) {
            }
        };

        spyOn(on, 'each');
        Array.each(items, on.each);
        expect(on.each).toHaveBeenCalledTimes(4);
    });

    it('erase', function() {
        var erase = Array.erase(items, 1, 2);

        expect(erase).toEqual(['alfa', 'delta']);
    });

    it('findBy', function() {
        var find = Array.findBy(items, function(item) {
            return item === 'beta';
        });

        expect(find).toEqual('beta');
    });

    it('include', function() {
        var include = ['alfa', 'beta', 'gamma'];
        Array.include(include, 'delta');

        expect(include).toEqual(items);
    });

    it('insert', function() {
        var insert = ['alfa', 'beta', 'gamma'];
        insert = Array.insert(insert, 2, ['delta']);

        expect(insert).toEqual(['alfa', 'beta', 'delta', 'gamma']);
    });

    it('intersect', function() {
        var arr1 = ['alfa', 'beta', 'gamma'],
        arr2 = ['alfa', 'delta'],
        arr3 = ['alfa', 'gamma'];
        intersect = Array.intersect(arr1, arr2, arr3);

        expect(intersect).toEqual(['alfa']);
    });

    it('maxBy', function() {
        var max = Array.maxBy([1, 2, 3]);

        expect(max).toEqual(3);
    });

    it('mean', function() {
        var mean = Array.mean([1, 2, 3]);

        expect(mean).toEqual(2);
    });

    it('merge', function() {
        var newItems = Array.merge(items, ['a', 'b', 'c'], ['a', 1, 2, 3]);

        expect(newItems).toEqual(['alfa', 'beta', 'gamma', 'delta', 'a', 'b', 'c', 1, 2, 3]);
    });

    it('minBy', function() {
        var min = Array.minBy([1, 2, 3]);

        expect(min).toEqual(1);
    });

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

    it('remove', function() {
        var remove = Array.remove(items, 'alfa');

        expect(remove).toEqual(['beta', 'gamma', 'delta']);
    });

    it('replace', function() {
        var replace = Array.replace(items, 1, 2, ['a', 'b', 'c']);

        expect(replace).toEqual(['alfa', 'a', 'b', 'c', 'delta']);
    });

    it('sum', function() {
        var sum = Array.sum([1, 2, 3]);

        expect(sum).toEqual(6);
    });

    it('unique', function() {
        var newItems = Array.unique(['alfa', 'beta', 'gamma', 'alfa', 'delta']);

        expect(items).toEqual(newItems);
    });
});
*/
