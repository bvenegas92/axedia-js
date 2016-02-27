define([
    './array',
    './slice',
    './unique'
], function($Array) {
    /*
     * Une multiples arreglos en uno solo con elementos unicos
     *
     * @param {Array}  array1  Arreglo numero 1 a unir
     * @param {Array}  array2  Arreglo numero 2 a unir
     * @param {Array}  arrayN  Arreglo numero N a unir
     * @return {Array}         Arreglo unido
     */
    $Array.merge = function() {
        var args = $Array.slice(arguments),
            array = [],
            i, ln;

        for (i = 0, ln = args.length; i < ln; i++) {
            array = array.concat(args[i]);
        }

        return $Array.unique(array);
    };
});
