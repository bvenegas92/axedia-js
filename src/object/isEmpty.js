define([
    './object'
], function($Object) {
    /**
     * Verifica si existe una propiedad en `object`
     *
     * @param  {Object}  object  Objeto
     * @return {Boolean}         `true` si existe alguna propiedad, `false` de lo contrario
     */
    $Object.isEmpty = function(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
});
