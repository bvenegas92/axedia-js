define([
    "./array",
    "./slice",
    "./erase"
], function() {
    /**
     * Realiza una diferencia entre los elementos de ambos arrays substrayendo
     * los elementos de `arrayB` existentes en `arrayA`
     *
     * @param {Array} arrayA Array A
     * @param {Array} arrayB Array B
     * @return {Array} Array con las diferencias
     */
    $.Array.difference = function(arrayA, arrayB) {
        var clone = $.Array.slice(arrayA),
            ln = clone.length,
            i, j, lnB;

        for (i = 0,lnB = arrayB.length; i < lnB; i++) {
            for (j = 0; j < ln; j++) {
                if (clone[j] === arrayB[i]) {
                    $.Array.erase(clone, j, 1);
                    j--;
                    ln--;
                }
            }
        }

        return clone;
    };
});
