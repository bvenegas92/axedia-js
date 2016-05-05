define([
    "./string",
    "../regExp/spacesTrim"
], function() {
    /**
     * Realiza un trim a `string` incluyendo " ", \t, \n, \r, \v
     *
     * @param {String} string String a trimear
     * @return {String} String trimeado
     */
    $.String.trim = function(string) {
        if (string) {
            string = string.replace($.RegExp.SPACES_TRIM, "");
        }
        return string || "";
    };
});
