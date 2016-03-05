define([
    './array',
    '../type/isArray'
], function($Array, $Type) {
    /**
     * "Aplana" de manera recursiva en un array de una dimensión.
     *
     * @param {Array}   array     Array a aplanar
     * @return {Array}            Array de una dimension
     */
    $Array.flatten = function(array) {
        var worker = [];

        function rFlatten(a) {
            var i, ln, v;

            for (i = 0, ln = a.length; i < ln; i++) {
                v = a[i];

                if ($Type.isArray(v)) {
                    rFlatten(v);
                } else {
                    worker.push(v);
                }
            }

            return worker;
        }

        return rFlatten(array);
    };
});
