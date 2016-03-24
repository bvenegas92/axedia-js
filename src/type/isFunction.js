define([
    './type',
    '../var/object/toString'
], function($Type, objectToString, document) {
    /**
     * Verifica si `value` es una funcion de JavaScript
     *
     * @param {Object}  value  Objeto a evaluar
     * @return {Boolean}       `true` si es funcion, `false` de lo contrario.
     */
    $Type.isFunction =
    // Safari 3.x and 4.x returns 'function' for typeof <NodeList>, hence we need to fall back to using
    // Object.prototype.toString (slower)
    (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function(value) {
        return !!value && objectToString.call(value) === '[object Function]';
    } : function(value) {
        return !!value && typeof value === 'function';
    };
});
