define([
    "./number"
], function() {
    /**
     * Limita un numero al intervalo [min, max]
     *
     * @param {Number} number Numero a limitar
     * @param {Number} min Minimo del intervalo
     * @param {Number} max Maximo del intervalo
     * @return {Number} Numero limitado
     */
    $.Number.constrain = function(number, min, max) {
        number = parseFloat(number);

        if (min === null) {
            min = number;
        }
        if (max === null) {
            max = number;
        }
        return (number < min) ? min : ((number > max) ? max : number);
    };
});
