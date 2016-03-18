define([
    './json',
    './encodeValue'
], function($JSON) {
    /**
     * Codifica un objeto a su forma JSON
     *
     * @param  {Object}  o  Objeto a codificar
     * @return {String}     JSON String
     */
    $JSON.encode = (function(o) {
        var hasNative = window.JSON && JSON.toString() === '[object JSON]';

        return function(o) {
            // check USE_NATIVE_JSON here so it can be changed if needed
            if (hasNative) {
                return JSON.stringify(o);
            }

            return $JSON.encodeValue(o);
        };
    })();
});
