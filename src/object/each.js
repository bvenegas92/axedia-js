define([
    './object'
], function($Object) {
    /**
     * Iteraciona en `object` y ejecuta `fn` por cada iteracion
     *
     * @param  {Object}  object  Objeto a iterar
     * @param  {Function}  fn     Funcion a ejecutar que recibe los parametros
*                                    item:  elemento del array,
*                                    index: indice del elemento,
*                                    object: el array propio
     * @param  {Object}  scope   Scope en que la funcion es ejecutada (referencia de `this`)
     */
    $Object.each = function(object, fn, scope) {
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
