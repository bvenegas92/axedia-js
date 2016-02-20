define([
    './core'
], function($Number, mathFloor, mathRandom) {
    // Number namespace
    $Number = {
        /**
         * Limita un numero al intervalo [min, max]
         *
         * @param  {Number} number Numero a limitar
         * @param  {Number} min    Minimo del intervalo
         * @param  {Number} max    Maximo del intervalo
         * @return {Number}        Numero limitado
         */
        constrain: function(number, min, max) {
            number = parseFloat(number);

            if (min === null) {
                min = number;
            }
            if (max === null) {
                max = number;
            }
            return (number < min) ? min : ((number > max) ? max : number);
        },

        /**
         * Genera un numero aleatorio en el intervalo [from, to]
         *
         * @param  {Number} min    Minimo del intervalo
         * @param  {number} max    Maximo del intervalo
         * @return {Number}        Numero aleatorio
         */
        randomInt: function(min, max) {
            return mathFloor(mathRandom() * (max - min + 1) + min);
        },
    };
});
