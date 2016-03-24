define([
    './object'
], function($Object) {
    /**
     * Limpia todas las keys de `object`
     *
     * @param  {Object}  object  Objeto a limpiar
     * @return {Object}          Objeto limpiado
     */
    $Object.clear = function(object) {
        // Safe to delete during iteration
        for (var key in object) {
            delete object[key];
        }

        return object;
    };
});
