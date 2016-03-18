define([
    './function'
], function($Function) {
    /**
     * Crea un clone de la funcion proporcionada
     *
     * @param  {Function}  method  Funcion a clonar
     * @return {Function}          Funcion clonada
     */
    $Function.clone = function(method) {
        return function() {
            return method.apply(this, arguments);
        };
    };
});
