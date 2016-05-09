define([
    "./date",
    "../string/leftPad"
], function() {
    /**
     * Obtiene la compensacion por la zona horaria.
     *
     * @param {Date} date Fecha
     * @param {Boolean} colon `true` para separar con ":" las horas y minutos
     * @return {String} Compensacion
     */
    $.Date.getGMTOffset = function(date, colon) {
        var offset = date.getTimezoneOffset();
        return (offset > 0 ? "-" : "+") +
            $.String.leftPad(Math.floor(Math.abs(offset) / 60), 2, "0") +
            (colon ? ":" : "") +
            $.String.leftPad(Math.abs(offset % 60), 2, "0");
    };
});
