describe("Color", function() {
    var color;

    beforeEach(function() {
        color = new Color(100, 200, 250);
    });

    it('RGBToHSL', function() {
        var value = Color.RGBToHSL(100, 200, 250)[0];

        expect(value).toEqual(200);
    });

    it('RGBToHex', function() {
        var value = Color.RGBToHex(100, 200, 250);

        expect(value).toEqual("#64c8fa");
    });

    it('HSLToRGB', function() {
        var value = Color.HSLToRGB(200, 0.95, 0.5);

        expect(value).toEqual([6, 168, 249]);
    });

    it('HSLToHex', function() {
        var value = Color.HSLToHex(200, 0.95, 0.5);

        expect(value).toEqual("#06a8f9");
    });

    it('HexToHSL', function() {
        var value = Color.HexToHSL("#06a8f9")[0];

        expect(value).toEqual(200);
    });

    it('HexToRGB', function() {
        var value = Color.HexToRGB("#06a8f9");

        expect(value).toEqual([6, 168, 249]);
    });

    it('fromRGB', function() {
        var value = Color.fromRGB(100, 200, 250)._r;

        expect(value).toEqual(100);
    });

    it('fromHSL', function() {
        var value = Color.fromHSL(200, 0.95, 0.5)._r;

        expect(value).toEqual(6);
    });

    it('fromHex', function() {
        var value = Color.fromHex("#06a8f9")._r;

        expect(value).toEqual(6);
    });

    it('getRGB', function() {
        var value = color.getRGB();

        expect(value).toEqual([100, 200, 250]);
    });

    it('setRGB', function() {
        var value = color.setRGB(10, 20, 30).getRGB();

        expect(value).toEqual([10, 20, 30]);
    });

    it('getHSL', function() {
        var value = color.getHSL()[0];

        expect(value).toEqual(200);
    });

    it('setHSL', function() {
        var value = color.setHSL(100, 0.95, 0.5).getHSL()[0];

        expect(value).toEqual(100);
    });

    it('getHex', function() {
        var value = color.getHex();

        expect(value).toEqual("#64c8fa");
    });

    it('setHex', function() {
        var value = color.setHex("#aabbcc")._r;

        expect(value).toEqual(170);
    });

    it('getLighter', function() {
        var value = color.getLighter(0.2).getHSL()[2];

        expect(value).toBeGreaterThan(0.88);
    });

    it('getDarker', function() {
        var value = color.getDarker(0.2).getHSL()[2];

        expect(value).toBeGreaterThan(0.48);
    });

    it('getSaturated', function() {
        var value = Color.fromHSL(0, 0.5, 0.5).getSaturated(0.2).getHSL()[1];

        expect(value).toBeGreaterThan(0.65);
    });

    it('getDesaturated', function() {
        var value = Color.fromHSL(0, 0.5, 0.5).getDesaturated(0.2).getHSL()[1];

        expect(value).toBeGreaterThan(0.29);
    });

    it('toString', function() {
        var value = color.toString();

        expect(value).toEqual("#64c8fa");
    });
});
