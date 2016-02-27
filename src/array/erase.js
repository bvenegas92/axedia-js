define([
    './array',
    './replace'
], function($Array) {
    /*
     * Remueve elementos del arreglo
     *
     * @param {Array}  array        Arreglo
     * @param {Array}  index        Índice en el cual efectuar la operación
     * @param {Array}  removeCount  El numero de elementos a eliminar en el índice
     * @return {Array}              Arreglo proporcionado
     */
    $Array.erase = ([].splice) ? function(array, index, removeCount) {
        array.splice(index, removeCount);
        return array;
    } : function(array, index, removeCount) {
        return $Array.replace(array, index, removeCount);
    };
});
