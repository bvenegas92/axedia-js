define([
    "./date",
    "./milli",
    "./second",
    "./minute",
    "./hour",
    "./day",
    "./month",
    "./year",
    "./add"
], function() {
    /**
     * Calcula cuantas unidades de `unit` hay entre `min` y `max`
     *
     * @param {Date} min Fecha inicial
     * @param {Date} max Fecha final
     * @param {String}  unit Tipo de unidad (e.g. DAY, MONTH, YEAR)
     * @return {Number} Numero de unidades
     */
    $.Date.diff = function(min, max, unit) {
        var est, diff = +max - min;
        switch (unit) {
            case $.Date.MILLI:
                return diff;
            case $.Date.SECOND:
                return Math.floor(diff / 1000);
            case $.Date.MINUTE:
                return Math.floor(diff / 60000);
            case $.Date.HOUR:
                return Math.floor(diff / 3600000);
            case $.Date.DAY:
                return Math.floor(diff / 86400000);
            case "w":
                return Math.floor(diff / 604800000);
            case $.Date.MONTH:
                est = (max.getFullYear() * 12 + max.getMonth()) - (min.getFullYear() * 12 + min.getMonth());
                if ($.Date.add(min, unit, est) > max) {
                    return est - 1;
                }
                return est;
            case $.Date.YEAR:
                est = max.getFullYear() - min.getFullYear();
                if ($.Date.add(min, unit, est) > max) {
                    return est - 1;
                } else {
                    return est;
                }
        }
    };
});
