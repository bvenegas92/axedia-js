define([
    "./date",
    "./isLeapYear"
], function() {
    /**
     * Retorna el numero de dias en el mes de la fecha proporcionada. Ajustado para años bisiestos.
     *
     * @param {Date} date Fecha a evaluar
     * @return {Number} Numero de dias en el mes
     */
    $.Date.getDaysInMonth = function(date) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var m = date.getMonth();

        return m === 1 && $.Date.isLeapYear(date) ? 29 : daysInMonth[m];
    };
});
