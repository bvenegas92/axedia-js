describe("Class", function() {
    if (Axedia.Class) {
        if (Axedia.Class.find) {
            it('find debe encontrar', function() {
                var value = Axedia.Class.find('Axedia.Array.noClass', true);

                expect(value).toEqual(null);
            });
        }
    }
});

