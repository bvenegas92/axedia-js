define([
    './array',
    '../var/math/min',
    ''
], function($Array, mathMin) {
    /*
     * Remueve elementos del array en el indice especifico
     *
     * @param {Array}   array  Array
     * @param {Number}  index  Índice en el cual efectuar la operación
     * @param {Number}  count  El numero de elementos a eliminar en el índice
     * @return {Array}         Array proporcionado
     */
    $Array.removeAt = function(array, index, count) {
        var len = array.length;
        if (index >= 0 && index < len) {
            count = count || 1;
            count = mathMin(count, len - index);
            $Array.erase(array, index, count);
        }
        return array;
    };
});
