define([
    "./json",
    "./encodeValue"
], function() {
    /**
     * Codifica un objeto a su forma JSON
     *
     * @param {Object} o Objeto a codificar
     * @return {String} JSON String
     */
    $.JSON.encode = (function(o) {
        var hasNative = global.JSON && JSON.toString() === "[object JSON]";

        return function(o) {
            if (hasNative) {
                return JSON.stringify(o);
            }

            return $.JSON.encodeValue(o);
        };
    })();
});
