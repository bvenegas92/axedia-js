define([
    "./convert",
    "../number/decimalAdjust",
    "../number/constrain"
], function() {
    /**
     * Convierte los valores HSL a valores RGB
     *
     * @param {Number} h Matiz
     * @param {Number} s Saturación
     * @param {Number} l Luminosidad
     * @return {Number[]} Array con los valores RGB
     */
    $.Convert.HSLToRGB = function(h, s, l) {
        h = (h >= 0 ? h : 360 - (-h % 360)) % 360;
        s = $.Number.constrain($.Number.decimalAdjust(s, 4), 0, 1);
        l = $.Number.constrain($.Number.decimalAdjust(l, 4), 0, 1);

        var C, X, m,
            rgb = [];

        if (s === 0 || h == null) {
            // achromatic
            rgb = [l, l, l];
        } else {
            // http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
            // C is the chroma
            // X is the second largest component
            // m is the lightness adjustment
            h /= 60;
            C = s * (1 - Math.abs(2 * l - 1));
            X = C * (1 - Math.abs(h % 2 - 1));
            m = l - C / 2;

            switch (Math.floor(h)) {
                case 0:
                    rgb = [C, X, 0];
                    break;
                case 1:
                    rgb = [X, C, 0];
                    break;
                case 2:
                    rgb = [0, C, X];
                    break;
                case 3:
                    rgb = [0, X, C];
                    break;
                case 4:
                    rgb = [X, 0, C];
                    break;
                case 5:
                    rgb = [C, 0, X];
                    break;
            }
            rgb = [rgb[0] + m, rgb[1] + m, rgb[2] + m];
        }
        return [Math.round(rgb[0] * 255), Math.round(rgb[1] * 255), Math.round(rgb[2] * 255)];
    };
});
