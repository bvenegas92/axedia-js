define([
    './date'
], function($Date) {
    /**
     * Crea y retorna una nueva instancia `Date` con el mismo valor de la fecha proporcionada.
     * Las instancias `Date` son pasadas por referencia esto implica que al copiar una fecha en otra variable
     * ambas variables tanto la vieja como la nueva apuntaran a la misma instancia. Si se pretende que ambas variables
     * tengan diferentes instancias entonces se debe clonar la instancia.
     *
     * @param  {Date}  date  Fecha a clonar
     * @return {Date}        Nueva instancia `Date` con la fecha proporcionada
     */
    $Date.clone = function(date) {
        return new Date(date.getTime());
    };
});
