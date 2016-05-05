define([
    "./type"
], function() {
    /**
     * Verifica si `value` es boolean
     *
     * @param {Object} value Objeto a evaluar
     * @return {Boolean} `true` si es boolean, `false` de lo contrario
     */
    $.Type.isBoolean = function(value) {
        return typeof value === "boolean";
    };
});
