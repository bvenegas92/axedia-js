define([
    './array'
], function($Array) {
    /*
     * Crea un map `object` usando como claves los elementos del array y como valor el elemento
     *
     * @param {Array}   array                 Array fuente
     * @param {Mixed}   getKey                Nombre de la propiedad del elemento a usar como clave o funcion
     *                                        para extraer la clave
     * @param {Object}  [scope=array[i]]      Scope en que la funcion es ejecutada (referencia de `this`)
     * @param {Number}  [arrayify]            `1` para crear arrays para todos los elementos o `2` para crear arrays
     *                                        para los elementos que comparten la misma key. Solo aplica cuando `getKey`
     *                                        es proporcionada.
     * @return {Object}                       El map `object`
     */
    $Array.toValueMap = function(array, getKey, scope, arrayify) {
        /**
         * <ExtJS>
         * Creates a map (object) keyed by a property of elements of the given array. The values in
         * the map are the array element. For example:
         *
         *      var map = Ext.Array.toValueMap(['a','b','c']);
         *
         *      // map = { a: 'a', b: 'b', c: 'c' };
         *
         * Or a key property can be specified:
         *
         *      var map = Ext.Array.toValueMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], 'name');
         *
         *      // map = { a: {name: 'a'}, b: {name: 'b'}, c: {name: 'c'} };
         *
         * Lastly, a key extractor can be provided:
         *
         *      var map = Ext.Array.toValueMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], function (obj) { return obj.name.toUpperCase(); });
         *
         *      // map = { A: {name: 'a'}, B: {name: 'b'}, C: {name: 'c'} };
         */
        var map = {},
            i = array.length,
            autoArray, alwaysArray, entry, fn, key, value;

        if (!getKey) {
            while (i--) {
                value = array[i];
                map[value] = value;
            }
        } else {
            if (!(fn = (typeof getKey !== 'string'))) {
                arrayify = scope;
            }

            alwaysArray = arrayify === 1;
            autoArray = arrayify === 2;

            while (i--) {
                value = array[i];
                key = fn ? getKey.call(scope, value) : value[getKey];

                if (alwaysArray) {
                    if (key in map) {
                        map[key].push(value);
                    } else {
                        map[key] = [value];
                    }
                } else if (autoArray && (key in map)) {
                    if ((entry = map[key]) instanceof Array) {
                        entry.push(value);
                    } else {
                        map[key] = [entry, value];
                    }
                } else {
                    map[key] = value;
                }
            }
        }

        return map;
    };
});
