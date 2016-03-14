define([
    './date',
    './dayNames'
], function($Date) {
    /**
     * Obtiene el nombre corto del dia del numero de dia proporcionado.
     *
     * @param  {Number}  day  Numero del dia
     * @return {String}       Nombre corto del dia
     */
    $Date.getShortDayName = function(day) {
        return $Date.dayNames[day].substring(0, 3);
    };
});
