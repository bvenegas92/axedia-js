describe("Type", function() {
    if (Axedia.Type) {
        if (Axedia.Type.isEmpty) {
            it('isEmpty debe verificar vacios', function() {
                var isEmpty = Axedia.Type.isEmpty('');

                expect(isEmpty).toBe(true);
            });
        }

        if (Axedia.Type.isArray) {
            it('isArray debe verificar arrays', function() {
                var isArray = Axedia.Type.isArray([]);

                expect(isArray).toBe(true);
            });
        }
    }
});
