define([
    "./date"
], function() {
    /**
     * Verifica si la fecha proporcionada entra en un año bisiesto.
     *
     * @param {Date} date Fecha a verificar
     * @return {Boolean} `true` si es bisiesto, `false` de lo contrario
     */
    $.Date.isLeapYear = function(date) {
        var year = date.getFullYear();
        return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
    };
});
