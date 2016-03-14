define([
    './date',
    '../var/math/abs',
    '../var/math/floor',
    '../string/leftPad',
], function($Date, mathAbs, mathFloor, $String) {
    /**
     * Obtiene la compensacion por la zona horaria.
     *
     * @param {Date}     date   Fecha
     * @param {Boolean}  colon  `true` para separar con ':' las horas y minutos
     * @return {String}         Compensacion
     */
    $Date.getGMTOffset = function(date, colon) {
        var offset = date.getTimezoneOffset();
        return (offset > 0 ? '-' : '+') +
            $String.leftPad(mathFloor(mathAbs(offset) / 60), 2, '0') +
            (colon ? ':' : '') +
            $String.leftPad(mathAbs(offset % 60), 2, '0');
    };
});
