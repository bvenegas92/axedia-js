define([
    "./array"
], function() {
    /**
     * Retorna el valor minimo en el array
     *
     * @param {Array} array Array en cual buscar
     * @param {Function} [comparisonFn] Funcion a ejecutar que determina el valor minimo
     * @param {Object} comparisonFn.min Valor minimo actual
     * @param {Object} comparisonFn.item Elemento con el cual comparar contra el minimo actual
     * @return {Object} Valor minimo
     */
    $.Array.min = function(array, comparisonFn) {
        var min = array[0],
            i, ln, item;

        for (i = 0, ln = array.length; i < ln; i++) {
            item = array[i];

            if (comparisonFn) {
                if (comparisonFn(min, item) === 1) {
                    min = item;
                }
            } else {
                if (item < min) {
                    min = item;
                }
            }
        }

        return min;
    };
});
