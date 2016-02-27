define([
    './type',
    '../var/object/toString'
], function($Type, objectToString) {
    /**
     * Verifica si un valor es un arreglo de JavaScript
     *
     * @param {Object}  value  Objeto a evaluar
     * @return {Boolean}       `true` si es arreglo, `false` de lo contrario.
     */
    $Type.isArray = ('isArray' in Array) ? Array.isArray : function(value) {
        return objectToString.call(value) === '[object Array]';
    };
});
