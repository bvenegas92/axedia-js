define([
    "./string",
    "../regexp/spacesTrim",
    "../regexp/spaces"
], function() {
    /**
     * Separa un string en palabras
     *
     * @param {String} words String a separar
     * @return {Array} Array de palabras
     */
    $.String.splitWords = function(words) {
        if (words && typeof words === "string") {
            return words
                .replace($.RegExp.SPACES_TRIM, "")
                .split($.RegExp.SPACES);
        }
        return words || [];
    };
});
