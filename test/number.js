describe("Number", function() {
    var num;

    beforeEach(function() {
        num = 8;
    });

    it('constrain debe limitar el valor al intervalo [5, 10]', function() {
        var newNum = Axedia.Number.constrain(num, 5, 10);

        expect(newNum).toBeGreaterThan(4);
        expect(newNum).toBeLessThan(11);
    });

    it('randomInt debe generar un valor en el intervalo [5, 10]', function() {
        var newNum = Axedia.Number.randomInt(5, 10);

        expect(newNum).toBeGreaterThan(4);
        expect(newNum).toBeLessThan(11);
    });
});
