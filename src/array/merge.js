define([
    './array',
    './slice',
    './unique'
], function($Array) {
    /**
     * Une multiples arrays en uno solo con elementos unicos
     *
     * @param {...Array}  array  Arrays a unir
     * @return {Array}            Array unido
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
