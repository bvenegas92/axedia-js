define([
    './string',
    '../number/constrain',
    '../number/randomInt'
], function($String, $Number) {
    /**
     * Genera un string de la longitud proporcionada (min. 1, maximo 1000 caracteres)
     * tomando los caracteres de una palabra determinada
     *
     * @param {Number}  [length=32]  Longitud del string
     * @param {String} [word=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]
     *                               Palabra fuente
     * @return {String}              String generado
     */
    $String.random = function(length, word) {
        word = word || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        length = $Number.constrain(length || 32, 1, 1000);
        var str = '';

        for (var i = 0; i < length; i++) {
            str += word.charAt($Number.randomInt(0, word.length - 1));
        }
        return str;
    };
});
