define([
    './regexp'
], function($RegExp) {
    /**
     * Espacios (i.e. ' ', \t, \n, \r, \v) al inicio y fin
     *
     * @type {RegExp}
     */
    $RegExp.SPACES_TRIM = /^\s+|\s+$/g;
});
