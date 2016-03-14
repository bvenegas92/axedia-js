define([
    './date',
    './add',
    './year'
], function($Date) {
    /**
     * Verifica si los parametros para crear una instancia `date causarian un 'rollover'.
     *
     * @param  {Number}  y   Año
     * @param  {Number}  m   Mes
     * @param  {Number}  d   Dia
     * @param  {Number}  h   Horas
     * @param  {Number}  i   Minutos
     * @param  {Number}  s   Segundos
     * @param  {Number}  ms  Milisegundos
     * @return {Boolean}     `true` si es válido, `false` de lo contrario
     */
    $Date.isValid = function(y, m, d, h, i, s, ms) {
        // setup defaults
        h = h || 0;
        i = i || 0;
        s = s || 0;
        ms = ms || 0;

        // Special handling for year < 100
        var dt = $Date.add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), $Date.YEAR, y < 100 ? y - 100 : 0);

        return y === dt.getFullYear() &&
            m === dt.getMonth() + 1 &&
            d === dt.getDate() &&
            h === dt.getHours() &&
            i === dt.getMinutes() &&
            s === dt.getSeconds() &&
            ms === dt.getMilliseconds();
    };
});
