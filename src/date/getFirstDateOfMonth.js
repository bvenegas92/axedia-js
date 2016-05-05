define([
    "./date"
], function() {
    /**
     * Retorna la fecha del primer dia del mes en que la fecha proporcionada reside.
     *
     * @param {Date} date Fecha
     * @return {Date} Fecha del primer dia
     */
    $.Date.getFirstDateOfMonth = function(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };
});
