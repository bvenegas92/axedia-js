define([
    "./date",
    "./getDaysInMonth"
], function() {
    /**
     * Retorna la fecha del ultimo dia del mes en que la fecha proporcionada reside.
     *
     * @param {Date} date Fecha
     * @return {Date} Fecha del ultimo dia
     */
    $.Date.getLastDateOfMonth = function(date) {
        return new Date(date.getFullYear(), date.getMonth(), $.Date.getDaysInMonth(date));
    };
});
