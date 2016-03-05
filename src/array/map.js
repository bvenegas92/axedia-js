define([
    './array',
    '../var/array/prototype'
], function($Array, arrayPrototype) {
    /**
     * Crea un nuevo array con los resultados despues de haber invocado la funcion dada
     * en cada elemento del array.
     *
     * @param {Array}     array             Array a recorrer
     * @param {Function}  fn                Funcion a ejecutar que recibe los parametros
     *                                          item:  elemento del array,
     *                                          index: indice del elemento,
     *                                          array: el array propio
     * @param {Object}    [scope=array[i]]  Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {Array}                      Array con los resultados
     */
    $Array.map = ('map' in arrayPrototype) ? function(array, fn, scope) {
        return array.map(fn, scope);
    } : function(array, fn, scope) {
        var results = [],
            i = 0,
            len = array.length;

        for (; i < len; i++) {
            results[i] = fn.call(scope, array[i], i, array);
        }

        return results;
    };
});
