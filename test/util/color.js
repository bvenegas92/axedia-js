/*describe("Color", function() {
    var color;

    beforeEach(function() {
        color = new Color(100, 200, 250);
    });

    it('RGBToHSL', function() {
        expect(Color.RGBToHSL(100, 200, 250)[0]).toEqual(200);
    });

    it('RGBToHex', function() {
        expect(Color.RGBToHex(100, 200, 250)).toEqual("#64c8fa");
    });

    it('HSLToRGB', function() {
        expect(Color.HSLToRGB(200, 0.95, 0.5)).toEqual([6, 168, 249]);
    });

    it('HSLToHex', function() {
        expect(Color.HSLToHex(200, 0.95, 0.5)).toEqual("#06a8f9");
    });

    it('HexToHSL', function() {
        expect(Color.HexToHSL("#06a8f9")[0]).toEqual(200);
    });

    it('HexToRGB', function() {
        expect(Color.HexToRGB("#06a8f9")).toEqual([6, 168, 249]);
    });

    it('fromRGB', function() {
        expect(Color.fromRGB(100, 200, 250)._r).toEqual(100);
    });

    it('fromHSL', function() {
        expect(Color.fromHSL(200, 0.95, 0.5)._r).toEqual(6);
    });

    it('fromHex', function() {
        expect(Color.fromHex("#06a8f9")._r).toEqual(6);
    });

    it('getRGB', function() {
        expect(color.getRGB()).toEqual([100, 200, 250]);
    });

    it('setRGB', function() {
        expect(color.setRGB(10, 20, 30).getRGB()).toEqual([10, 20, 30]);
    });

    it('getHSL', function() {
        expect(color.getHSL()[0]).toEqual(200);
    });

    it('setHSL', function() {
        expect(color.setHSL(100, 0.95, 0.5).getHSL()[0]).toEqual(100);
    });

    it('getHex', function() {
        expect(color.getHex()).toEqual("#64c8fa");
    });

    it('setHex', function() {
        expect(color.setHex("#aabbcc")._r).toEqual(170);
    });

    it('getLighter', function() {
        expect(color.getLighter(0.2).getHSL()[2]).toBeGreaterThan(0.88);
    });

    it('getDarker', function() {
        expect(color.getDarker(0.2).getHSL()[2]).toBeGreaterThan(0.48);
    });

    it('getSaturated', function() {
        var value = Color.fromHSL(0, 0.5, 0.5);
        expect(value.getSaturated(0.2).getHSL()[1]).toBeGreaterThan(0.65);
    });

    it('getDesaturated', function() {
        var value = Color.fromHSL(0, 0.5, 0.5);
        expect(value.getDesaturated(0.2).getHSL()[1]).toBeGreaterThan(0.29);
    });

    it('toString', function() {
        expect(color.toString()).toEqual("#64c8fa");
    });
});
*/
