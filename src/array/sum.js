define([
    './array'
], function($Array) {
    /**
     * Calcula la suma de los elementos
     *
     * @param {Array}  array  Array a calcular
     * @return {Number}       Suma
     */
    $Array.sum = function(array) {
        var sum = 0,
            i, ln, item;

        for (i = 0,ln = array.length; i < ln; i++) {
            item = array[i];

            sum += item;
        }

        return sum;
    };
});
