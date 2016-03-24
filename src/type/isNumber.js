define([
    './type'
], function($Type) {
    /**
     * Verifica si `value` es de tipo `number` y finito
     *
     * @param  {Object}  value  Valor a evaluar
     * @return {Boolean}        `true` si es numero, `false` de lo contrario
     */
    $Type.isNumber = function(value) {
        return typeof value === 'number' && isFinite(value);
    };
});
