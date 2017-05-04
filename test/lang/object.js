describe("Object", function() {
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

    it('clone', function() {
        var value = Object.clone({number: 2});

        expect(value).toEqual({number: 2});
    });

    it('copy', function() {
        var value = Object.copy({number: 2}, obj);

        expect(value.fn == obj.fn).toBe(true);
    });

    it('copyIf', function() {
        var value = Object.copyIf({number: 2}, obj);

        expect(value.number != obj.number).toBe(true);
    });

    it('each', function() {
        var on = {
            each: function(item, index) {
            }
        };

        spyOn(on, 'each');
        Object.each(obj, on.each);
        expect(on.each).toHaveBeenCalledTimes(5);
    });

    it('equals', function() {
        var value = Object.equals({number: 2}, {number: 2});

        expect(value).toBe(true);
    });

    it('getAllKeys', function() {
        var value = Object.getAllKeys(obj);

        expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
    });

    it('getKeys', function() {
        var value = Object.getKeys(obj);

        expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
    });

    it('getKey', function() {
        var value = Object.getKey(obj, 1);

        expect(value).toEqual("number");
    });

    it('getValues', function() {
        var value = Object.getValues(obj);

        expect(value).toEqual([1, "str", [], obj.fn, true]);
    });

    it('merge', function() {
        var value = Object.merge({alfa: 'a'}, {beta: 1});

        expect(value).toEqual({alfa: 'a', beta: 1});
    });
});
