define([
    './string'
], function($String) {
    /**
     * Convierte a mayuscula la primera letra del texto
     *
     * @param {String}  string  String a convertir
     * @return {String}         String con la primera letra convertida
     */
    $String.uncapitalize = function(string) {
        if (string) {
            string = string.charAt(0).toLowerCase() + string.substr(1);
        }
        return string || '';
    };
});
