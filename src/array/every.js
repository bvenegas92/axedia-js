define([
    "./array"
], function() {
    /**
     * Ejecuta la función dada una vez por cada elemente presente en el array hasta encontrar uno
     * que haga retornar un valor falsy (un valor que resulte falso cuando se convierte a booleano).
     * Si se encuentra tal elemento, el método de inmediato retorna `false`. O si `fn` retorna verdadero
     * para todos los elementos, `every` retornará `true`.
     *
     * @param {Array} array Array a evaluar
     * @param {Function} fn Funcion a ejecutar
     * @param {Object} fn.item Elemento del array
     * @param {Number} fn.index Indice del elemento
     * @param {Array} fn.array El array mismo
     * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {Boolean} `true` si el array pasa la prueba, `false` de lo contrario.
     */
    $.Array.every = ("every" in Array.prototype) ? function(array, fn, scope) {
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
