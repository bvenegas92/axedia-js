define([
    './core'
], function($RegExp) {
    // RegExp namespace
    $RegExp = {
        /**
         * Espacios (i.e. ' ', \t, \n, \r, \v) al inicio y fin
         *
         * @type {RegExp}
         */
        SPACES_TRIM: /^\s+|\s+$/g,
        /**
         * Espacios (i.e. ' ', \t, \n, \r, \v)
         *
         * @type {RegExp}
         */
        SPACES: /\s+/
    };
});
