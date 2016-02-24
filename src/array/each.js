define([
    './array'
], function($Array) {
    /*
     * Recorre un arreglo o valor iterable y ejecuta la funcion proporcionada por cada elemento
     * pudiendo romper la iteracion al regresar `false`.
     *
     * @param {Array}     array             Arreglo a recorrer
     * @param {Function}  fn                Funcion a ejecutar que recibe los parametros
     *                                          item:  elemento del array,
     *                                          index: indice del elemento,
     *                                          array: el array propio
     * @param {Object}    [scope=array[i]]  Scope en que la funcion es ejecutada (referencia de `this`)
     * @param {Boolean}   [reverse=false]   Iterar el arreglo en reversa
     * @return {Boolean}                    Booleano `true`
     */
    $Array.each = function(array, fn, scope, reverse) {
        var i,
        ln = array.length;

        if (reverse !== true) {
            for (i = 0; i < ln; i++) {
                if (fn.call(scope || array[i], array[i], i, array) === false) {
                    return i;
                }
            }
        } else {
            for (i = ln - 1; i > -1; i--) {
                if (fn.call(scope || array[i], array[i], i, array) === false) {
                    return i;
                }
            }
        }

        return true;
    };
});
