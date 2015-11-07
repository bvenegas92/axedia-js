define([
    './math/floor',
    './math/random'
],function(_floor, _random) {
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
});
