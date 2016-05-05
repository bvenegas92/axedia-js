define([
    "./array",
    "./indexOf",
    "./erase"
], function() {
    /**
     * Remueve elementos del array
     *
     * @param {Array} array Array
     * @param {Object} item Índice en el cual efectuar la operación
     * @return {Array} Array proporcionado
     */
    $.Array.remove = function(array, item) {
        var index = $.Array.indexOf(array, item);

        if (index !== -1) {
            $.Array.erase(array, index, 1);
        }

        return array;
    };
});
