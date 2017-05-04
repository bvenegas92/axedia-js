describe("Math", function() {
    it('trunc', function() {
        var value = Math.trunc(0.12345);

        expect(value).toEqual(0);
    });
});
