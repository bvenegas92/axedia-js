define([
    "./convert",
    "../regExp/hexColor",
    "../convert/hexToDec"
], function() {
    /**
     * Convierte el valor Hex a valores RGB
     *
     * @param {String} hex Valor Hex
     * @return {Number[]} Array con los valores RGB
     */
    $.Convert.HexToRGB = function(hex) {
        var r, g, b;

        if (!$.RegExp.HEX_COLOR.test(hex)) {
            throw new Error("El valor \"" + hex + "\" no es un color hexadecimal válido");
        }

        if (hex.length == 4) {
            r = hex.substr(1, 1);
            r += r;
            g = hex.substr(2, 1);
            g += g;
            b = hex.substr(3, 1);
            b += b;
        } else {
            r = hex.substr(1, 2);
            g = hex.substr(3, 2);
            b = hex.substr(5, 2);
        }

        return [$.Convert.hexToDec(r), $.Convert.hexToDec(g), $.Convert.hexToDec(b)];
    };
});
