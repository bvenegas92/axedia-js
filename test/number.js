describe("Number", function() {
    var num;

    beforeEach(function() {
        num = 8;
    });

    if (Number.clipIndices) {
        it('clipIndices debe normalizar los indices', function() {
            var clipIndices = Number.clipIndices(10, [2, -4]);

            expect(clipIndices).toEqual([2, 6]);
        });
    }

    if (Number.constrain) {
        it('constrain debe limitar el valor al intervalo [5, 10]', function() {
            var newNum = Number.constrain(num, 5, 10);

            expect(newNum).toBeGreaterThan(4);
            expect(newNum).toBeLessThan(11);
        });
    }

    if (Number.correctFloat) {
        it('correctFloat debe corregir flotantes', function() {
            var correctFloat = Number.correctFloat(0.1 + 0.2);

            expect(correctFloat).toEqual(0.3);
        });
    }

    if (Number.from) {
        it('from debe convertir', function() {
            var from = Number.from('2.5', 2);

            expect(from).toEqual(2.5);
        });
    }

    if (Number.randomInt) {
        it('randomInt debe generar un valor en el intervalo [5, 10]', function() {
            var newNum = Number.randomInt(5, 10);

            expect(newNum).toBeGreaterThan(4);
        });
    }
});
