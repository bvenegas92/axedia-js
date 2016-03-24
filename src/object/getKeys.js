define([
    './object'
], function($Object) {
    /**
     * Obtiene todos los nombres de las propiedades del objecto. No incluye las propiedades heredadas de su
     * cadena de prototipos.
     *
     * @param  {Object} object  Objeto
     * @return {Array}       Array de nombres de  las propiedades
     */
    $Object.getKeys = (typeof Object.keys === 'function') ?
    function(object) {
        if (!object) {
            return [];
        }
        return Object.keys(object);
    }
    : function(object) {
        var keys = [],
            property;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                keys.push(property);
            }
        }

        return keys;
    };
});
