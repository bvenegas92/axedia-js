define([
    './array',
    './replace',
    './slice',
    '../var/math/max',
    '../var/math/min'
], function($Array, mathMax, mathMin) {
    /**
     * Remplaza elementos del array
     *
     * @param {Array}   array        Array
     * @param {Number}  index        Índice en el cual efectuar la operación
     * @param {Number}  removeCount  El numero de elementos a eliminar en el índice
     * @param {Object}  [items]        Elementos a agregar
     * @return {Array}               Array proporcionado
     */
    $Array.splice = ([].splice) ? function(array, index, removeCount) {
        return array.splice.apply(array, $Array.slice(arguments, 1));
    } : function(array, index, removeCount) {
        var pos = fixArrayIndex(array, index),
            removed = array.slice(index, fixArrayIndex(array, pos + removeCount));

        if (arguments.length < 4) {
            $Array.replace(array, pos, removeCount);
        } else {
            $Array.replace(array, pos, removeCount, $Array.slice(arguments, 3));
        }

        return removed;

        function fixArrayIndex(array, index) {
            return (index < 0) ? mathMax(0, array.length + index)
                               : mathMin(array.length, index);
        }
    };
});
