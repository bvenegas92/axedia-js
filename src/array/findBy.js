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
     *                                          index: indice del elemento
     * @param {Object}    [scope=array[i]]  Scope en que la funcion es ejecutada (referencia de `this`)
     * @param {Boolean}   [reverse=false]   Iterar el arreglo en reversa
     * @return {Mixed}                      `item` en caso de encontrarlo, `null` de lo contrario
     */
    $Array.findBy = function(array, fn, scope) {
        var i = 0,
            len = array.length;

        for (; i < len; i++) {
            if (fn.call(scope || array, array[i], i)) {
                return array[i];
            }
        }
        return null;
    };
});
