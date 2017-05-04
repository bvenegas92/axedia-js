describe("Convert", function() {
    it('decToHex', function() {
        var value = Convert.decToHex(1000);

        expect(value).toEqual("3e8");
    });

    it('hexToDec', function() {
        var value = Convert.hexToDec("3e8");

        expect(value).toEqual(0x3e8);
    });

    it('decByteToHexByte', function() {
        var value = Convert.decByteToHexByte(15);

        expect(value).toEqual("0f");
    });

    it('hexByteToDecByte', function() {
        var value = Convert.hexByteToDecByte("c8");

        expect(value).toEqual(0xc8);
    });
});
