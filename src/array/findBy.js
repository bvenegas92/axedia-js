define([
    "./array"
], function() {
    /**
     * Recorre un array o valor iterable y ejecuta la funcion proporcionada por cada elemento
     * regresando el primer elemento cuya ejecucion de `fn` retorne `true`.
     *
     * @param {Array} array Array a recorrer
     * @param {Function} fn Funcion a ejecutar
     * @param {Object} fn.item Elemento del array
     * @param {Number} fn.index Indice del elemento
     * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {?Object} `item` en caso de encontrarlo, `null` de lo contrario
     */
    $.Array.findBy = function(array, fn, scope) {
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
