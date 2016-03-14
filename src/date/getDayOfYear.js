define([
    './date',
    './getDaysInMonth',
    './clone'
], function($Date) {
    /**
     * Obtiene el numero del dia (base 0) del año.
     *
     * @param  {Date}  date  Fecha
     * @return {Number}      Numero del dia
     */
    $Date.getDayOfYear = function(date) {
        var num = 0,
            d = $Date.clone(date),
            m = date.getMonth(),
            i;

        for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
            num += $Date.getDaysInMonth(d);
        }
        return num + date.getDate() - 1;
    };
});
