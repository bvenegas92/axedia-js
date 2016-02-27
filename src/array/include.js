define([
    './array',
    './contains'
], function($Array) {
    /*
     * Agrega un elemento al arreglo si aun no existe en este,
     *
     * @param {Array}   array  Arreglo en cual incluir
     * @param {Object}  item   Elemento a incluir
     */
    $Array.include = function(array, item) {
        if (!$Array.contains(array, item)) {
            array.push(item);
        }
    };
});
