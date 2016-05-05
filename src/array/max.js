define([
    "./array"
], function() {
    /**
     * Retorna el valor maximo en el array
     *
     * @param {Array} array Array en cual buscar
     * @param {Function} [comparisonFn] Funcion a ejecutar que determina el valor maximo
     * @param {Object} comparisonFn.max Valor maximo actual
     * @param {Object} comparisonFn.item Elemento con el cual comparar contra el maximo actual
     * @return {Object} Valor maximo
     */
    $.Array.max = function(array, comparisonFn) {
        var max = array[0],
            i, ln, item;

        for (i = 0, ln = array.length; i < ln; i++) {
            item = array[i];

            if (comparisonFn) {
                if (comparisonFn(max, item) === -1) {
                    max = item;
                }
            } else {
                if (item > max) {
                    max = item;
                }
            }
        }

        return max;
    };
});
