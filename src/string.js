define([
    './core',
    './number',
    './regexp'
], function($String, $Number, $RegExp) {
    // String namespace
    $String = {
        /**
         * Separa un string en palabras
         *
         * @param  {String} words String a separar
         * @return {Array}        Array de palabras
         */
        splitWords: function(words) {
            if (words && typeof words === 'string') {
                return words
                    .replace($RegExp.SPACES_TRIM, '')
                    .split($RegExp.SPACES);
            }
            return words || [];
        },

        /**
         * Genera un string (maximo 1000 caracteres)
         *
         * @param  {Number} [length=32] Longitud del string
         * @return {String}             String generado
         */
        random: function(length) {
            length = $Number.constrain(length || 32, 1, 1000);
            var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            str = '';

            for (var i = 0; i < length; i++) {
                str += chars.chartAt($Number.randomInt(0, chars.length - 1));
            }
            return str;
        }
    };
});
