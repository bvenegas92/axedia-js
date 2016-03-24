define([
    './object'
], function($Object) {
    /**
     * copia todas las propiedades de `config` a `object`. La copia es una referencia al objeto original
     *
     * @param  {Object} object   Objeto destino
     * @param  {Object} config   Objeto fuente
     * @param  {Object} defaults Propiedades default
     * @return {Object}          Objeto copiado
     */
    $Object.copy = function(object, config, defaults) {
        if (defaults) {
            $Object.copy(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }
        }

        return object;
    };
});
