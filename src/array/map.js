define([
    "./array"
], function() {
    /**
     * Crea un nuevo array con los resultados retornados despues de haber invocado `fn`
     * en cada elemento del array.
     *
     * @param {Array} array Array a recorrer
     * @param {Function} fn Funcion a ejecutar
     * @param {Object} fn.item Elemento del array
     * @param {Number} fn.index Indice del elemento
     * @param {Array} fn.array El array mismo
     * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {Array} Array con los resultados
     */
    $.Array.map = ("map" in Array.prototype) ? function(array, fn, scope) {
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
