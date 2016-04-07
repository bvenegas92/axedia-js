define([
    './type',
    './isString',
    '../regExp/msDate'
], function($Type, $RegExp) {
    /**
     * Verifica si `value` es MS Date
     *
     * @param  {Object}  value  Objeto a evaluar
     * @return {Boolean}        `true` si es MS Date, `false` de lo contrario
     */
    $Type.isMSDate = function(value) {
        if (!$Type.isString(value)) {
            return false;
        }
        return $RegExp.MSDATE.test(value);
    };
});
