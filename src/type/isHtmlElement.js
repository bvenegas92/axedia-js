define([
    "./type"
], function() {
    /**
     * Verifica si `value` es una instancia de `HTMLElement`
     *
     * @param {Object} value  Valor a evaluar
     * @return {Boolean} `true` si es `HTMLElement`, `false` de lo contrario
     */
    $.Type.isHtmlElement = function(value) {
        return value ? value.nodeType === 1 : false;
    };
});
