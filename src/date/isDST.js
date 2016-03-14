define([
    './date'
], function($Date) {
    /**
     * Verifica si la fecha actual esta afectada por el horario de verano (DST)
     *
     * @param {Date}  date  Fecha
     * @return {Boolean}    `true` si esta afectada, `false` de lo contrario
     */
    $Date.isDST = function(date) {
        return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() !== date.getTimezoneOffset();
    };
});
