define([
    './object'
], function($Object) {
    /**
     * Copia todas las propiedades de `config` a `object` si no existen en `object`
     *
     * @param  {Object}  object  Objecto
     * @param  {Object}  config  Propiedades
     * @return {Object}          `object` con las propiedades agregadas
     */
    $Object.copyIf = function(object, config) {
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
