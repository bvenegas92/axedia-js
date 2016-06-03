define([
    "./convert",
    "../convert/decToHex",
    "../string/leftPad"
], function() {
    /**
     * Convierte los valores RGB a valor Hex
     *
     * @param {Number} r Rojo
     * @param {Number} g Verde
     * @param {Number} b Azul
     * @return {String} String con el valor Hex
     */
    $.Convert.RGBToHex = function(r, g, b) {
        r = $.Number.constrain(r, 0, 255);
        g = $.Number.constrain(g, 0, 255);
        b = $.Number.constrain(b, 0, 255);

        var hex = '#';

        hex += $.String.leftPad($.Convert.decToHex(r), 2, "0");
        hex += $.String.leftPad($.Convert.decToHex(g), 2, "0");
        hex += $.String.leftPad($.Convert.decToHex(b), 2, "0");

        return hex.toUpperCase();
    };
});
