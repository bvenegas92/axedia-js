define([
    "./string"
], function() {
    /**
     * Permite verificar y alternar un string entre dos valores
     *
     * @param {String} string String a verificar
     * @param {String} value String de referencia
     * @param {String} other String de cambio
     * @return {String} `value` si `string` != `value`, `other` de lo contrario
     */
    $.String.toggle = function(string, value, other) {
        return string === value ? other : value;
    };
});
