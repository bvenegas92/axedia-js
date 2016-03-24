define([
    './type'
], function($Type) {
    /**
     * Verifica si `value` es numerico y finito. Un `string` como numero es considerado numerico.
     * e.g. '1', '1.2'
     *
     * @param  {Object}  value  Valor a evaluar
     * @return {Boolean}        `true` si es numerico, `false` de lo contrario
     */
    $Type.isNumeric = function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };
});
