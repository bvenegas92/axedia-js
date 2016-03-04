define([
    './array'
], function($Array) {
    /*
     * Crea un map `object` usando como claves los elementos del array y como valor el indice + 1 del elemento
     *
     * @param {Array}   array             Array fuente
     * @param {Mixed}   getKey            Nombre de la propiedad del elemento a usar como clave o funcion
     *                                    para extraer la clave
     * @param {Object}  [scope=array[i]]  Scope en que la funcion es ejecutada (referencia de `this`)
     * @return {Object}                   El map `object`
     */
    $Array.toMap = function(array, getKey, scope) {
        /*
         * <ExtJS>
         * Creates a map (object) keyed by the elements of the given array. The values in
         * the map are the index+1 of the array element. For example:
         *
         *      var map = Ext.Array.toMap(['a','b','c']);
         *
         *      // map = { a: 1, b: 2, c: 3 };
         *
         * Or a key property can be specified:
         *
         *      var map = Ext.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], 'name');
         *
         *      // map = { a: 1, b: 2, c: 3 };
         *
         * Lastly, a key extractor can be provided:
         *
         *      var map = Ext.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], function (obj) { return obj.name.toUpperCase(); });
         *
         *      // map = { A: 1, B: 2, C: 3 };
         */
        var map = {},
            i = array.length;

        if (!getKey) {
            while (i--) {
                map[array[i]] = i + 1;
            }
        } else if (typeof getKey === 'string') {
            while (i--) {
                map[array[i][getKey]] = i + 1;
            }
        } else {
            while (i--) {
                map[getKey.call(scope, array[i])] = i + 1;
            }
        }

        return map;
    };
});
