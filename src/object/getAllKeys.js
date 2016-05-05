define([
    "./object"
], function() {
    /**
     * Obtiene todos los nombres de las propiedades del objecto.
     *
     * @param {Object} object Objeto
     * @return {Array} Array de nombres de  las propiedades
     */
    $.Object.getAllKeys = function(object) {
        var keys = [],
            property;

        for (property in object) {
            keys.push(property);
        }

        return keys;
    };
});
