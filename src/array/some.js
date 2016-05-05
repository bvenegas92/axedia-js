define([
    "./array"
], function() {
    /**
     * Ejecuta la función dada una vez por cada elemente presente en el array hasta encontrar uno
     * que haga retornar un valor truthy (un valor que resulte `true` cuando se convierte a booleano).
     * Si se encuentra tal elemento, el método de inmediato retorna `true`. O si `fn` retorna `false`
     * para todos los elementos, `some` retornará `false`.
     *
     * @param {Array} array Array a evaluar
     * @param {Function} fn Funcion a ejecutar
     * @param {Object} fn.item Elemento del array
     * @param {Number} fn.index Indice del elemento
     * @param {Array} fn.array El array mismo
     * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {Boolean} `true` si el array pasa la prueba, `false` de lo contrario.
     */
    $.Array.some = ("some" in Array.prototype) ? function(array, fn, scope) {
        return array.some(fn, scope);
    } : function(array, fn, scope) {
        var i = 0,
            ln = array.length;

        for (; i < ln; ++i) {
            if (fn.call(scope, array[i], i, array)) {
                return true;
            }
        }

        return false;
    };
});
