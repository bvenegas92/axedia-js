define([
    './string'
], function($String) {
    /**
     * Rellena por la izquierda un string con el caracter especificado
     *
     * @param {String}  string           Substring a rellenar
     * @param {Number}  size             Longitud final
     * @param {String}  [character=" "]  Caracter de relleno
     * @return {String}                  String rellenado
     */
    $String.leftPad = function(string, size, character) {
        var result = String(string);
        character = character || ' ';
        while (result.length < size) {
            result = character + result;
        }
        return result;
    };
});
