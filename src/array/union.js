define([
    "./array",
    "./merge"
], function() {
    /**
     * Une multiples arrays en uno solo con elementos unicos
     * `union` es un alias de `merge`
     */
    $.Array.union = $.Array.merge;
});
