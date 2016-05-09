define([
    "./function"
], function() {
    /**
     * Crea nuevas funciones ejecutando el codigo de los parametros
     *
     * @return {Function} Nueva Funcion
     */
    $.Function.factory = function() {
        var args = Array.prototype.slice.call(arguments),
            ln;

        return Function.prototype.constructor.apply(Function.prototype, args);
    };
});
