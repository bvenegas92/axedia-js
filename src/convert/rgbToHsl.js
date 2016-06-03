define([
    "./convert",
    "../number/constrain",
    "../number/decimalAdjust"
], function() {
    /**
     * Convierte los valores RGB a valores HSL
     *
     * @param {Number} r Rojo
     * @param {Number} g Verde
     * @param {Number} b Azul
     * @return {Number[]} Array con los valores HSL
     */
    $.Convert.RGBToHSL = function(r, g, b) {
        r = $.Number.constrain(r, 0, 255) / 255;
        g = $.Number.constrain(g, 0, 255) / 255;
        b = $.Number.constrain(b, 0, 255) / 255;

        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            delta = max - min,
            h,
            s = 0,
            l = 0.5 * (max + min);

        // min==max means achromatic (hue is undefined)
        if (min != max) {
            s = (l <= 0.5) ? delta / (max + min) : delta / (2 - max - min);
            if (r == max) {
                h = 60 * (g - b) / delta;
            } else if (g == max) {
                h = 120 + 60 * (b - r) / delta;
            } else {
                h = 240 + 60 * (r - g) / delta;
            }
            if (h < 0) {
                h += 360;
            }
            if (h >= 360) {
                h -= 360;
            }
        }
        return [
            $.Number.decimalAdjust(h, 0),
            $.Number.decimalAdjust(s, 4),
            $.Number.decimalAdjust(l, 4)
        ];
    };
});
