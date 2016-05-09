define([
    "./date",
    "./monthNames"
], function() {
    /**
     * Obtiene el nombre corto del mes del numero de mes proporcionado.
     *
     * @param {Number} month Numero del mes
     * @return {String} Nombre corto del mes
     */
    $.Date.getShortMonthName = function(month) {
        return $.Date.monthNames[month].substring(0, 3);
    };
});
