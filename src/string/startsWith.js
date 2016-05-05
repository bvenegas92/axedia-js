define([
    "./string"
], function() {
    /**
     * Verifica si un string empieza con determinado substring
     *
     * @param {String} s String a verificar
     * @param {String} start Substring a verificar
     * @param {Boolean} ignoreCase Ignorar mayusculas
     * @return {Boolean} `true` si empieza con el substring, `false` de lo contrario
     */
    $.String.startsWith = function(s, start, ignoreCase) {
        var result;
        if (s === null || s === undefined || start === null || start === undefined) {
            return false;
        }

        result = start.length <= s.length;

        if (result) {
            if (ignoreCase) {
                s = s.toLowerCase();
                start = start.toLowerCase();
            }
            result = s.lastIndexOf(start, 0) === 0;
        }
        return result;
    };
});
