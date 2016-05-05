define([
    "./array",
    "./indexOf"
], function() {
    /**
     * Retorna un nuevo array con elementos unicos
     *
     * @param {Array} array Array a copiar
     * @return {Array} Array con elementos únicos
     */
    $.Array.unique = function(array) {
        var clone = [],
            i = 0,
            ln = array.length,
            item;

        for (; i < ln; i++) {
            item = array[i];

            if ($.Array.indexOf(clone, item) === -1) {
                clone.push(item);
            }
        }

        return clone;
    };
});
