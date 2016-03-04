define([
    './array',
    '../type/isEmpty'
], function($Array, $Type) {
    /*
     * Remuve los elementos vacios en el array de acuerdo a $Type.isEmpty
     *
     * @param {Array}  array  Array a filtrar
     * @return {Array}        Array sin elementos vacios
     */
    $Array.clean = function(array) {
        var results = [],
            i = 0,
            ln = array.length,
            item;

        for (; i < ln; i++) {
            item = array[i];

            if (!$Type.isEmpty(item)) {
                results.push(item);
            }
        }

        return results;
    };
});
