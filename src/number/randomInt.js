define([
    "./number"
], function() {
    /**
     * Genera un numero entero aleatorio en el intervalo [from, to]
     *
     * @param {Number} from Minimo del intervalo
     * @param {number} to Maximo del intervalo
     * @return {Number} Numero aleatorio
     */
    $.Number.randomInt = function(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };
});
