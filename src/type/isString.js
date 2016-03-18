define([
    './type'
], function($Type) {
    /**
     * Verifica si `value` es un string
     *
     * @param  {Object}  value  Objeto a evaluar
     * @return {Boolean}        `true` si es string, `false` de lo contrario
     */
    $Type.isString = function(value) {
        return typeof value === 'string';
    };
});
