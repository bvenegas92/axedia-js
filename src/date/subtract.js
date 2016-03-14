define([
    './date',
    './add'
], function($Date) {
    /**
     * Provee una forma conveniente para realizar operaciones aritmeticas con fechas. Este metodo no modifica
     * la instancia `Date` proporcionada, crea y retorna una nueva instancia de `Date` con el resultado.
     *
     * @param {Date}    date      La fecha a modificar
     * @param {String}  interval  Intervalo para la operacion
     * @param {Number}  value     Valor a agregar/restar a la fecha
     * @return {Date}             Nueva instancia `Date` con el resultado
     */
    $Date.subtract = function(date, interval, value) {
        return $Date.add(date, interval, -value);
    };
});
