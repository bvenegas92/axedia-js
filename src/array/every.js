define([
    './array',
    '../var/array/prototype'
], function($Array, arrayPrototype) {
    /*
     * Ejecuta la función dada una vez por cada elemente presente en el arreglo hasta encontrar uno
     * que haga retornar un valor falsy (un valor que resulte falso cuando se convierta a booleano).
     * Si se encuentra tal elemento, el método de inmediato retorna `false`. O si fn retorna verdadero
     * para todos los elementos, `every` retornará `true`.
     *
     * @param {Array}     array             Arreglo a evaluar
     * @param {Function}  fn                Funcion a ejecutar que recibe los parametros
     *                                          item:  elemento del array,
     *                                          index: indice del elemento,
     *                                          array: el array propio
     * @param {Object}    [scope=array[i]]  Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {Boolean}                    `true` si el arreglo pasa la prueba, `false` de lo contrario.
     */
    $Array.every = ('every' in arrayPrototype) ? function(array, fn, scope) {
        return array.every(fn, scope);
    } : function(array, fn, scope) {
        var i = 0,
            ln = array.length;

        for (; i < ln; ++i) {
            if (!fn.call(scope, array[i], i, array)) {
                return false;
            }
        }

        return true;
    };
});
