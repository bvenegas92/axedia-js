define([
    "../core",
    "../class/define",
    "../number/constrain",
    "../convert/rgbToHsl",
    "../convert/rgbToHex",
    "../convert/hslToRgb",
    "../convert/hslToHex",
    "../convert/hexToHsl",
    "../convert/hexToRgb",
    "../number/decimalAdjust"
], function() {
    /**
     * Clase "Color"
     *
     * @class
     */
    $.Class.define("Color", {
        /**
         * Crea una nueva instancia de `Color`
         *
         * @param  {Number} red Cantidad de Rojo
         * @param  {Number} green Cantidad de verde
         * @param  {Number} blue Cantidad de azul
         * @param  {Number} alpha Transparencia
         */
        constructor: function(red, green, blue, alpha) {
            var me = this;

            me._r = $.Number.constrain(red || 0, 0, 255);
            me._g = $.Number.constrain(green || 0, 0, 255);
            me._b = $.Number.constrain(blue || 0, 0, 255);
        },

        /**
         * Rojo
         *
         * @private
         * @type {Number}
         */
        _r: 0,

        /**
         * Verde
         *
         * @private
         * @type {Number}
         */
        _g: 0,

        /**
         * Azul
         *
         * @private
         * @type {Number}
         */
        _b: 0,

        statics: {
            /**
             * Convierte los valores RGB a valores HSL
             *
             * @static
             * @param {Number} r Rojo
             * @param {Number} g Verde
             * @param {Number} b Azul
             * @return {Number[]} Array con los valores HSL
             */
            RGBToHSL: $.Convert.RGBToHSL,

            /**
             * Convierte los valores RGB a valores Hex
             *
             * @static
             * @param {Number} r Rojo
             * @param {Number} g Verde
             * @param {Number} b Azul
             * @return {String} String con los valores Hex
             */
            RGBToHex: $.Convert.RGBToHex,

            /**
             * Convierte los valores HSL a valores RGB
             *
             * @static
             * @param {Number} h Matiz
             * @param {Number} s Saturación
             * @param {Number} l Luminosidad
             * @return {Number[]} Array con los valores RGB
             */
            HSLToRGB: $.Convert.HSLToRGB,

            /**
             * Convierte los valores HSL a valores Hex
             *
             * @static
             * @param {Number} h Matiz
             * @param {Number} s Saturación
             * @param {Number} l Luminosidad
             * @return {String} String con los valores Hex
             */
            HSLToHex: $.Convert.HSLToHex,

            /**
             * Convierte el valor Hex a valores RGB
             *
             * @static
             * @param {String} hex Valor Hex
             * @return {Number[]} Array con los valores RGB
             */
            HexToRGB: $.Convert.HexToRGB,

            /**
             * Convierte el valor Hex a valores HSL
             *
             * @static
             * @param {String} hex Valor Hex
             * @return {Number[]} Array con los valores HSL
             */
            HexToHSL: $.Convert.HexToHSL,

            /**
             * Crea una instancia de `Color` basado en los valores RGB
             *
             * @static
             * @param {Number} r Rojo
             * @param {Number} g Verde
             * @param {Number} b Azul
             * @return {$.Color} Nueva instancia de `$.Color`
             */
            fromRGB: function(r, g, b) {
                return new $.Color(r, g, b);
            },

            /**
             * Crea una instancia de `$.Color` basado en los valores HSL
             *
             * @static
             * @param {Number} h Matiz
             * @param {Number} s Saturación
             * @param {Number} l Luminosidad
             * @return {$.Color} Nueva instancia de `$.Color`
             */
            fromHSL: function(h, s, l) {
                var rgb = $.Color.HSLToRGB(h, s, l);

                return new $.Color(rgb[0], rgb[1], rgb[2]);
            },

            /**
             * Crea una instancia de `$.Color` basado en el valor Hex
             *
             * @static
             * @param {String} hex Hex
             * @return {$.Color} Nueva instancia de `$.Color`
             */
            fromHex: function(hex) {
                var rgb = $.Color.HexToRGB(hex);

                return new $.Color(rgb[0], rgb[1], rgb[2]);
            }
        },

        /**
         * Obtiene un `array` con los valores RGB
         *
         * @return {Number[]} Un array con los valores RGB
         */
        getRGB: function() {
            return [this._r, this._g, this._b];
        },

        /**
         * Asigna los valores RGB
         *
         * @param {Number} r Valor de rojo
         * @param {Number} g Valor de verde
         * @param {Number} b Valor de azul
         * @return {$.Color} Retorna la instancia `$.Color`
         */
        setRGB: function(r, g, b) {
            this._r = r;
            this._g = g;
            this._b = b;

            return this;
        },

        /**
         * Obtiene un `array` con los valores HSL
         *
         * @return {Number[]} Un array con los valores HSL
         */
        getHSL: function() {
            return $.Color.RGBToHSL(this._r, this._g, this._b);
        },

        /**
         * Asigna los valores HSL
         *
         * @param {Number} h Matiz
         * @param {Number} s Saturación
         * @param {Number} l Luminocidad
         * @return {$.Color} Retorna la instancia `$.Color`
         */
        setHSL: function(h, s, l) {
            var rgb = $.Color.HSLToRGB(h, s, l);

            this._r = rgb[0];
            this._g = rgb[1];
            this._b = rgb[2];
            return this;
        },

        /**
         * Obtiene un `string` con el valor Hex
         *
         * @return {String} Un string con el valor Hex
         */
        getHex: function() {
            return $.Color.RGBToHex(this._r, this._g, this._b);
        },

        /**
         * Asigna el valor Hex
         *
         * @param {String} hex Hex
         * @return {$.Color} Retorna la instancia `$.Color`
         */
        setHex: function(hex) {
            var rgb = $.Color.HexToRGB(hex);

            this._r = rgb[0];
            this._g = rgb[1];
            this._b = rgb[2];
            return this;
        },

        /**
         * Retorna una nueva instancia de `$.Color` mas clara de acuerdo a `factor` y el espacio de color HSL
         *
         * @param {Number} [factor=0.1] Factor
         * @return {$.Color} Nueva instancia de `$.Color`
         */
        getLighter: function(factor) {
            var hsl = this.getHSL();
            factor = factor || 0.1;

            hsl[2] = $.Number.constrain(hsl[2] + factor, 0, 1);
            return $.Color.fromHSL(hsl[0], hsl[1], hsl[2]);
        },

        /**
         * Retorna una nueva instancia de `$.Color` mas oscura de acuerdo a `factor` y el espacio de color HSL
         *
         * @param  {Number} [factor=0.1] Factor
         * @return {$.Color} Nueva instancia de `$.Color`
         */
        getDarker: function(factor) {
            factor = factor || 0.1;
            return this.getLighter(-factor);
        },

        /**
         * Retorna una nueva instancia de `$.Color` saturada de acuerdo a `factor` y el espacio de color HSL
         *
         * @param  {Number} [factor=0.1] Factor
         * @return {$.Color} Nueva instancia de `$.Color`
         */
        getSaturated: function(factor) {
            var hsl = this.getHSL();
            factor = factor || 0.1;

            hsl[1] = $.Number.constrain(hsl[1] + factor, 0, 1);
            return $.Color.fromHSL(hsl[0], hsl[1], hsl[2]);
        },

        /**
         * Retorna una nueva instancia de `$.Color` desaturada de acuerdo a `factor` y el espacio de color HSL
         *
         * @param  {Number} [factor=0.1] Factor
         * @return {$.Color} Nueva instancia de `$.Color`
         */
        getDesaturated: function(factor) {
            factor = factor || 0.1;
            return this.getSaturated(-factor);
        },

        /**
         * Obtiene el color complemento
         *
         * @return {$.Color} Complemento
         */
        getComplementary: function() {
            var hsl = this.getHSL();

            hsl[0] = (hsl[0] + 180) % 360;
            return $.Color.fromHSL(hsl[0], hsl[1], hsl[2]);
        },

        /**
         * Obtiene el esquema de colores analogos
         *
         * @param  {Number} [slices=3] Numero de colores (incluye el propio color)
         * @param  {Number} [space=30] Tamaño en grados de las partes donde se toamran los colores
         * @return {$.Color[]} Array con el esquema de colores analogos
         */
        getAnalogous: function(slices, space) {
            space = $.Number.constrain((space || 30), 1, 360);
            slices = $.Number.constrain((slices || 3), 1, (360 / space));

            var analog = [],
                hsl = this.getHSL(),
                h = hsl[0],
                s = hsl[1],
                l = hsl[2];

            for (h = h - (space * Math.round(slices / 2)); slices--;) {
                h = (h + space) % 360;
                analog.push($.Color.fromHSL(h, s, l));
            }

            return analog;
        },

        /**
         * Obtiene el esquema de colores split complementaria
         *
         * @return {$.Color[]} Array con el esquema de colores split complementario
         */
        getSplitComplementary: function() {
            var splitAnalog = this.getComplementary().getAnalogous();

            return [splitAnalog[2], this.clone(), splitAnalog[0]];
        },

        /**
         * Obtiene la harmonia de colores dada por `slices`
         *
         * @param  {Number} slices Numero de aristas de la harmonia
         * @return {$.Color[]} Array con la harmonia de colores
         */
        getAdic: function(slices) {
            slices = $.Number.constrain(slices, 3, 10);

            var space = 360 / slices,
                h = this.getHSL()[0],
                adic = [],
                hsl = this.getHSL(),
                i;

            for (i = 0; i < slices; i++) {
                adic.push($.Color.fromHSL(Math.round(i * space), hsl[1], hsl[2]));
            }

            return adic;
        },

        /**
         * Obtiene el esquema monocromatico del color usando para ello el cambio de luminosidad
         * dado por `factor` para obtener la cantidad de colores proporcionada en `pieces`
         *
         * @param  {Number} [pieces=10] Numero de colores
         * @param  {Number} [factor=10] Factor de luminosidad
         * @return {$.Color[]} Array con el esquema monocromatico
         */
        getMonochromatic: function(pieces, factor) {
            factor = $.Number.constrain((factor || 0.1), 0.05, 0.2);
            pieces = $.Number.constrain((pieces || 10), 5, (100 / factor));

            var mono = [],
                hsl = this.getHSL(),
                h = hsl[0],
                s = hsl[1],
                l = hsl[2];

            for (l = l - (factor * Math.round(pieces / 2)); pieces--;) {
                l = l + factor;
                mono.push($.Color.fromHSL(h, s, l));
            }

            return mono;
        },

        /**
         * Crea una nueva instancia de `$.Color` identica a la actual
         *
         * @return {$.Color} Clon
         */
        clone: function() {
            return new $.Color(this._r, this._g, this._b);
        },

        /**
         * Retorna el color en su forma hex (i.e #RRGGBB)
         *
         * @return {String} Forma hex de `Color`;
         */
        toString: function() {
            return this.getHex();
        }
    });
});
