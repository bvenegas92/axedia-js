define([
    "./array"
], function() {
    /**
     * Obtiene el índice de un elemento dado en el array proporcionado.
     *
     * @param {Array} array Array en cual buscar
     * @param {Object} item Elemento a buscar
     * @param {Number} [from=0] Indice en el cual comenzar la busqueda
     * @return {Number} Índice del elemento o `-1` en caso de no encontrarlo
     */
    $.Array.indexOf = ("indexOf" in Array.prototype) ? function(array, item, from) {
        return Array.prototype.indexOf.call(array, item, from);
    } : function(array, item, from) {
        var i, length = array.length;

        for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
            if (array[i] === item) {
                return i;
            }
        }

        return -1;
    };
});
