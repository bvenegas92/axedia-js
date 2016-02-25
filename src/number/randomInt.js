define([
    './number',
    '../var/math/floor',
    '../var/math/random'
], function($Number, mathFloor, mathRandom) {
    /**
     * Genera un numero entero aleatorio en el intervalo [from, to]
     *
     * @param {Number}  from  Minimo del intervalo
     * @param {number}  to    Maximo del intervalo
     * @return {Number}       Numero aleatorio
     */
    $Number.randomInt = function(from, to) {
        return mathFloor(mathRandom() * (to - from + 1) + from);
    };
});
