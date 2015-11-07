(function(global){

    var _floor = Math.floor;


    var _random = Math.random;


    // Number namespace
    var $Number = {
        /**
         * Limita un numero al intervalo [min, max]
         *
         * PERFORMACE - number/constrain.php
         * El uso de operadores es la mejor opcion
         *
         * @param  {number} number Numero a limitar
         * @param  {number} min    Minimo del intervalo
         * @param  {number} max    Maximo del intervalo
         * @return {number}        Numero limitado
         */
        constrain: function(number, min, max) {
            var x = parseFloat(number);
            if (min === null) {
                min = number;
            }
            if (max === null) {
                max = number;
            }
            return (x < min) ? min : ((x > max) ? max : x);
        },

        /**
         * Genera un numero aleatorio en el intervalo [from, to]
         *
         * PERFORMACE - number/randomInt.php
         * El uso de var locales para cachear funciones Math es la mejor opción
         *
         * @param  {number} min    Minimo del intervalo
         * @param  {number} max    Maximo del intervalo
         * @return {number}        Numero aleatorio
         */
        randomInt: function(min, max) {
            return _floor(_random() * (max - min + 1) + min);
        },
    };


    // RegExp namespace
    var $RegExp = {
        /**
         * Espacios (i.e. ' ', \t, \n, \r, \v) al inicio y fin
         *
         * @type {RegExp}
         */
        BASIC_TRIM: /^\s+|\s+$/g,
        WHITE_SPACE: /\s+/
    };


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


    // Axedia namespace
    var axedia = {
        Number: $Number,
        String: $String,
        RegExp: $RegExp
    };

    window.axedia = window.axd = axedia;

})(window);
