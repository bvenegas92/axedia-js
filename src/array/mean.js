define([
    './array',
    './sum'
], function($Array) {
    /**
     * Obtiene el promedio de los elementos
     *
     * @param {Array}  array  Array a calcular
     * @return {Number}       Promedio
     */
    $Array.mean = function(array) {
        return array.length > 0 ? $Array.sum(array) / array.length : undefined;
    };
});
