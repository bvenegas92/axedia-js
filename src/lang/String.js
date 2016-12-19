define([
    "../util/Type",
    "./Number"
], function(Type, Number) {
/**
 * Realiza un trim a `str` incluyendo " ", \t, \n, \r, \v
 *
 * @param {String} str
 * @return {String}
 */
String.trimBlanks = function(str) {
    var blanksRegex = /^\s+|\s+$/g;

    if (str) {
        str = str.replace(blanksRegex, "");
    }
    return str || "";
};

/**
 * Trunca un string y agrega "..." al final si excede la longitud especificada
 *
 * @param {String} str
 * @param {Number} length La longitud maxima del string
 * @param {Boolean} [word] `true` para truncar despues de una palabra
 * @return {String} String truncado
 */
String.ellipsis = function(str, length, word) {
    if (str && str.length > length) {
        if (word) {
            var vs = str.substr(0, length - 2),
                index = Math.max(
                    vs.lastIndexOf(" "),
                    vs.lastIndexOf("."),
                    vs.lastIndexOf("!"),
                    vs.lastIndexOf("?")
                );

            if (index !== -1 && index >= (length - 15)) {
                return vs.substr(0, index) + "...";
            }
        }
        return str.substr(0, length - 3) + "...";
    }
    return str;
};

/**
 * Verifica si un string empieza con determinado substring
 *
 * @param {String} str
 * @param {String} start Substring a verificar
 * @param {Boolean} ignoreCase Ignorar mayusculas
 * @return {Boolean}
 */
String.startsWith = function(str, start, ignoreCase) {
    var result;

    if (!Type.isSet(str) || !Type.isSet(start)) {
        return false;
    }

    result = start.length <= str.length;

    if (result) {
        if (ignoreCase) {
            str = str.toLowerCase();
            start = start.toLowerCase();
        }
        result = str.lastIndexOf(start, 0) === 0;
    }
    return result;
};

/**
 * Verifica si un string termina con determinado substring
 *
 * @param {String} str
 * @param {String} end Substring a verificar
 * @param {Boolean} ignoreCase Ignorar mayusculas
 * @return {Boolean}
 */
String.endsWith = function(str, end, ignoreCase) {
    var result;

    if (!Type.isSet(str) || !Type.isSet(end)) {
        return false;
    }

    result = end.length <= str.length;

    if (result) {
        if (ignoreCase) {
            str = str.toLowerCase();
            end = end.toLowerCase();
        }
        result = str.indexOf(end, str.length - end.length) !== -1;
    }
    return result;
};

/**
 * Escape `string` para usarla en un RegExp
 *
 * @param {String} str
 * @return {String}
 */
String.escapeRegex = function(str) {
    var escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g;

    return str.replace(escapeRegexRe, "\\$1");
};

/**
 * Rellena por la izquierda un string con el caracter especificado
 *
 * @param {String} str
 * @param {Number} size Longitud final
 * @param {String} [character=" "] Caracter de relleno
 * @return {String} String rellenado
 */
String.leftPad = function(str, size, character) {
    var result = String(str);

    character = character || " ";
    while (result.length < size) {
        result = character + result;
    }
    return result;
};

/**
 * Rellena por la derecha un string con el caracter especificado
 *
 * @param {String} str
 * @param {Number} size Longitud final
 * @param {String} [character=" "] Caracter de relleno
 * @return {String} String rellenado
 */
String.rightPad = function(str, size, character) {
    var result = String(str);

    character = character || " ";
    while (result.length < size) {
        result = result + character;
    }
    return result;
};

/**
 * Genera un string de la longitud proporcionada tomando los caracteres de una palabra determinada
 *
 * @param {Number} [length=1] Longitud del string
 * @param {String} [word=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789] Palabra fuente
 * @return {String} String generado
 */
String.random = function(length, word) {
    word = word || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    length = length || 1;
    var str = "";

    for (var i = 0; i < length; i++) {
        str += word.charAt(Number.randomInt(0, word.length - 1));
    }
    return str;
};

/**
 * Separa un string en palabras
 *
 * @param {String} str
 * @return {Array} Array de palabras
 */
String.splitWords = function(str) {
    if (str && Type.isString(str)) {
        return str
            .replace(/^\s+|\s+$/g, "")
            .split(/\s+/);
    }
    return str || [];
};
});
