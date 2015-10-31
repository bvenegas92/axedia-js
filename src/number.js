define(function() {
    // Number namespace
    var $Number = {
        /**
         * Limita un numero al intervalo [min, max]
         * @performance number_contrain.php
         * El uso de operadores es la mejor opcion sobre Math.min & MAth.max
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
        randomInt: function(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        },
    };
});
