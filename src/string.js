define([
    './number',
    './regexp'
], function($Number, $RegExp) {
    // String namespace
    var $String = {
        /**
         * Separa un string en palabras
         *
         * @param  {string} words String a separar
         * @return {array}        Array de palabras
         */
        splitWords: function(words) {
            if (words && typeof words === 'string') {
                return words
                    .replace($RegExp.BASIC_TRIM, '')
                    .split($RegExp.WHITE_SPACE);
            }
            return words || [];
        },

        /**
         * Genera un string (maximo 1000 caracteres)
         *
         * PERFORMACE - string/random.php
         * El uso de una cadena de caracteres es mejor sobre valores random de ascii
         *
         * @param  {number} length Longitud del string
         * @return {string}        String generado
         */
        random: function(length) {
            length = $Number.constrain(length || $Number.randomInt(1,32), 1, 1000);
            var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var str = '';

            for (var i = 0; i < length; i++) {
                str += chars.chartAt($Number.randomInt(0, chars.length - 1));
            }
            return str;
        }
    };
});
