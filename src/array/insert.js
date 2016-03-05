define([
    './array',
    './replace'
], function($Array) {
    /**
     * Agrega elementos a un array
     *
     * @param {Array}   array  Array en cual incluir
     * @param {Number}  index  Indice en cual incluir
     * @param {Array}   items  Array a incluir
     * @return {Array}         Array con elementos incluidos
     */
    $Array.insert = function(array, index, items) {
        return $Array.replace(array, index, 0, items);
    };
});
