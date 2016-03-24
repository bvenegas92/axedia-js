define([
    './object',
    './clone'
], function($Object) {
    /**
     * Une cualquier cantidad de objetos de manera recursiva sin que estos se referencien
     *
     * @param  {Object}    destination  Objeto destino
     * @param  {...Object}  object      Objetos a unir
     * @return {Object}                 Objeto resultante
     */
    $Object.merge = function(destination) {
        var i = 1,
            ln = arguments.length,
            mergeFn = $Object.merge,
            cloneFn = $Object.clone,
            object, key, value, sourceKey;

        for (; i < ln; i++) {
            object = arguments[i];

            for (key in object) {
                value = object[key];
                if (value && value.constructor === Object) {
                    sourceKey = destination[key];
                    if (sourceKey && sourceKey.constructor === Object) {
                        mergeFn(sourceKey, value);
                    } else {
                        destination[key] = cloneFn(value);
                    }
                } else {
                    destination[key] = value;
                }
            }
        }

        return destination;
    };
});
