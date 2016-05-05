define([
    "./array",
    "./replace"
], function() {
    /**
     * Remueve elementos del array
     *
     * @param {Array} array Array
     * @param {Number} index Índice en el cual efectuar la operación
     * @param {Number} removeCount El numero de elementos a eliminar en el índice
     * @return {Array} Array proporcionado
     */
    $.Array.erase = ([].splice) ? function(array, index, removeCount) {
        array.splice(index, removeCount);
        return array;
    } : function(array, index, removeCount) {
        return $.Array.replace(array, index, removeCount);
    };
});
