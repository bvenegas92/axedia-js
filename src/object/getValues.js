define([
    "./object"
], function() {
    /**
     * Obtiene todos los valores de las propiedades propias del objeto
     *
     * @param  {Object} object  Objeto
     * @return {Array}         Array de valores
     */
    $.Object.getValues = function(object) {
        var values = [],
            property;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                values.push(object[property]);
            }
        }

        return values;
    };
});
