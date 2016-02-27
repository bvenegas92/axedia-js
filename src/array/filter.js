define([
    './array',
    '../var/array/prototype'
], function($Array, arrayPrototype) {
    /*
     * Crea un nuevo arreglo con todos los elementos de los cuales la funcion proporcionada
     * devolvio un valor truthy.
     *
     * @param {Array}     array             Arreglo a evaluar
     * @param {Function}  fn                Funcion a ejecutar que recibe los parametros
     *                                          item:  elemento del array,
     *                                          index: indice del elemento,
     *                                          array: el array propio
     * @param {Object}    [scope=array[i]]  Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {Array}                      Arreglo filtrado
     */
    $Array.filter = ('filter' in arrayPrototype) ? function(array, fn, scope) {
        return array.filter(fn, scope);
    } : function(array, fn, scope) {
        var results = [],
            i = 0,
            ln = array.length;

        for (; i < ln; i++) {
            if (fn.call(scope, array[i], i, array)) {
                results.push(array[i]);
            }
        }

        return results;
    };
});
