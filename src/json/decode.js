define([
    "./json"
], function() {
    /**
     * Decodifica un JSON String
     *
     * @param {String} json JSON String
     * @param {Boolean} [safe] `true` para retornar null en caso de una excepcion, `false` de lo contrario
     * @throws {Error} Lanza un error si el JSON String es invalido
     * @return {Object} Objeto decodificado
     */
    $.JSON.decode = (function(json, safe) {
        var hasNative = ROOT.JSON && JSON.toString() === "[object JSON]";

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
                throw e;
            }
        };
    })();
});
