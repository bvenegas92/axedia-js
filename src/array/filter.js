define([
    "./array"
], function() {
    /**
     * Crea un nuevo array con todos los elementos de los cuales la funcion proporcionada
     * devolvio un valor truthy.
     *
     * @param {Array} array Array a evaluar
     * @param {Function} fn Funcion a ejecutar
     * @param {Object} fn.item Elemeto del array
     * @param {Number} fn.index Indice del elemento
     * @param {Array} fn.array El array mismo
     * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {Array} Array filtrado
     */
    $.Array.filter = ("filter" in Array.prototype) ? function(array, fn, scope) {
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
