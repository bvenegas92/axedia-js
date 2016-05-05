define([
    "./string"
], function() {
    /**
     * Convierte a mayuscula la primera letra del texto
     *
     * @param {String} string String a convertir
     * @return {String} String con la primera letra convertida
     */
    $.String.capitalize = function(string) {
        if (string) {
            string = string.charAt(0).toUpperCase() + string.substr(1);
        }
        return string || "";
    };
});
