describe("Array", function() {
    var items = [];

    beforeEach(function() {
        items = ['alfa', 'beta', 'gamma', 'delta'];
    });

    it('each debe invocar 3 veces la funcion', function() {
        var on = {
            each: function(item, index) {
            }
        };

        spyOn(on, 'each');
        Axedia.Array.each(items, on.each);
        expect(on.each).toHaveBeenCalledTimes(4);
    });

    it('indexOf debe ser 1', function() {
        var index;

        index = Axedia.Array.indexOf(items, 'beta');
        expect(index).toBe(1);
    });

    it('map debe agregar el prefijo "item_" a los elementos', function() {
        var newItems = Axedia.Array.map(items, function(item) {
            return 'item_' + item;
        });

        expect(newItems).toEqual(['item_alfa', 'item_beta', 'item_gamma', 'item_delta']);
    });

    it('merge debe unir todos los arreglos', function() {
        var newItems = Axedia.Array.merge(items, ['a', 'b', 'c'], ['a', 1, 2, 3]);

        expect(newItems).toEqual(['alfa', 'beta', 'gamma', 'delta', 'a', 'b', 'c', 1, 2, 3]);
    });

    it('slice debe partir el arreglo', function() {
        var newItems = Axedia.Array.slice(items, 0, 2);

        expect(newItems).toEqual(['alfa', 'beta']);
    });

    it('unique debe evitar duplicados', function() {
        var newItems = Axedia.Array.unique(['alfa', 'beta', 'gamma', 'alfa', 'delta']);

        expect(items).toEqual(newItems);
    });
});
