define([
    "lang/String",
    "lang/Number",
    "./Convert"
], function(Number, Convert) {
/**
 * Clase `Color`
 *
 * Manipulacion del color
 *
 * @class
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 */
function Color(r, g, b) {
    var me = this;

    me._r = Number.constrain(r || 0, 0, 255);
    me._g = Number.constrain(g || 0, 0, 255);
    me._b = Number.constrain(b || 0, 0, 255);
}

/**
 * Convierte los valores RGB a valores HSL
 *
 * @static
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @return {Number[]} Array con los valores HSL
 */
Color.RGBToHSL = function(r, g, b) {
    r = Number.constrain(r, 0, 255) / 255;
    g = Number.constrain(g, 0, 255) / 255;
    b = Number.constrain(b, 0, 255) / 255;

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
        Number.round(h, 0),
        Number.round(s, 4),
        Number.round(l, 4)
    ];
};

/**
 * Convierte los valores RGB a valor Hex
 *
 * @static
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @return {String}
 */
Color.RGBToHex = function(r, g, b) {
    r = Number.constrain(r, 0, 255);
    g = Number.constrain(g, 0, 255);
    b = Number.constrain(b, 0, 255);

    var hex = '#';

    hex += String.leftPad(Convert.decToHex(r), 2, "0");
    hex += String.leftPad(Convert.decToHex(g), 2, "0");
    hex += String.leftPad(Convert.decToHex(b), 2, "0");

    return hex;
};

/**
 * Convierte los valores HSL a valores RGB
 *
 * @param {Number} h
 * @param {Number} s
 * @param {Number} l
 * @return {Number[]} Array con los valores RGB
 */
Color.HSLToRGB = function(h, s, l) {
    h = (h >= 0 ? h : 360 - (-h % 360)) % 360;
    s = Number.constrain(Number.round(s, 4), 0, 1);
    l = Number.constrain(Number.round(l, 4), 0, 1);

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

/**
 * Convierte los valores HSL a valores Hex
 *
 * @static
 * @param {Number} h
 * @param {Number} s
 * @param {Number} l
 * @return {String} String con los valores Hex
 */
Color.HSLToHex = function(h, s, l) {
    h = (h >= 0 ? h : 360 - (-h % 360)) % 360;
    s = Number.constrain(Number.round(s, 4), 0, 1);
    l = Number.constrain(Number.round(l, 4), 0, 1);

    var rgb = Color.HSLToRGB(h, s, l);

    return Color.RGBToHex.apply(this, rgb);
};

/**
 * Convierte el valor Hex a valores RGB
 *
 * @static
 * @param {String} hex
 * @return {Number[]} Array con los valores RGB
 */
Color.HexToRGB = function(hex) {
    var hexColorRegex = /^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/i,
        r, g, b;

    if (!hexColorRegex.test(hex)) {
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

    return [Convert.hexToDec(r), Convert.hexToDec(g), Convert.hexToDec(b)];
};

/**
 * Convierte el valor Hex a valores RGB
 *
 * @static
 * @param {String} hex
 * @return {Number[]} Array con los valores RGB
 */
Color.HexToHSL = function(hex) {
    var rgb = Color.HexToRGB(hex);

    return Color.RGBToHSL.apply(this, rgb);
};

/**
 * Crea una instancia de `Color` basado en los valores RGB
 *
 * @static
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @return {Color} Nueva instancia de `$.Color`
 */
Color.fromRGB = function(r, g, b) {
    return new Color(r, g, b);
};

/**
 * Crea una instancia de `Color` basado en los valores HSL
 *
 * @static
 * @param {Number} h
 * @param {Number} s
 * @param {Number} l
 * @return {Color}
 */
Color.fromHSL = function(h, s, l) {
    var rgb = Color.HSLToRGB(h, s, l);

    return new Color(rgb[0], rgb[1], rgb[2]);
};

/**
 * Crea una instancia de `Color` basado en el valor Hex
 *
 * @static
 * @param {String} hex
 * @return {Color}
 */
Color.fromHex = function(hex) {
    var rgb = Color.HexToRGB(hex);

    return new Color(rgb[0], rgb[1], rgb[2]);
};

/**
 * Crea una nueva instancia de `Color` identica a la actual
 *
 * @return {Color}
 */
Color.prototype.clone = function() {
    return new Color(this._r, this._g, this._b);
};

/**
 * Obtiene un array con los valores RGB
 *
 * @return {Number[]}
 */
Color.prototype.getRGB = function() {
    return [this._r, this._g, this._b];
};

/**
 * Asigna los valores RGB
 *
 * @param {Number} r Valor de rojo
 * @param {Number} g Valor de verde
 * @param {Number} b Valor de azul
 * @return {Color} Retorna la instancia `Color`
 */
Color.prototype.setRGB = function(r, g, b) {
    this._r = r;
    this._g = g;
    this._b = b;

    return this;
};

/**
 * Obtiene un `array` con los valores HSL
 *
 * @return {Number[]} Un array con los valores HSL
 */
Color.prototype.getHSL = function() {
    return Color.RGBToHSL(this._r, this._g, this._b);
};

/**
 * Asigna los valores HSL
 *
 * @param {Number} h
 * @param {Number} s
 * @param {Number} l
 * @return {Color}
 */
Color.prototype.setHSL = function(h, s, l) {
    var rgb = Color.HSLToRGB(h, s, l);

    this._r = rgb[0];
    this._g = rgb[1];
    this._b = rgb[2];
    return this;
};

/**
 * Obtiene un `string` con el valor Hex
 *
 * @return {String}
 */
Color.prototype.getHex = function() {
    return Color.RGBToHex(this._r, this._g, this._b);
};

/**
 * Asigna el valor Hex
 *
 * @param {String} hex
 * @return {Color}
 */
Color.prototype.setHex = function(hex) {
    var rgb = Color.HexToRGB(hex);

    this._r = rgb[0];
    this._g = rgb[1];
    this._b = rgb[2];
    return this;
};

/**
 * Retorna una nueva instancia de `Color` mas clara de acuerdo a `factor` y el espacio de color HSL
 *
 * @param {Number} [factor=0.1]
 * @return {Color}
 */
Color.prototype.getLighter = function(factor) {
    var hsl = this.getHSL();
    factor = factor || 0.1;

    hsl[2] = Number.constrain(hsl[2] + factor, 0, 1);
    return Color.fromHSL(hsl[0], hsl[1], hsl[2]);
};

/**
 * Retorna una nueva instancia de `Color` mas oscura de acuerdo a `factor` y el espacio de color HSL
 *
 * @param  {Number} [factor=0.1]
 * @return {Color}
 */
Color.prototype.getDarker = function(factor) {
    factor = factor || 0.1;
    return this.getLighter(-factor);
};

/**
 * Retorna una nueva instancia de `Color` saturada de acuerdo a `factor` y el espacio de color HSL
 *
 * @param  {Number} [factor=0.1]
 * @return {Color}
 */
Color.prototype.getSaturated = function(factor) {
    var hsl = this.getHSL();
    factor = factor || 0.1;

    hsl[1] = Number.constrain(hsl[1] + factor, 0, 1);
    return Color.fromHSL(hsl[0], hsl[1], hsl[2]);
};

/**
 * Retorna una nueva instancia de `Color` desaturada de acuerdo a `factor` y el espacio de color HSL
 *
 * @param  {Number} [factor=0.1]
 * @return {Color}
 */
Color.prototype.getDesaturated = function(factor) {
    factor = factor || 0.1;
    return this.getSaturated(-factor);
};

/**
 * Obtiene el color complemento
 *
 * @return {Color} Complemento
 */
Color.prototype.getComplementary = function() {
    var hsl = this.getHSL();

    hsl[0] = (hsl[0] + 180) % 360;
    return Color.fromHSL(hsl[0], hsl[1], hsl[2]);
};

/**
 * Obtiene el esquema de colores analogos
 *
 * @param  {Number} [slices=3] Numero de colores (incluye el propio color)
 * @param  {Number} [space=30] Tamaño en grados de las partes donde se toamran los colores
 * @return {Color[]} Array con el esquema de colores analogos
 */
Color.prototype.getAnalogous = function(slices, space) {
    space = Number.constrain((space || 30), 1, 360);
    slices = Number.constrain((slices || 3), 1, (360 / space));

    var analog = [],
        hsl = this.getHSL(),
        h = hsl[0],
        s = hsl[1],
        l = hsl[2];

    for (h = h - (space * Math.round(slices / 2)); slices--;) {
        h = (h + space) % 360;
        analog.push(Color.fromHSL(h, s, l));
    }

    return analog;
};

/**
 * Obtiene el esquema de colores split complementario
 *
 * @return {Color[]} Array con el esquema de colores split complementario
 */
Color.prototype.getSplitComplementary = function() {
    var splitAnalog = this.getComplementary().getAnalogous();

    return [splitAnalog[2], this.clone(), splitAnalog[0]];
};

/**
 * Obtiene el esquema monocromatico del color usando para ello el cambio de luminosidad
 * dado por `factor` para obtener la cantidad de colores proporcionada en `pieces`
 *
 * @param  {Number} [pieces=10] Numero de colores
 * @param  {Number} [factor=10] Factor de luminosidad
 * @return {Color[]} Array con el esquema monocromatico
 */
Color.prototype.getMonochromatic = function(pieces, factor) {
    factor = Number.constrain((factor || 0.1), 0.05, 0.2);
    pieces = Number.constrain((pieces || 10), 5, (100 / factor));

    var mono = [],
        hsl = this.getHSL(),
        h = hsl[0],
        s = hsl[1],
        l = hsl[2];

    for (l = l - (factor * Math.round(pieces / 2)); pieces--;) {
        l = l + factor;
        mono.push(Color.fromHSL(h, s, l));
    }

    return mono;
};

/**
 * Obtiene la harmonia de colores dada por `slices`
 *
 * @private
 * @param  {Number} slices Numero de aristas de la harmonia
 * @return {Color[]} Array con la harmonia de colores
 */
Color.prototype.getAdic = function(slices) {
    slices = Number.constrain(slices, 3, 10);

    var space = 360 / slices,
        h = this.getHSL()[0],
        adic = [],
        hsl = this.getHSL(),
        i;

    for (i = 0; i < slices; i++) {
        adic.push(Color.fromHSL(Math.round(i * space), hsl[1], hsl[2]));
    }

    return adic;
};

/**
 * Retorna el color en su forma hex (e.g. #aabbcc)
 *
 * @return {String}
 */
Color.prototype.toString = function() {
    return this.getHex();
};

return Color;

});
