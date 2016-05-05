define([
    "./object"
], function() {
    /**
     * Iteraciona `object` y ejecuta `fn` por cada iteracion
     *
     * @param {Object} object Objeto a iterar
     * @param {Function} fn Funcion a ejecutar
     * @param {Function} fn.value Valor de la propiedad
     * @param {Function} fn.key Propiedad
     * @param {Function} fn.object El objeto mismo
     * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
     */
    $.Object.each = function(object, fn, scope) {
        var i, property;

        if (object) {
            scope = scope || object;

            for (property in object) {
                if (object.hasOwnProperty(property)) {
                    if (fn.call(scope, property, object[property], object) === false) {
                        return;
                    }
                }
            }
        }
    };
});
