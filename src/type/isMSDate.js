define([
    './type',
    './isString'
], function($Type) {
    /**
     * Verifica si `value` es MS Date
     *
     * @param  {Object}  value  Objeto a evaluar
     * @return {Boolean}        `true` si es MS Date, `false` de lo contrario
     */
    $Type.isMSDate = function(value) {
        var MSDateRe = /^\\?\/Date\(([-+])?(\d+)(?:[+-]\d{4})?\)\\?\/$/;
        if (!$Type.isString(value)) {
            return false;
        }
        return MSDateRe.test(value);
    };
});
