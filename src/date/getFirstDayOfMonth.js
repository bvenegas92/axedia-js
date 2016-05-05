define([
    "./date"
], function() {
    /**
     * Obtiene el numero de dia de la semana (base 0) del primer dia del mes.
     *
     * @param {Date} date Fecha
     * @return {Number} Numero del dia de la semana
     */
    $.Date.getFirstDayOfMonth = function(date) {
        var day = (date.getDay() - (date.getDate() - 1)) % 7;
        return (day < 0) ? (day + 7) : day;
    };
});
