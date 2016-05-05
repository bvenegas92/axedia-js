define([
    "./date"
], function() {
    /**
     * Obtiene el subfijo en ingles del dia
     *
     * @param {Date} date Fecha
     * @return {String} Subfijo en ingles
     */
    $.Date.getSuffix  = function(date) {
        switch (date.getDate()) {
            case 1:
            case 21:
            case 31:
                return "st";
            case 2:
            case 22:
                return "nd";
            case 3:
            case 23:
                return "rd";
            default:
                return "th";
        }
    };
});
