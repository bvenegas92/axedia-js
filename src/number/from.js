define([
    './number'
], function($Number) {
    /**
     * Valida que un valor sea numerico y lo convierte si es necesario. Regresa el valor por default en caso contrario.
     *
     * @param {Object}  value         El valor a convertir
     * @param {Number}  defaultValue  El numero default
     * @return {Number}               `value` si es numerico, `defaultValue` de lo contrario
     */
    $Number.from = function(value, defaultValue) {
        if (isFinite(value)) {
            value = parseFloat(value);
        }

        return !isNaN(value) ? value : defaultValue;
    };
});
