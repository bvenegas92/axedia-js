describe("Class", function() {
    if (Axedia.Class) {
        if (Axedia.Class.find) {
            it('find debe encontrar', function() {
                var value = Axedia.Class.find('Axedia.Array.noClass', true);

                expect(value).toEqual(null);
            });
        }

        if (Axedia.Class.validateClassName) {
            it('validateClassName debe validar', function() {
                var value = Axedia.Class.validateClassName('Axedia.Array.noClass');

                expect(value).toBe(true);
            });
        }
    }
});

