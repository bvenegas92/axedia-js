define([
    "./date"
], function() {
    /**
     * Remueve los escapes del formato. En formatos, un "\" puede usarse para escape caracteres especiales
     *
     * @param {String} format Formato
     * @return {String} Formato sin escapes
     */
    $.Date.unescapeFormat = function(format) {
        var slashRe = /\\/gi;
        // <ExtJS>
        // Escape the format, since \ can be used to escape special
        // characters in a date format. For example, in a Spanish
        // locale the format may be: "d \\de F \\de Y"
        return format.replace(slashRe, "");
    };
});
