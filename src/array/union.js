define([
    './array',
    './merge'
], function($Array) {
    /*
     * Une multiples arrays en uno solo con elementos unicos
     * `union` es un alias de `merge`
     *
     * @param {Array}  array1  Array numero 1 a unir
     * @param {Array}  array2  Array numero 2 a unir
     * @param {Array}  arrayN  Array numero N a unir
     * @return {Array}         Array unido
     */
    $Array.union = $Array.merge;
});
