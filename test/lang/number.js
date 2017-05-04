describe("Number", function() {
    var num;

    beforeEach(function() {
        num = 8;
    });

    it('constrain[5, 10]', function() {
        var value = Number.constrain(num, 5, 10);

        expect(value).toBeGreaterThan(4);
        expect(value).toBeLessThan(11);
    });

    it('correctFloat', function() {
        var value = Number.correctFloat(0.1 + 0.2);

        expect(value).toEqual(0.3);
    });

    it('decimalAdjust', function() {
        var value = Number.decimalAdjust(123.456789, 3);

        expect(value).toBeGreaterThan(123);
    });

    it('round', function() {
        var value = Number.round(123.456789, 3);

        expect(value).toBe(123.457);
    });

    it('trunc', function() {
        var value = Number.trunc(123.456789, 3);

        expect(value).toBe(123.456);
    });

    it('ceil', function() {
        var value = Number.ceil(123.456789, 3);

        expect(value).toBe(123.457);
    });

    it('floor', function() {
        var value = Number.floor(123.456789, 3);

        expect(value).toBe(123.456);
    });

    it('randomInt', function() {
        var value = Number.randomInt(5, 10);

        expect(value).toBeGreaterThan(4);
    });

    it('from', function() {
        var value = Number.from("4");

        expect(value).toEqual(4);
    });
});
