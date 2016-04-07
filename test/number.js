/*describe("Number", function() {
    var num;

    beforeEach(function() {
        num = 8;
    });

    if (Axedia.Number) {
        if (Axedia.Number.clipIndices) {
            it('clipIndices debe normalizar los indices', function() {
                var clipIndices = Axedia.Number.clipIndices(10, [2, -4]);

                expect(clipIndices).toEqual([2, 6]);
            });
        }

        if (Axedia.Number.constrain) {
            it('constrain debe limitar el valor al intervalo [5, 10]', function() {
                var newNum = Axedia.Number.constrain(num, 5, 10);

                expect(newNum).toBeGreaterThan(4);
                expect(newNum).toBeLessThan(11);
            });
        }

        if (Axedia.Number.correctFloat) {
            it('correctFloat debe corregir flotantes', function() {
                var correctFloat = Axedia.Number.correctFloat(0.1 + 0.2);

                expect(correctFloat).toEqual(0.3);
            });
        }

        if (Axedia.Number.from) {
            it('from debe convertir', function() {
                var from = Axedia.Number.from('2.5', 2);

                expect(from).toEqual(2.5);
            });
        }

        if (Axedia.Number.randomInt) {
            it('randomInt debe generar un valor en el intervalo [5, 10]', function() {
                var newNum = Axedia.Number.randomInt(5, 10);

                expect(newNum).toBeGreaterThan(4);
            });
        }
    }
});
*/
