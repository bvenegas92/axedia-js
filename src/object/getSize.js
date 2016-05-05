define([
    "./object"
], function() {
    /**
     * Obtiene el numero total de propiedades propias del objeto.
     *
     * @param {Object} object Objeto
     * @return {Number} Numero de propiedades
     */
    $.Object.getSize = function(object) {
        var size = 0,
            property;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                size++;
            }
        }

        return size;
    };
});
