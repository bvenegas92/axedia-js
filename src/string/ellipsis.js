define([
    "./string"
], function() {
    /**
     * Trunca un string y agrega un ellipsis "..." al final siexcede la longitud especificada
     *
     * @param {String} value String a truncar
     * @param {Number} length La longitud antes de truncar
     * @param {Boolean} [word] `true` para truncar despues de una palabra
     * @return {String} String truncado
     */
    $.String.ellipsis = function(value, length, word) {
        if (value && value.length > length) {
            if (word) {
                var vs = value.substr(0, length - 2),
                index = Math.max(vs.lastIndexOf(" "), vs.lastIndexOf("."), vs.lastIndexOf("!"), vs.lastIndexOf("?"));
                if (index !== -1 && index >= (length - 15)) {
                    return vs.substr(0, index) + "...";
                }
            }
            return value.substr(0, length - 3) + "...";
        }
        return value;
    };
});
