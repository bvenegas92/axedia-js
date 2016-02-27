define([
    './array',
    './replace'
], function($Array) {
    /*
     * Agrega elementos a un arreglo
     *
     * @param {Array}   array  Arreglo en cual incluir
     * @param {Number}  index  Indice en cual incluir
     * @param {Array}   items  Arreglo a incluir
     * @return {Array}         Arreglo con elementos incluidos
     */
    $Array.insert = function(array, index, items) {
        return $Array.replace(array, index, 0, items);
    };
});
