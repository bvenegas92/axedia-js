define([
    "./date"
], function() {
    /**
     * Obtiene el numero de semana del año de la fecha.
     *
     * @param {Date} date Fecha
     * @return {Number} Numero de la semana
     */
    $.Date.getWeekOfYear = function(date) {
        // adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
        var ms1d = 864e5, // milliseconds in a day
            ms7d = 7 * ms1d, // milliseconds in a week
            DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d, // an Absolute Day Num
            AWN = Math.floor(DC3 / 7), // an Absolute Week Number
            Wyr = new Date(AWN * ms7d).getUTCFullYear();

        return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
    };
});
