define([
    './string'
], function($String) {
    /**
     * Inserta un substring en un string
     *
     * @param {String}   s      Substring a insertar
     * @param {String}   value  String donde insertar
     * @param {Number}  index  Indice en cual insertar el substring
     * @return {String}        El string con subtring insertado
     */
    $String.insert = function(s, value, index) {
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
});
