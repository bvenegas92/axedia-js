define([
    './date'
], function($Date) {
    /**
     * Verifica si la fecha `date` esta entre las fechas `start` y `end`
     *
     * @param {Date}  date   Fecha a verificar
     * @param {Date}  start  Fecha inicial
     * @param {Date}  end    Fecha final
     * @return {Boolean}     `true` si cae entre las fechas, `false` de lo contrario
     */
    $Date.between = function(date, start, end) {
        var t = date.getTime();
        return start.getTime() <= t && t <= end.getTime();
    };
});
