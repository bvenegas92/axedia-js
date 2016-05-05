define([
    "./function"
], function() {
    /**
     * Crea un clone de la funcion proporcionada
     *
     * @param {Function} fn Funcion a clonar
     * @return {Function} Funcion clonada
     */
    $.Function.clone = function(fn) {
        return function() {
            return fn.apply(this, arguments);
        };
    };
});
