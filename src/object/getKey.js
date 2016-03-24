define([
    './object'
], function($Object) {
    /**
     * Devuelve el nombre de la primera propiedad que tenga como valor ``value`
     *
     * @param  {Object} object  Objecto
     * @param  {Object} value   Valor
     * @return {?String}         Propiedad
     */
    $Object.getKey = function(object, value) {
        for (var property in object) {
            if (object.hasOwnProperty(property) && object[property] === value) {
                return property;
            }
        }

        return null;
    };
});
