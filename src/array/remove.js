define([
    './array',
    './erase'
], function($Array) {
    /*
     * Remueve elementos del array
     *
     * @param {Array}   array        Array
     * @param {Object}  item        Índice en el cual efectuar la operación
     * @param {Number}  removeCount  El numero de elementos a eliminar en el índice
     * @return {Array}               Array proporcionado
     */
    $Array.remove = function(array, item) {
        var index = $Array.indexOf(array, item);

        if (index !== -1) {
            $Array.erase(array, index, 1);
        }

        return array;
    };
});
