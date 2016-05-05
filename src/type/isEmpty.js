define([
    "./type",
    "./isArray"
], function() {
    /**
     * Verifica si `value` es vacio. Se considera vacio los siguientes casos:
     *
     * - `null`
     * - `undefined`
     * - [] (arreglo con cero elementos)
     * - "" (string vacio, a menos que el parametro `allowEmptyString` sea `true`)
     *
     * @param {Object} value Objeto a evaluar
     * @param {Boolean} [allowEmptyString=false] Permitir string vacios
     * @return {Boolean} `true` si es vacio, `false` de lo contrario.
     */
    $.Type.isEmpty = function(value, allowEmptyString) {
        return (value == null) ||
            (!allowEmptyString ? value === "" : false) ||
            ($.Type.isArray(value) && value.length === 0);
    };
});
