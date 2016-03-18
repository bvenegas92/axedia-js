define([
    './type',
    '../var/object/toString'
], function($Type, objectToString) {
    /**
     * Verifica si `value` es un objeto
     *
     * @param {Object} value  Objeto a evaluar
     * @return {Boolean} [    `true` su es objeto, `false` de lo contrario
     */
    $Type.isObject = (objectToString.call(null) === '[object Object]') ?
    function(value) {
        // check ownerDocument here as well to exclude DOM nodes
        return value !== null && value !== undefined && objectToString.call(value) === '[object Object]' &&
            value.ownerDocument === undefined;
    } :
    function(value) {
        return objectToString.call(value) === '[object Object]';
    };
});
