define([
    './json'
], function($JSON) {
    /**
     * Decodifica un JSON String
     *
     * @param  {String}  json  JSON String
     * @param  {Boolean}  [safe]  `true` para retornar null en caso de una excepcion, `false` de lo contrario
     * @return {Object}       [description]
     */
    $JSON.decode = (function(json, safe) {
        var hasNative = window.JSON && JSON.toString() === '[object JSON]';

        return function(json, safe) {
            try {
                // check USE_NATIVE_JSON here so it can be changed if needed
                if (hasNative) {
                    return JSON.parse(json);
                }
                return eval("(" + json + ')');
            } catch (e) {
                if (safe) {
                    return null;
                }
                throw new Error("You're trying to decode an invalid JSON String: " + json);
            }
        };
    })();
});
