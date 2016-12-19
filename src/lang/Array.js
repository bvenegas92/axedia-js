define([
    "../util/Type"
], function(Type) {
/**
 * Remueve los elementos vacios en el array de acuerdo a `Type.isEmpty`
 *
 * @param {Array} arr
 * @return {Array}
 */
Array.clean = function(arr) {
    var results = [],
        i = 0,
        ln = arr.length,
        item;

    for (; i < ln; i++) {
        item = arr[i];

        if (!Type.isEmpty(item)) {
            results.push(item);
        }
    }

    return results;
};

/**
 * Clona un array plano (solo el primer nivel) sin referenciar al original.
 * Es solo una forma simple para Array.prototype.slice.call(array)
 *
 * @param {Array} arr
 * @return {Array}
 */
Array.clone = function(arr) {
    return arr.slice();
};

/**
 * Verifica si un elemento se encuentra en el array proporcionado.
 *
 * @param {Array} arr
 * @param {Object} item Elemento a buscar
 * @return {Boolean}
 */
Array.contains = function(arr, item) {
    return arr.indexOf(item) !== -1;
};

/**
 * Remplaza elementos del array
 *
 * @param {Array} arr
 * @param {Array} index Índice en el cual efectuar la operación
 * @param {Array} removeCount El numero de elementos a eliminar en el índice
 * @param {Array} insert Array de elementos a insertar en el indice
 * @return {Array} Array proporcionado
 */
Array.replace = function(arr, index, removeCount, insert) {
    if (insert && insert.length) {
        if (index === 0 && !removeCount) {
            arr.unshift.apply(arr, insert);
        } else if (index < arr.length) {
            arr.splice.apply(arr, [index, removeCount].concat(insert));
        } else {
            arr.push.apply(arr, insert);
        }
    } else {
        arr.splice(index, removeCount);
    }
    return arr;
};

/**
 * Remueve elementos del array
 *
 * @param {Array} arr
 * @param {Number} index Índice en el cual efectuar la operación
 * @param {Number} removeCount El numero de elementos a eliminar en el índice
 * @return {Array} Array proporcionado
 */
Array.erase = function(arr, index, removeCount) {
    arr.splice(index, removeCount);
    return arr;
};

/**
 * Realiza una diferencia entre los elementos de ambos arrays substrayendo
 * los elementos de `arrayB` existentes en `arrayA`
 *
 * @param {Array} arrayA
 * @param {Array} arrayB
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
 * @param {Array} arr
 * @param {Function} fn Funcion a ejecutar
 * @param {Object} fn.item Elemento del array
 * @param {Number} fn.index Indice del elemento
 * @param {Array} fn.array El array mismo
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 * @param {Boolean} [reverse] Iterar el array en reversa
 */
Array.each = function(arr, fn, scope, reverse) {
    var ln = arr.length,
        i;

    if (reverse !== true) {
        for (i = 0; i < ln; i++) {
            if (fn.call(scope || arr[i], arr[i], i, arr) === false) {
                return;
            }
        }
    } else {
        for (i = ln - 1; i > -1; i--) {
            if (fn.call(scope || arr[i], arr[i], i, arr) === false) {
                return;
            }
        }
    }
};

/**
 * Recorre un array o valor iterable y ejecuta la funcion proporcionada por cada elemento
 * regresando el primer elemento cuya ejecucion de `fn` retorne `true`.
 *
 * @param {Array} arr
 * @param {Function} fn Funcion a ejecutar
 * @param {Object} fn.item Elemento del array
 * @param {Number} fn.index Indice del elemento
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 * @return {?Object} `item` en caso de encontrarlo, `null` de lo contrario
 */
Array.findBy = function(arr, fn, scope) {
    var i = 0,
        len = arr.length;

    for (; i < len; i++) {
        if (fn.call(scope || arr, arr[i], i)) {
            return arr[i];
        }
    }
    return null;
};

/**
 * Recorre un array o valor iterable y ejecuta la funcion proporcionada por cada elemento
 * regresando el indice del primer elemento cuya ejecucion de `fn` retorne `true`.
 *
 * @param {Array} arr
 * @param {Function} fn Funcion a ejecutar
 * @param {Object} fn.item Elemento del array
 * @param {Number} fn.index Indice del elemento
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 * @return {Number} El indice del elemento o -1 en caso de no encontrarlo
 */
Array.indexBy = function(arr, fn, scope) {
    var i = 0,
        len = arr.length;

    for (; i < len; i++) {
        if (fn.call(scope || arr, arr[i], i)) {
            return i;
        }
    }
    return -1;
};

/**
 * Agrega un elemento al array si aun no existe en este
 *
 * @param {Array} arr
 * @param {Object} item Elemento a incluir
 */
Array.include = function(arr, item) {
    if (!Array.contains(arr, item)) {
        arr.push(item);
    }
};

/**
 * Agrega elementos a un array
 *
 * @param {Array} arr
 * @param {Number} index Indice en cual incluir
 * @param {Array} items Array de elementos a incluir
 * @return {Array} Array con elementos incluidos
 */
Array.insert = function(arr, index, items) {
    return Array.replace(arr, index, 0, items);
};

/**
 * Retorna un nuevo array con elementos unicos
 *
 * @param {Array} arr
 * @return {Array}
 */
Array.unique = function(arr) {
    var clone = [],
        i = 0,
        ln = arr.length,
        item;

    for (; i < ln; i++) {
        item = arr[i];

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
 * Retorna el valor maximo en el array de acuerdo a la funcion de comparacion proporcionada.
 * En caso de no proporcionar una funcion, se devolvera el valor con mayor valor numerico.
 *
 * @param {Array} arr
 * @param {Function} [comparisonFn] Funcion a ejecutar que determina el valor maximo
 * @param {Object} comparisonFn.max Valor maximo actual
 * @param {Object} comparisonFn.item Elemento con el cual comparar contra el maximo actual
 * @return {Object} Valor maximo
 */
Array.maxBy = function(arr, comparisonFn) {
    var max = arr[0],
        i, ln, item;

    for (i = 0, ln = arr.length; i < ln; i++) {
        item = arr[i];

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
 * Retorna el valor minimo en el array de acuerdo a la funcion de comparacion proporcionada.
 * En caso de no proporcionar una funcion, se devolvera el valor con menor valor numerico.
 *
 * @param {Array} arr
 * @param {Function} [comparisonFn] Funcion a ejecutar que determina el valor minimo
 * @param {Object} comparisonFn.min Valor minimo actual
 * @param {Object} comparisonFn.item Elemento con el cual comparar contra el minimo actual
 * @return {Object} Valor minimo
 */
Array.minBy = function(arr, comparisonFn) {
    var min = arr[0],
        i, ln, item;

    for (i = 0, ln = arr.length; i < ln; i++) {
        item = arr[i];

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
 * Calcula la suma de los elementos.
 * Solo funciona correctamente con valores numericos.
 *
 * @param {Array} arr
 * @return {Number} Suma
 */
Array.sum = function(arr) {
    var sum = 0,
        i, ln, item;

    if (!arr.every(function(i) { return typeof i === "number";})) {
        return NaN;
    }

    for (i = 0,ln = arr.length; i < ln; i++) {
        item = arr[i];

        sum += item;
    }

    return sum;
};

/**
 * Obtiene el promedio de los elementos.
 * Solo funciona correctamente con valores numericos.
 *
 * @param {Array} arr
 * @return {Number} Promedio
 */
Array.mean = function(arr) {
    if (!arr.every(function(i) { return typeof i === "number";})) {
        return NaN;
    }
    return arr.length > 0 ? Array.sum(arr) / arr.length : NaN;
};

/**
 * Une multiples arrays en uno solo con elementos unicos
 *
 * @param {...Array} arr Arrays a unir
 * @return {Array} Array unido
 */
Array.merge = function() {
    var args = Array.prototype.slice.call(arguments),
        arr = [],
        i, ln;

    for (i = 0, ln = args.length; i < ln; i++) {
        arr = arr.concat(args[i]);
    }

    return Array.unique(arr);
};

/**
 * Toma el valor de una propiedad de cada elemento en el array y arma un nuevo
 * array con estos valores.
 *
 * @param {Array} arr
 * @param {String} propertyName Propiedad a tomar
 * @return {Array} Array con los valores de las propiedades
 */
Array.pluck = function(arr, propertyName) {
    var ret = [],
        i, ln, item;

    for (i = 0, ln = arr.length; i < ln; i++) {
        item = arr[i];

        ret.push(item[propertyName]);
    }

    return ret;
};

/**
 * Remueve elementos del array
 *
 * @param {Array} arr
 * @param {Object} item Índice en el cual efectuar la operación
 * @return {Array} Array proporcionado
 */
Array.remove = function(arr, item) {
    var index = arr.indexOf(item);

    if (index !== -1) {
        Array.erase(arr, index, 1);
    }

    return arr;
};

/**
 * Remueve elementos del array en el indice especifico
 *
 * @param {Array} arr
 * @param {Number} index Índice en el cual efectuar la operación
 * @param {Number} count El numero de elementos a eliminar en el índice
 * @return {Array} Array proporcionado
 */
Array.removeAt = function(arr, index, count) {
    var len = arr.length;

    if (index >= 0 && index < len) {
        count = count || 1;
        count = Math.min(count, len - index);
        Array.erase(arr, index, count);
    }
    return arr;
};
});
