define([
    './array',
    './indexOf'
], function($Array, $ArrayIndexOf) {
    /*
     * Retorna un nuevo arreglo con elementos unicos
     *
     * @param {Array}  array  Arreglo a copiar
     * @return {Array}        Arreglo con elementos únicos
     */
    $Array.unique = function(array) {
        var clone = [],
            i = 0,
            ln = array.length,
            item;

        for (; i < ln; i++) {
            item = array[i];

            if ($Array.indexOf(clone, item) === -1) {
                clone.push(item);
            }
        }

        return clone;
    };
});
