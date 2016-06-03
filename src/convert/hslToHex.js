define([
    "./convert",
    "../number/decimalAdjust",
    "./hslToRgb",
    "./rgbToHex"
], function() {
    /**
     * Convierte los valores HSL a valores Hex
     *
     * @param {Number} h Matiz
     * @param {Number} s Saturación
     * @param {Number} l Luminosidad
     * @return {String} String con los valores Hex
     */
    $.Convert.HSLToHex = function(h, s, l) {
        h = (h >= 0 ? h : 360 - (-h % 360)) % 360;
        s = $.Number.constrain($.Number.decimalAdjust(s, 4), 0, 1);
        l = $.Number.constrain($.Number.decimalAdjust(l, 4), 0, 1);

        var rgb = $.Convert.HSLToRGB(h, s, l);

        return $.Convert.RGBToHex(rgb[0], rgb[1], rgb[2]);
    };
});
