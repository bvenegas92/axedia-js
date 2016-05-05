define([
    "./array",
    "./contains"
], function() {
    /**
     * Agrega un elemento al array si aun no existe en este
     *
     * @param {Array} array Array en cual incluir
     * @param {Object} item Elemento a incluir
     */
    $.Array.include = function(array, item) {
        if (!$.Array.contains(array, item)) {
            array.push(item);
        }
    };
});
