define([
    "./date",
    "./monthNumbers"
], function() {
    /**
     * Obtiene el numero del mes (JavaScript base 0) del nombre/abreviacion del mes proporcionado.
     *
     * @param {String} name Nombre/abreviacion del mes
     * @return {Number} Numero del mes
     */
    $.Date.getMonthNumber = function(name) {
        return $.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
    };
});
