define([
    "util/Type"
], function(
    Type
) {
/**
 * Remueve los elementos vacios en el array de acuerdo a `Type.isEmpty`
 *
 * @param {Array} array Array a filtrar
 * @return {Array} Array sin elementos vacios
 */
Array.clean = function(array) {
    var results = [],
        i = 0,
        ln = array.length,
        item;

    for (; i < ln; i++) {
        item = array[i];

        if (!Type.isEmpty(item)) {
            results.push(item);
        }
    }

    return results;
};

/**
 * Clona un array plano (solo el primer nivel) sin referenciar al original.
 * Es solo una forma simple para
 * Array.prototype.slice.call(array)
 *
 * @param {Array} array Array a clonar
 * @return {Array} Array clonado
 */
Array.clone = function(array) {
    return array.slice();
};

/**
 * Verifica si un elemento se encuentra en el array proporcionado.
 *
 * @param {Array} array Array en cual buscar
 * @param {Object} item Elemento a buscar
 * @return {Boolean} `true` si se encuentra, `false` de lo contrario.
 */
Array.contains = function(array, item) {
    return array.indexOf(item) !== -1;
};

/**
 * Remueve elementos del array
 *
 * @param {Array} array Array
 * @param {Array} index Índice en el cual efectuar la operación
 * @param {Array} removeCount El numero de elementos a eliminar en el índice
 * @param {Array} insert Array de elementos a insertar en el indice
 * @return {Array} Array proporcionado
 */
Array.replace = function(array, index, removeCount, insert) {
    if (insert && insert.length) {
        if (index === 0 && !removeCount) {
            array.unshift.apply(array, insert);
        } else if (index < array.length) {
            array.splice.apply(array, [index, removeCount].concat(insert));
        } else {
            array.push.apply(array, insert);
        }
    } else {
        array.splice(index, removeCount);
    }
    return array;
};

/**
 * Remueve elementos del array
 *
 * @param {Array} array Array
 * @param {Number} index Índice en el cual efectuar la operación
 * @param {Number} removeCount El numero de elementos a eliminar en el índice
 * @return {Array} Array proporcionado
 */
Array.erase = function(array, index, removeCount) {
    array.splice(index, removeCount);
    return array;
};

/**
 * Realiza una diferencia entre los elementos de ambos arrays substrayendo
 * los elementos de `arrayB` existentes en `arrayA`
 *
 * @param {Array} arrayA Array A
 * @param {Array} arrayB Array B
 * @return {Array} Array con las diferencias
 */
Array.difference = function(arrayA, arrayB) {
    var clone = arrayA.slice(),
        ln = clone.length,
        i, j, lnB;

    for (i = 0,lnB = arrayB.length; i < lnB; i++) {
        for (j = 0; j < ln; j++) {
            if (clone[j] === arrayB[i]) {
                Array.erase(clone, j, 1);
                j--;
                ln--;
            }
        }
    }

    return clone;
};

/**
 * Recorre un array o valor iterable y ejecuta la funcion proporcionada por cada elemento
 * pudiendo romper la iteracion al regresar `false`.
 *
 * @param {Array} array Array a recorrer
 * @param {Function} fn Funcion a ejecutar
 * @param {Object} fn.item Elemento del array
 * @param {Number} fn.index Indice del elemento
 * @param {Array} fn.array El array mismo
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 * @param {Boolean} [reverse] Iterar el array en reversa
 * @return {Boolean} `true` en caso de no detener el ciclo, `index` de lo contrario
 */
Array.each = function(array, fn, scope, reverse) {
    var ln = array.length,
        i;

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
};

/**
 * Recorre un array o valor iterable y ejecuta la funcion proporcionada por cada elemento
 * regresando el primer elemento cuya ejecucion de `fn` retorne `true`.
 *
 * @param {Array} array Array a recorrer
 * @param {Function} fn Funcion a ejecutar
 * @param {Object} fn.item Elemento del array
 * @param {Number} fn.index Indice del elemento
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 * @return {?Object} `item` en caso de encontrarlo, `null` de lo contrario
 */
Array.findBy = function(array, fn, scope) {
    var i = 0,
        len = array.length;

    for (; i < len; i++) {
        if (fn.call(scope || array, array[i], i)) {
            return array[i];
        }
    }
    return null;
};

/**
 * Recorre un array o valor iterable y ejecuta la funcion proporcionada por cada elemento
 * regresando el indice del primer elemento cuya ejecucion de `fn` retorne `true`.
 *
 * @param {Array} array Array a recorrer
 * @param {Function} fn Funcion a ejecutar
 * @param {Object} fn.item Elemento del array
 * @param {Number} fn.index Indice del elemento
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 * @return {Number} El indice del elemento o -1 en caso de no encontrarlo
 */
Array.indexBy = function(array, fn, scope) {
    var i = 0,
        len = array.length;

    for (; i < len; i++) {
        if (fn.call(scope || array, array[i], i)) {
            return i;
        }
    }
    return -1;
};

/**
 * Convierte cualquier objeto iterable en array
 *
 * @param {Object} iterable Valor a convertir
 * @param {Number} start Indice del cual empezar
 * @param {Number} end Indice del cual terminar
 * @return {Array} Array con el valor
 */
Array.toArray = function(iterable, start, end) {
    if (!iterable || !iterable.length) {
        return [];
    }

    if (typeof iterable === "string") {
        iterable = iterable.split("");
    }

    var array = [],
        i;

    start = start || 0;
    end = end ? ((end < 0) ? iterable.length + end : end) : iterable.length;

    for (i = start; i < end; i++) {
        array.push(iterable[i]);
    }

    return array;
};

/**
 * Convierte un valor a array, en caso de que no lo sea.
 * Retorna:
 * - un array vacio `[]` si el valor es `null` o `undefined`
 * - el mismo, si el valor ya es un array
 * - Una copia en forma de array si el valor es un objeto iterable (arguments, NodeList, etc)
 * - Un array de un elemento el cual es el valor dado
 *
 * @param {Object} value Valor a convertir
 * @param {Boolean} newReference Si el array debe ser clon con una nueva referencia
 * @return {Array} Array con el valor
 */
Array.from = function(value, newReference) {
    if (value === undefined || value === null) {
        return [];
    }

    if (Type.isArray(value)) {
        return (newReference) ? value.slice(value) : value;
    }

    var type = typeof value;
    // <ExtJS>
    // Both strings and functions will have a length property. In phantomJS, NodeList
    // instances report typeof=="function" but don"t have an apply method...
    if (value && value.length !== undefined && type !== "string" && (type !== "function" || !value.apply)) {
        return Array.toArray(value);
    }

    return [value];
};

/**
 * Agrega un elemento al array si aun no existe en este
 *
 * @param {Array} array Array en cual incluir
 * @param {Object} item Elemento a incluir
 */
Array.include = function(array, item) {
    if (!Array.contains(array, item)) {
        array.push(item);
    }
};

/**
 * Agrega elementos a un array
 *
 * @param {Array} array Array en cual incluir
 * @param {Number} index Indice en cual incluir
 * @param {Array} items Array a incluir
 * @return {Array} Array con elementos incluidos
 */
Array.insert = function(array, index, items) {
    return Array.replace(array, index, 0, items);
};

/**
 * Retorna un nuevo array con elementos unicos
 *
 * @param {Array} array Array a copiar
 * @return {Array} Array con elementos únicos
 */
Array.unique = function(array) {
    var clone = [],
        i = 0,
        ln = array.length,
        item;

    for (; i < ln; i++) {
        item = array[i];

        if (clone.indexOf(item) === -1) {
            clone.push(item);
        }
    }

    return clone;
};

/**
 * Une multiples arrays en uno solo con elementos unicos que existen en todos los arrays proporcionados
 *
 * @param {...Array} array Arrays a intersectar
 * @return {Array} Array interseccion
 */
Array.intersect = function() {
    var intersection = [],
        arrays = Array.prototype.slice.call(arguments),
        arraysLength,
        array,
        arrayLength,
        minArray,
        minArrayIndex,
        minArrayCandidate,
        minArrayLength,
        element,
        elementCandidate,
        elementCount,
        i, j, k;

    if (!arrays.length) {
        return intersection;
    }

    // Find the smallest array
    arraysLength = arrays.length;
    for (i = minArrayIndex = 0; i < arraysLength; i++) {
        minArrayCandidate = arrays[i];
        if (!minArray || minArrayCandidate.length < minArray.length) {
            minArray = minArrayCandidate;
            minArrayIndex = i;
        }
    }

    minArray = Array.unique(minArray);
    Array.erase(arrays, minArrayIndex, 1);

    // <ExtJS>
    // Use the smallest unique"d array as the anchor loop. If the other array(s) do contain
    // an item in the small array, we"re likely to find it before reaching the end
    // of the inner loop and can terminate the search early.
    minArrayLength = minArray.length;
    arraysLength = arrays.length;
    for (i = 0; i < minArrayLength; i++) {
        element = minArray[i];
        elementCount = 0;

        for (j = 0; j < arraysLength; j++) {
            array = arrays[j];
            arrayLength = array.length;
            for (k = 0; k < arrayLength; k++) {
                elementCandidate = array[k];
                if (element === elementCandidate) {
                    elementCount++;
                    break;
                }
            }
        }

        if (elementCount === arraysLength) {
            intersection.push(element);
        }
    }

    return intersection;
};

/**
 * Retorna el valor maximo en el array
 *
 * @param {Array} array Array en cual buscar
 * @param {Function} [comparisonFn] Funcion a ejecutar que determina el valor maximo
 * @param {Object} comparisonFn.max Valor maximo actual
 * @param {Object} comparisonFn.item Elemento con el cual comparar contra el maximo actual
 * @return {Object} Valor maximo
 */
Array.max = function(array, comparisonFn) {
    var max = array[0],
        i, ln, item;

    for (i = 0, ln = array.length; i < ln; i++) {
        item = array[i];

        if (comparisonFn) {
            if (comparisonFn(max, item) === -1) {
                max = item;
            }
        } else {
            if (item > max) {
                max = item;
            }
        }
    }

    return max;
};

/**
 * Calcula la suma de los elementos
 *
 * @param {Array} array Array a calcular
 * @return {Number} Suma
 */
Array.sum = function(array) {
    var sum = 0,
        i, ln, item;

    for (i = 0,ln = array.length; i < ln; i++) {
        item = array[i];

        sum += item;
    }

    return sum;
};

/**
 * Obtiene el promedio de los elementos
 *
 * @param {Array} array Array a calcular
 * @return {Number} Promedio
 */
Array.mean = function(array) {
    return array.length > 0 ? Array.sum(array) / array.length : undefined;
};

/**
 * Une multiples arrays en uno solo con elementos unicos
 *
 * @param {...Array} array Arrays a unir
 * @return {Array} Array unido
 */
Array.merge = function() {
    var args = Array.prototype.slice.call(arguments),
        array = [],
        i, ln;

    for (i = 0, ln = args.length; i < ln; i++) {
        array = array.concat(args[i]);
    }

    return Array.unique(array);
};

/**
 * Retorna el valor minimo en el array
 *
 * @param {Array} array Array en cual buscar
 * @param {Function} [comparisonFn] Funcion a ejecutar que determina el valor minimo
 * @param {Object} comparisonFn.min Valor minimo actual
 * @param {Object} comparisonFn.item Elemento con el cual comparar contra el minimo actual
 * @return {Object} Valor minimo
 */
Array.min = function(array, comparisonFn) {
    var min = array[0],
        i, ln, item;

    for (i = 0, ln = array.length; i < ln; i++) {
        item = array[i];

        if (comparisonFn) {
            if (comparisonFn(min, item) === 1) {
                min = item;
            }
        } else {
            if (item < min) {
                min = item;
            }
        }
    }

    return min;
};

/**
 * Toma el valor de una propiedad de cada elemento en el array y arma un nuevo
 * array con estos valores.
 *
 * @param {Array} array Array a iterar
 * @param {String} propertyName Propiedad a tomar
 * @return {Array} Array con los valores de las propiedades
 */
Array.pluck = function(array, propertyName) {
    var ret = [],
        i, ln, item;

    for (i = 0, ln = array.length; i < ln; i++) {
        item = array[i];

        ret.push(item[propertyName]);
    }

    return ret;
};

/**
 * Remueve elementos del array
 *
 * @param {Array} array Array
 * @param {Object} item Índice en el cual efectuar la operación
 * @return {Array} Array proporcionado
 */
Array.remove = function(array, item) {
    var index = array.indexOf(item);

    if (index !== -1) {
        Array.erase(array, index, 1);
    }

    return array;
};

/**
 * Remueve elementos del array en el indice especifico
 *
 * @param {Array} array Array
 * @param {Number} index Índice en el cual efectuar la operación
 * @param {Number} count El numero de elementos a eliminar en el índice
 * @return {Array} Array proporcionado
 */
Array.removeAt = function(array, index, count) {
    var len = array.length;

    if (index >= 0 && index < len) {
        count = count || 1;
        count = Math.min(count, len - index);
        Array.erase(array, index, count);
    }
    return array;
};

/**
 * Crea un map `object` usando como claves los elementos del array y como valor el indice + 1 del elemento
 *
 * @param {Array} array Array fuente
 * @param {String|Function} getKey Nombre de la propiedad del elemento a usar como clave o funcion
 *                                 para extraer la clave
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 * @return {Object} El map `object`
 */
Array.toMap = function(array, getKey, scope) {
    /*
     * Creates a map (object) keyed by the elements of the given array. The values in
     * the map are the index+1 of the array element. For example:
     *
     *      var map = Ext.Array.toMap(["a","b","c"]);
     *
     *      // map = { a: 1, b: 2, c: 3 };
     *
     * Or a key property can be specified:
     *
     *      var map = Ext.Array.toMap([
     *              { name: "a" },
     *              { name: "b" },
     *              { name: "c" }
     *          ], "name");
     *
     *      // map = { a: 1, b: 2, c: 3 };
     *
     * Lastly, a key extractor can be provided:
     *
     *      var map = Ext.Array.toMap([
     *              { name: "a" },
     *              { name: "b" },
     *              { name: "c" }
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
    } else if (typeof getKey === "string") {
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

/**
 * Crea un map `object` usando como claves los elementos del array y como valor el elemento
 *
 * @param {Array} array Array fuente
 * @param {String|Function} getKey Nombre de la propiedad del elemento a usar como clave o funcion
 *                                 para extraer la clave
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 * @param {Number} [arrayify] `1` para crear arrays para todos los elementos
 *                            `2` para crear arrays para los elementos que comparten la misma key.
 *                                Solo aplica cuando `getKey` es proporcionada.
 * @return {Object} El map `object`
 */
Array.toValueMap = function(array, getKey, scope, arrayify) {
    /**
     * <ExtJS>
     * Creates a map (object) keyed by a property of elements of the given array. The values in
     * the map are the array element. For example:
     *
     *      var map = Ext.Array.toValueMap(["a","b","c"]);
     *
     *      // map = { a: "a", b: "b", c: "c" };
     *
     * Or a key property can be specified:
     *
     *      var map = Ext.Array.toValueMap([
     *              { name: "a" },
     *              { name: "b" },
     *              { name: "c" }
     *          ], "name");
     *
     *      // map = { a: {name: "a"}, b: {name: "b"}, c: {name: "c"} };
     *
     * Lastly, a key extractor can be provided:
     *
     *      var map = Ext.Array.toValueMap([
     *              { name: "a" },
     *              { name: "b" },
     *              { name: "c" }
     *          ], function (obj) { return obj.name.toUpperCase(); });
     *
     *      // map = { A: {name: "a"}, B: {name: "b"}, C: {name: "c"} };
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
        if (!(fn = (typeof getKey !== "string"))) {
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

return Array;

});
