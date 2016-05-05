define([
    "./type"
], function() {
    /**
     * Verifica si `value` es una instancia de `TextNode`
     *
     * @param {Object} value Valor a evaluar
     * @return {Boolean} `true` si es `TextNode`, `false` de lo contrario
     */
    $.Type.isTextNode = function(value) {
        return value ? value.nodeName === "#text" : false;
    };
});
