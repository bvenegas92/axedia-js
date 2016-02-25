describe("String", function() {
    it('splitWords debe separar palabras', function() {
        var words = Axedia.String.splitWords('alfa beta  gamma   delta');

        expect(words).toEqual(['alfa', 'beta', 'gamma', 'delta']);
    });

    it('random debe generar un string que haga match con [a-zA-Z0-9]{1, 32}', function() {
        var string = Axedia.String.random();

        expect(string).toMatch(/[a-zA-Z0-9]{1,32}/);
    });
});
