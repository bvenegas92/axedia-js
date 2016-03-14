define([
    './date'
], function($Date) {
    /**
     * Verifica si dos instancias `Date` son identicas comparando sus valores
     *
     * @param  {Date}  date1  Fecha 1
     * @param  {Date}  date2  Fecha 2
     * @return {Boolean}      `true` si ambas instancias son iguales
     */
    $Date.isEqual = function(date1, date2) {
        // check we have 2 date objects
        if (date1 && date2) {
            return (date1.getTime() === date2.getTime());
        }
        // one or both isn't a date, only equal if both are falsey
        return !(date1 || date2);
    };
});
