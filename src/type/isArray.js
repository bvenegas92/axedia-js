define([
    "./type"
], function() {
    /**
     * Verifica si `value` es un array de JavaScript
     *
     * @param {Object} value Objeto a evaluar
     * @return {Boolean} `true` si es array, `false` de lo contrario.
     */
    $.Type.isArray = ("isArray" in Array) ? Array.isArray : function(value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    };
});
