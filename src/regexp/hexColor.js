define([
    "./regexp"
], function() {
    /**
     * Color Hexadecimal (e.g. "#aa00ff")
     *
     * @type {RegExp}
     */
    $.RegExp.HEX_COLOR = /^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;
});
