define([
    "./json"
], function() {
    /**
     * Decodifica un JSON String
     *
     * @param {String} json JSON String
     * @param {Boolean} [safe] `true` para retornar null en caso de una excepcion, `false` de lo contrario
     * @return {Object} Objeto decodificado
     */
    $.JSON.decode = (function(json, safe) {
        var hasNative = global.JSON && JSON.toString() === "[object JSON]";

        return function(json, safe) {
            try {
                if (hasNative) {
                    return JSON.parse(json);
                }
                return eval("(" + json + ")");
            } catch (e) {
                if (safe) {
                    return null;
                }
                throw new Error("[" + namespace + ".JSON] JSON String inválido: " + json);
            }
        };
    })();
});
