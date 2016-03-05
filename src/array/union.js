define([
    './array',
    './merge'
], function($Array) {
    /**
     * Une multiples arrays en uno solo con elementos unicos
     * `union` es un alias de `merge`
     *
     * @param {...Array}  array  Arrays a unir
     * @return {Array}           Array unido
     */
    $Array.union = $Array.merge;
});
