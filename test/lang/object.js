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

    it('clone', function() {
        var value = Object.clone({number: 2});

        expect(value).toEqual({number: 2});
    });

    it('equals', function() {
        var value = Object.equals({number: 2}, {number: 2});

        expect(value).toBe(true);
    });

    it('getAllKeys', function() {
        var value = Object.getAllKeys(obj);

        expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
    });

    it('findOwnKey', function() {
        var value = Object.findOwnKey(obj, 1);

        expect(value).toEqual('number');
    });

    it('getOwnKeys', function() {
        var value = Object.getOwnKeys(obj);

        expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
    });

    it('getOwnValues', function() {
        var value = Object.getOwnValues(obj);

        expect(value.length).toEqual(5);
    });

    it('merge', function() {
        var value = Object.merge({alfa: 'a'}, {beta: 1});

        expect(value).toEqual({alfa: 'a', beta: 1});
    });
});
*/
