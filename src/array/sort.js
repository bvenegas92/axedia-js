define([
    './array'
], function($Array) {
    /*
     * Ordena los elementos de un array
     *
     * @param {Array}     array   Array a ordenar
     * @param {Function}  sortFn  Funcion a ejecutar que recibe los parametros
     *                                a: primer elemento a comparar
     *                                b: segundo elemento a comparar
     * @return {Array}            `true` en caso de no detener el ciclo, `index` de lo contrario
     */
    $Array.sort = function(array, sortFn) {
        return stableSort(array, sortFn || lexicalCompare);

        function lexicalCompare(lhs, rhs) {
            lhs = String(lhs);
            rhs = String(rhs);

            return (lhs < rhs) ? -1 : ((lhs > rhs) ? 1 : 0);
        }

        function stableSort(array, userComparator) {
            var len = array.length,
                indices = new Array(len),
                i;

            // generate 0-n index map from original array
            for (i = 0; i < len; i++) {
                indices[i] = i;
            }

            // Sort indices array using a comparator which compares the original values at the two indices,
            // and uses those indices as a tiebreaker
            indices.sort(function(index1, index2) {
                return userComparator(array[index1], array[index2]) || (index1 - index2);
            });

            // Reconsitute a sorted array using the array that the indices have been sorted into
            for (i = 0; i < len; i++) {
                indices[i] = array[indices[i]];
            }

            // Rebuild the original array
            for (i = 0; i < len; i++) {
                array[i] = indices[i];
            }

            return array;
        }
    };
});
