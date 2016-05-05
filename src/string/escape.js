define([
    "./string"
], function() {
    /**
     * Escape `string`
     *
     * @param {String} string String a escape
     * @return {String} String escaped
     */
    $.String.escape = function(string) {
        var escapeRe = /('|\\)/g;
        return string.replace(escapeRe, "\\$1");
    };
});
