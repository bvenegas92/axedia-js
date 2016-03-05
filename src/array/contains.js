define([
    './array',
    './indexOf',
], function($Array) {
    /**
     * Verifica si un elemento se encuentra en el array proporcionado.
     *
     * @param {Array}   array  Array en cual buscar
     * @param {Object}  item   Elemento a buscar
     * @return {Boolean}       `true` si se encuentra, `false` de lo contrario.
     */
    $Array.contains = function(array, item) {
        return $Array.indexOf(array, item) !== -1;
    };
});
