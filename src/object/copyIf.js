define([
    "./object"
], function() {
    /**
     * Copia todas las propiedades de `config` a `object` si no existen en `object`.
     * La copia es una referencia al objeto original
     *
     * @param {Object} object Objecto
     * @param {Object} config Propiedades
     * @return {Object} `object` con las propiedades agregadas
     */
    $.Object.copyIf = function(object, config) {
        var property;

        if (object) {
            for (property in config) {
                if (object[property] === undefined) {
                    object[property] = config[property];
                }
            }
        }

        return object;
    };
});
