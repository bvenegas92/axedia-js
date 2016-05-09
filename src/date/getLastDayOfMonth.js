define([
    "./date",
    "./getLastDateOfMonth"
], function() {
    /**
     * Obtiene el ultimo dia del mes de `date`. El valor retornado es un indice del dia de la semana (0-6)
     *
     * @param  {Date} date Fecha
     * @return {Number} El numero del dia (0-6)
     */
    $.Date.getLastDayOfMonth  = function(date) {
        return $.Date.getLastDateOfMonth(date).getDay();
    };
});
