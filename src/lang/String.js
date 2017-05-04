define([
    "./Math",
    "util/Type",
    "./Number"
], function(
    Math,
    Type,
    Number
) {
/**
 * Trunca un string y agrega un ellipsis "..." al final si excede la longitud especificada
 *
 * @param {String} value String a truncar
 * @param {Number} length La longitud antes de truncar
 * @param {Boolean} [word] `true` para truncar despues de una palabra
 * @return {String} String truncado
 */
String.ellipsis = function(value, length, word) {
    if (value && value.length > length) {
        if (word) {
            var vs = value.substr(0, length - 2),
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
        return value.substr(0, length - 3) + "...";
    }
    return value;
};

/**
 * Escape `string`
 *
 * @param {String} string String a escape
 * @return {String} String escaped
 */
String.escape = function(string) {
    var escapeRe = /('|\\)/g;

    return string.replace(escapeRe, "\\$1");
};

/**
 * Escape `string` para usarla en un RegExp
 *
 * @param {String} string String a escape
 * @return {String} String escaped
 */
String.escapeRegex = function(string) {
    var escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g;

    return string.replace(escapeRegexRe, "\\$1");
};

/**
 * Inserta un substring en un string
 *
 * @param {String} s Substring a insertar
 * @param {String} value String donde insertar
 * @param {Number} index Indice en cual insertar el substring
 * @return {String} El string con subtring insertado
 */
String.insert = function(s, value, index) {
    if (!s) {
        return value;
    }

    if (!value) {
        return s;
    }

    var len = s.length;

    if (!index && index !== 0) {
        index = len;
    }

    if (index < 0) {
        index *= -1;
        if (index >= len) {
            // negative overflow, insert at start
            index = 0;
        } else {
            index = len - index;
        }
    }

    if (index === 0) {
        s = value + s;
    } else if (index >= s.length) {
        s += value;
    } else {
        s = s.substr(0, index) + value + s.substr(index);
    }
    return s;
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
 * Rellena por la izquierda un string con el caracter especificado
 *
 * @param {String} string Substring a rellenar
 * @param {Number} size Longitud final
 * @param {String} [character=" "] Caracter de relleno
 * @return {String} String rellenado
 */
String.leftPad = function(string, size, character) {
    var result = String(string);

    character = character || " ";
    while (result.length < size) {
        result = character + result;
    }
    return result;
};

/**
 * Rellena por la derecha un string con el caracter especificado
 *
 * @param {String} string Substring a rellenar
 * @param {Number} size Longitud final
 * @param {String} [character=" "] Caracter de relleno
 * @return {String} String rellenado
 */
String.rightPad = function(string, size, character) {
    var result = String(string);

    character = character || " ";
    while (result.length < size) {
        result = result + character;
    }
    return result;
};

/**
 * Genera un string de la longitud proporcionada (min. 1, maximo 1000 caracteres)
 * tomando los caracteres de una palabra determinada
 *
 * @param {Number} length Longitud del string
 * @param {String} [word=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789] Palabra fuente
 * @return {String} String generado
 */
String.random = function(length, word) {
    word = word || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var str = "";

    for (var i = 0; i < length; i++) {
        str += word.charAt(Number.randomInt(0, word.length - 1));
    }
    return str;
};

/**
 * Separa un string en palabras
 *
 * @param {String} words String a separar
 * @return {Array} Array de palabras
 */
String.splitWords = function(words) {
    if (words && Type.isString(words)) {
        return words
            .replace(/^\s+|\s+$/g, "")
            .split(/\s+/);
    }
    return words || [];
};

/**
 * Convierte un string `snake_case` a `lowerCamelCase` o `UpperCamelCase`
 *
 * @param  {String} snakeString String snake_case
 * @param  {Boolean} [toUpperCase] `true` para convertir a `UpperCameCase`
 * @return {String} camelCase String
 */
String.snakeToCamelCase = function(snakeString, toUpperCase) {
    toUpperCase = toUpperCase || false;

    var words = snakeString.split("_"),
        camelString = "",
        i;

    for (i = 0; i < words.length; i++) {
        if (i === 0) {
            if (toUpperCase) {
                camelString += words[i].charAt(0).toUpperCase();
                camelString += words[i].substr(1);
            } else {
                camelString += words[i];
            }
        } else {
            camelString += words[i].charAt(0).toUpperCase();
            camelString += words[i].substr(1);
        }
    }

    return camelString;
};

/**
 * Parte un string en piezas de tamaño `length` caracteres
 *
 * @param  {String} string String a partir
 * @param  {Number} length Tamaño de las piezas
 * @param  {Boolean} [reverse] Inicia las piezas desde el final
 * @return {Array} Piezas
 */
String.chunk = function(string, length, reverse) {
    length = length || 1;
    reverse = reverse || false;

    var pieces = [],
        substr = "",
        i;

    while (string !== "") {
        if (reverse) {
            substr = string.substr(-length);
            string = string.substring(0, string.length - length);
            pieces.unshift(substr);
        } else {
            substr = string.substr(0, length);
            string = string.substr(length);
            pieces.push(substr);
        }
    }

    return pieces;
};

/**
 * Permite definir un tokenized string y pasar un numero arbitrario de argumentos
 * para remplazar los tokens. Cada token debe ser unico e incrementado con el
 * formato: {0}, {1}, etc.
 *
 * @param {String} format
 * @param {...Object} values
 * @return {String}
 */
String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
};

/**
 * Separa un string en parrafos
 *
 * @param  {String} string
 * @param  {Number} length Longitud del parrafo
 * @param  {Boolean} [word=true] Partir parrafos en palabras enteras
 * @return {String[]}
 */
String.splitParagraphs = function(string, length, word) {
    word = word || true;

    var paragraphs = [],
        p = "",
        words;

    if (!word) {
        return String.chunk(string.trim(), length);
    }

    words = String.splitWords(string);

    while (words.length > 0) {
        if ((p.length + words[0].length + 1) > length) {
            paragraphs.push(p);
            p = "";
        }

        if (p === "") {
            p = words[0];
        } else if (p !== "") {
            p = p + " " + words[0];
        }

        words = words.slice(1);

        if (words.length === 0) {
            paragraphs.push(p);
        }
    }

    return paragraphs;
};

return String;

});
