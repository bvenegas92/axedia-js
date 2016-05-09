define([
    "./date"
], function() {
    /**
     * Retorna el numero de milisegundos entre dos fechas
     *
     * @param {Date} dateA Fecha A
     * @param {Date} [dateB] Fecha B
     * @return {Number} Diferencia en milisegundos
     */
    $.Date.getElapsed = function(dateA, dateB) {
        return Math.abs(dateA - (dateB || Date.now()));
    };
});
