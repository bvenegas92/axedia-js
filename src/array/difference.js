define([
    './array',
    './slice'
], function($Array) {
    /*
     * Realiza una diferencia entre los elementos de ambos arreglos substrayendo los elementos de B existentes en A
     *
     * @param {Array}  arrayA  Arreglo A
     * @param {Array}  arrayB  Arreglo B
     * @return {Array}         Arreglo con las diferencias
     */
    $Array.difference = function(arrayA, arrayB) {
        var clone = $Array.slice(arrayA),
            ln = clone.length,
            i, j, lnB;

        for (i = 0,lnB = arrayB.length; i < lnB; i++) {
            for (j = 0; j < ln; j++) {
                if (clone[j] === arrayB[i]) {
                    $Array.erase(clone, j, 1);
                    j--;
                    ln--;
                }
            }
        }

        return clone;
    };
});
