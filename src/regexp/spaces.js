define([
    './regexp'
], function($RegExp) {
    /**
     * Espacios (i.e. ' ', \t, \n, \r, \v)
     *
     * @type {RegExp}
     */
    $RegExp.SPACES = /\s+/;
});
