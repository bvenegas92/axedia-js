define([
    "./string"
], function() {
    /**
     * Verifica si un string termina con determinado substring
     *
     * @param {String} s String a verificar
     * @param {String} end Substring a verificar
     * @param {Boolean} ignoreCase Ignorar mayusculas
     * @return {Boolean} `true` si termina con el substring, `false` de lo contrario
     */
    $.String.endsWith = function(s, end, ignoreCase) {
        var result;
        if (s === null || s === undefined || end === null || end === undefined) {
            return false;
        }

        result = end.length <= s.length;

        if (result) {
            if (ignoreCase) {
                s = s.toLowerCase();
                end = end.toLowerCase();
            }
            result = s.indexOf(end, s.length - end.length) !== -1;
        }
        return result;
    };
});
