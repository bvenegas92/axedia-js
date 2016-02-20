define([
    './core'
], function($Array, arrayPrototype, slice) {
    // Array Namespace
    $Array = {
        /*
         * Recorre un arreglo o valor iterable y ejecuta la funcion dada por cada elemento
         * pudiendo romper la iteracion al regresar `false`
         *
         * @param {Array} array             Arreglo a recorrer
         * @param {Function} fn             Funcion a ejecutar que recibe los parametros
         *                                      item:  elemento del array,
         *                                      index: indice del elemento,
         *                                      array: el array propio
         * @param {Object} [scope=array[i]] Scope en que la funcion es ejecutada (referencia de `this`)
         * @param {Boolean} [reverse=false] Iterar el arreglo en reversa
         * @return {Boolean}                Booleano `true`
         */
        each: function(array, fn, scope, reverse) {
            var i,
            ln = array.length;

            if (reverse !== true) {
                for (i = 0; i < ln; i++) {
                    if (fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            } else {
                for (i = ln - 1; i > -1; i--) {
                    if (fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }

            return true;
        },
        indexOf: ('indexOf' in arrayPrototype) ? function(array, item, from) {
            return arrayPrototype.indexOf.call(array, item, from);
        } : function(array, item, from) {
            var i, length = array.length;

            for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
                if (array[i] === item) {
                    return i;
                }
            }

            return -1;
        },
        map: ('map' in arrayPrototype) ? function(array, fn, scope) {
            return array.map(fn, scope);
        } : function(array, fn, scope) {
            var results = [],
                i = 0,
                len = array.length;

            for (; i < len; i++) {
                results[i] = fn.call(scope, array[i], i, array);
            }

            return results;
        },
        merge: function() {
            var args = slice.call(arguments),
                array = [],
                i, ln;

            for (i = 0, ln = args.length; i < ln; i++) {
                array = array.concat(args[i]);
            }

            return $Array.unique(array);
        },
        slice: ([1,2].slice(1, undefined).length ?
            function(array, begin, end) {
                return slice.call(array, begin, end);
            } :
            function(array, begin, end) {
                // see http://jsperf.com/slice-fix
                if (typeof begin === 'undefined') {
                    return slice.call(array);
                }
                if (typeof end === 'undefined') {
                    return slice.call(array, begin);
                }
                return slice.call(array, begin, end);
            }
        ),
        unique: function(array) {
            var clone = [],
                i = 0,
                ln = array.length,
                item;

            for (; i < ln; i++) {
                item = array[i];

                if ($Array.indexOf(clone, item) === -1) {
                    clone.push(item);
                }
            }

            return clone;
        }
    };
});
