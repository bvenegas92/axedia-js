define([
    "util/Type"
], function(
    Type
) {
/**
 * Clona las propiedades simples de un objeto incluyendo:
 * - Array
 * - {} objetos literales
 * - DOM Nodes
 * - Date
 *
 * @param {Object} item Objeto a clonar
 * @return {Object} Clon del objeto
 */
Object.clone = function(item) {
    if (item === null || item === undefined) {
        return item;
    }

    // DOM nodes
    // TODO proxy this to Ext.Element.clone to handle automatic id attribute changing
    // recursively
    if (item.nodeType && item.cloneNode) {
        return item.cloneNode(true);
    }

    var i, j, k, clone, key;

    // Date
    if (Type.isDate(item)) {
        return new Date(item.getTime());
    }

    // Array
    if (Type.isArray(item)) {
        i = item.length;

        clone = [];

        while (i--) {
            clone[i] = Object.clone(item[i]);
        }
    }
    // Object
    else if (Type.isObject(item) && item.constructor === Object) {
        clone = {};

        for (key in item) {
            clone[key] = Object.clone(item[key]);
        }
    }

    return clone || item;
};

/**
 * Copia todas las propiedades de `src` a `dest`. La copia es una referencia al objeto original
 *
 * @param {Object} dest Objeto destino
 * @param {Object} src Objeto fuente
 * @param {Object} defaults Propiedades default
 * @return {Object} Objeto copiado
 */
Object.copy = function(dest, src, defaults) {
    if (defaults) {
        Object.copy(dest, defaults);
    }

    if (dest && src && typeof src === "object") {
        var i;

        for (i in src) {
            dest[i] = src[i];
        }
    }

    return dest;
};

/**
 * Copia todas las propiedades de `src` a `dest` si no existen en `dest`.
 * La copia es una referencia al objeto original
 *
 * @param {Object} dest Objecto
 * @param {Object} src Propiedades
 * @return {Object} `dest` con las propiedades agregadas
 */
Object.copyIf = function(dest, src) {
    var property;

    if (dest) {
        for (property in src) {
            if (dest[property] === undefined) {
                dest[property] = src[property];
            }
        }
    }

    return dest;
};

/**
 * Iteraciona `object` y ejecuta `fn` por cada una de sus propiedades pudiendo
 * romper la iteracion al regresar `false`.
 *
 * @param {Object} object Objeto a iterar
 * @param {Function} fn Funcion a ejecutar
 * @param {Function} fn.value Valor de la propiedad
 * @param {Function} fn.key Propiedad
 * @param {Function} fn.object El objeto mismo
 * @param {Object} [scope] Scope en que la funcion es ejecutada (referencia de `this`)
 */
Object.each = function(object, fn, scope) {
    var i, property;

    if (object) {
        scope = scope || object;

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                if (fn.call(scope, property, object[property], object) === false) {
                    return;
                }
            }
        }
    }
};

/**
 * Verifica si dos objectos son iguales. Se consideran iguales si ambos objetos tienen las mismas propiedades
 * y los mismos valores.
 *
 * @param {Object} object1 Objeto 1
 * @param {Object} object2 Objeto 2
 * @return {Boolean} `true` si son iguales, `false` de lo contrario
 */
Object.equals = (function(object1, object2) {
    var check = function(o1, o2) {
        var key;

        for (key in o1) {
            if (o1.hasOwnProperty(key)) {
                if (o1[key] !== o2[key]) {
                    return false;
                }
            }
        }
        return true;
    };

    return function(object1, object2) {

        // Short circuit if the same object is passed twice
        if (object1 === object2) {
            return true;
        } if (object1 && object2) {
            // Do the second check because we could have extra keys in
            // object2 that don't exist in object1.
            return check(object1, object2) && check(object2, object1);
        } else if (!object1 && !object2) {
            return object1 === object2;
        } else {
            return false;
        }
    };
})();

/**
 * Obtiene todos los nombres de las propiedades del objecto.
 *
 * @param {Object} object Objeto
 * @return {Array} Array de nombres de  las propiedades
 */
Object.getAllKeys = function(object) {
    var keys = [],
        property;

    for (property in object) {
        keys.push(property);
    }

    return keys;
};

/**
 * Obtiene todos los nombres de las propiedades del objecto. No incluye las propiedades heredadas de su
 * cadena de prototipos.
 *
 * @param {Object} object Objeto
 * @return {Array} Array de nombres de  las propiedades
 */
Object.getKeys = function(object) {
    return Object.keys(object);
};

/**
 * Obtiene la primera propiedad que su valor sea `value`
 *
 * @param  {Object} object
 * @param  {Object} value  Valor a buscar
 * @return {?String} Nombre de la propiedad
 */
Object.getKey = function(object, value) {
    for (var property in object) {
        if (object.hasOwnProperty(property) && object[property] === value) {
            return property;
        }
    }

    return null;
};

/**
 * Obtiene todos los valores de las propiedades propias del objeto
 *
 * @param  {Object} object  Objeto
 * @return {Array}         Array de valores
 */
Object.getValues = function(object) {
    var values = [],
        property;

    for (property in object) {
        if (object.hasOwnProperty(property)) {
            values.push(object[property]);
        }
    }

    return values;
};

/**
 * Une cualquier cantidad de objetos de manera recursiva sin que estos se referencien
 *
 * @param {Object} destination Objeto destino
 * @param {...Object} object Objetos a unir
 * @return {Object} Objeto resultante
 */
Object.merge = function(destination) {
    var i = 1,
        ln = arguments.length,
        mergeFn = Object.merge,
        cloneFn = Object.clone,
        object, key, value, sourceKey;

    for (; i < ln; i++) {
        object = arguments[i];

        for (key in object) {
            value = object[key];
            if (value && value.constructor === Object) {
                sourceKey = destination[key];
                if (sourceKey && sourceKey.constructor === Object) {
                    mergeFn(sourceKey, value);
                } else {
                    destination[key] = cloneFn(value);
                }
            } else {
                destination[key] = value;
            }
        }
    }

    return destination;
};

return Object;

});
