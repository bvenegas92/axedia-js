define([
    './function',
    '../var/array/slice'
], function($Function, arraySlice) {
    /**
     * Crea nuevas funciones ejecutando el codigo de los parametros
     *
     * @return {Function}  Nueva Funcion
     */
    $Function.factory = function() {
        var args = arraySlice.call(arguments),
            ln;

        return Function.prototype.constructor.apply(Function.prototype, args);
    };
});
