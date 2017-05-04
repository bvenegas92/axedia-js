describe("Array", function() {
    var items = [];

    beforeEach(function() {
        items = ['alfa', 'beta', 'gamma', 'delta'];
    });

    it('clean', function() {
        var value = Array.clean(['alfa', 'beta', 'gamma', 'delta', '']);

        expect(value).toEqual(items);
    });

    it('clone', function() {
        var value = Array.clone(items);

        expect(value == items).toBe(false);
    });

    it('contains', function() {
        var value = Array.contains(items, 'alfa');

        expect(value).toBe(true);
    });

    it('difference', function() {
        var value = Array.difference(items, ['alfa', 'beta']);

        expect(value).toEqual(['gamma', 'delta']);
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
        var value = Array.erase(items, 1, 2);

        expect(value).toEqual(['alfa', 'delta']);
    });

    it('findBy', function() {
        var value = Array.findBy(items, function(item) {
            return item === 'beta';
        });

        expect(value).toEqual('beta');
    });

    it('from', function() {
        var value = Array.from(items);

        expect(value).toEqual(items);
    });

    it('indexBy', function() {
        var value = Array.indexBy(items, function(item) {
            return item === 'beta';
        });

        expect(value).toEqual(1);
    });

    it('include', function() {
        var value = ['alfa', 'beta', 'gamma'];
        Array.include(value, 'delta');

        expect(value).toEqual(items);
    });

    it('insert', function() {
        var value = ['alfa', 'beta', 'gamma'];
        value = Array.insert(value, 2, ['delta']);

        expect(value).toEqual(['alfa', 'beta', 'delta', 'gamma']);
    });

    it('intersect', function() {
        var arr1 = ['alfa', 'beta', 'gamma'],
            arr2 = ['alfa', 'delta'],
            arr3 = ['alfa', 'gamma'],
            value = Array.intersect(arr1, arr2, arr3);

        expect(value).toEqual(['alfa']);
    });

    it('max', function() {
        var value = Array.max([1, 2, 3]);

        expect(value).toEqual(3);
    });

    it('mean', function() {
        var value = Array.mean([1, 2, 3]);

        expect(value).toEqual(2);
    });

    it('merge', function() {
        var value = Array.merge(items, ['a', 'b', 'c'], ['a', 1, 2, 3]);

        expect(value).toEqual(['alfa', 'beta', 'gamma', 'delta', 'a', 'b', 'c', 1, 2, 3]);
    });

    it('min', function() {
        var value = Array.min([1, 2, 3]);

        expect(value).toEqual(1);
    });

    it('pluck', function() {
        var value = Array.pluck([
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

        expect(value).toEqual(['a', 'a', 'a']);
    });

    it('remove', function() {
        var value = Array.remove(items, 'alfa');

        expect(value).toEqual(['beta', 'gamma', 'delta']);
    });

    it('removeAt', function() {
        var value = Array.removeAt(items, 1);

        expect(value).toEqual(['alfa', 'gamma', 'delta']);
    });

    it('replace', function() {
        var value = Array.replace(items, 1, 2, ['a', 'b', 'c']);

        expect(value).toEqual(['alfa', 'a', 'b', 'c', 'delta']);
    });

    it('sum', function() {
        var value = Array.sum([1, 2, 3]);

        expect(value).toEqual(6);
    });

    it('unique', function() {
        var value = Array.unique(['alfa', 'beta', 'gamma', 'alfa', 'delta']);

        expect(value).toEqual(items);
    });
});
