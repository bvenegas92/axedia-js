define([
    "./convert",
    "./hexToRgb",
    "./rgbToHsl"
], function() {
    /**
     * Convierte el valor Hex a valores RGB
     *
     * @param {String} hex Valor Hex
     * @return {Number[]} Array con los valores RGB
     */
    $.Convert.HexToHSL = function(hex) {
        var rgb = $.Convert.HexToRGB(hex);

        return $.Convert.RGBToHSL(rgb[0], rgb[1], rgb[2]);
    };
});
