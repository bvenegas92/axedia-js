define([
    "./type"
], function() {
    /**
     * Verifica si `value` esta definido
     *
     * @param {Object} value Valor a evaluar
     * @return {Boolean} `true` si esta definido, `false` de lo contrario
     */
    $.Type.isDefined = function(value) {
        return typeof value !== "undefined";
    };
});
