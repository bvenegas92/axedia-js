describe("Array", function() {
    describe('each', function() {
        var on, items = ['alfa', 'beta', 'gamma'];

        beforeAll(function() {
            on = {
                each: function(item, index) {
                }
            };
            spyOn(on, 'each');
            Axedia.Array.each(items, on.each);
        });

        it('debe invocar 3 veces la funcion', function() {
            expect(on.each).toHaveBeenCalledTimes(3);
        });
    });
});
