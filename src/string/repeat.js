define([
    "./string"
], function() {
    /**
     * Devuelve un string con el numero especificado de repeticiones de un patron
     *
     * @param {String} pattern Patron
     * @param {Number} count Repeticiones
     * @param {String} [sep] Separador
     * @return {String} String de repeticiones
     */
    $.String.repeat = function(pattern, count, sep) {
        if (count < 1) {
            count = 0;
        }
        for (var buf = [], i = count; i--;) {
            buf.push(pattern);
        }
        return buf.join(sep || "");
    };
});
