define([
    "./type"
], function() {
    /**
     * Verifica si `value` es un objeto
     *
     * @param {Object} value Objeto a evaluar
     * @return {Boolean} `true` su es objeto, `false` de lo contrario
     */
    $.Type.isObject = (Object.prototype.toString.call(null) === "[object Object]") ?
    function(value) {
        // check ownerDocument here as well to exclude DOM nodes
        return value !== null && value !== undefined && Object.prototype.toString.call(value) === "[object Object]" &&
            value.ownerDocument === undefined;
    } :
    function(value) {
        return Object.prototype.toString.call(value) === "[object Object]";
    };
});
