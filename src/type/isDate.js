define([
    "./type"
], function() {
    /**
     * Verifica si `value` es una instancia de `Date`
     *
     * @param {Object} value Objeto a evaluar
     * @return {Boolean} `true` si es una instancia de `Date`, `false` de lo contrario
     */
    $.Type.isDate = function(value) {
        return Object.prototype.toString.call(value) === "[object Date]";
    };
});
