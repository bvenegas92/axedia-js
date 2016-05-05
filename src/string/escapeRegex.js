define([
    "./string"
], function() {
    /**
     * Escape `string` para usarla en un RegExp
     *
     * @param {String} string String a escape
     * @return {String} String escaped
     */
    $.String.escapeRegex = function(string) {
        var escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g;
        return string.replace(escapeRegexRe, "\\$1");
    };
});
