define([
], function(
) {
/**
 * Crea el singleton `Type`
 *
 * @type {Object}
 */
var Type = {};

/**
 * Verifica si `value` es un array de JavaScript
 *
 * @param {Object} value Objeto a evaluar
 * @return {Boolean} `true` si es array, `false` de lo contrario.
 */
Type.isArray = function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
};

/**
 * Verifica si `value` es boolean
 *
 * @param {Object} value Objeto a evaluar
 * @return {Boolean} `true` si es boolean, `false` de lo contrario
 */
Type.isBoolean = function(value) {
    return typeof value === "boolean";
};

/**
 * Verifica si `value` es una instancia de `Date`
 *
 * @param {Object} value Objeto a evaluar
 * @return {Boolean} `true` si es una instancia de `Date`, `false` de lo contrario
 */
Type.isDate = function(value) {
    return Object.prototype.toString.call(value) === "[object Date]";
};

/**
 * Verifica si `value` esta definido
 *
 * @param {Object} value Valor a evaluar
 * @return {Boolean} `true` si esta definido, `false` de lo contrario
 */
Type.isDefined = function(value) {
    return typeof value !== "undefined";
};

/**
 * Verifica si `value`esta definida y no es `null`
 *
 * @param  {Object} value
 * @return {Boolean}
 */
Type.isSet = function(value) {
    return typeof value !== "undefined" && value !== null;
};

/**
 * Verifica si `value` es vacio. Se considera vacio los siguientes casos:
 *
 * - `null`
 * - `undefined`
 * - [] (arreglo con cero elementos)
 * - "" (string vacio, a menos que el parametro `allowEmptyString` sea `true`)
 *
 * @param {Object} value Objeto a evaluar
 * @param {Boolean} [allowEmptyString=false] Permitir string vacios
 * @return {Boolean} `true` si es vacio, `false` de lo contrario.
 */
Type.isEmpty = function(value, allowEmptyString) {
    return (value == null) ||
        (!allowEmptyString ? value === "" : false) ||
        (Type.isArray(value) && value.length === 0);
};

/**
 * Verifica si `value` es una funcion de JavaScript
 *
 * @param {Object} value Objeto a evaluar
 * @return {Boolean} `true` si es funcion, `false` de lo contrario.
 */
Type.isFunction = function(value) {
    return typeof value === "function";
};

/**
 * Verifica si `value` es una instancia de `HTMLElement`
 *
 * @param {Object} value  Valor a evaluar
 * @return {Boolean} `true` si es `HTMLElement`, `false` de lo contrario
 */
Type.isHtmlElement = function(value) {
    return value ? value.nodeType === 1 : false;
};

/**
 * Verifica si `value` es un string
 *
 * @param {Object} value Objeto a evaluar
 * @return {Boolean} `true` si es string, `false` de lo contrario
 */
Type.isString = function(value) {
    return typeof value === "string";
};

/**
 * Verifica si `value` es de tipo `number` y finito
 *
 * @param {Object} value Valor a evaluar
 * @return {Boolean} `true` si es numero, `false` de lo contrario
 */
Type.isNumber = function(value) {
    return typeof value === "number" && isFinite(value);
};

/**
 * Verifica si `value` es un objeto
 *
 * @param {Object} value Objeto a evaluar
 * @return {Boolean} `true` su es objeto, `false` de lo contrario
 */
Type.isObject = function(value) {
    return value !== null && value !== undefined && Object.prototype.toString.call(value) === "[object Object]";
};

/**
 * Verifica si `value` es iterable, esto es si sus elementos son accesibles usando
 * notacion de array con indices numericos.
 *
 * Arrays y `arguments` son iterables, tambien lo son colecciones HTML como `NodeList` y
 * `HTMLCollection`
 *
 * @param {Object} value Objeto a evaluar
 * @return {Boolean} `true` si es iterable, `false` de lo contrario.
 */
Type.isIterable = function(value) {
    var iterableRegex = /\[object\s*(?:Array|Arguments|\w*Collection|\w*List|HTML\s+document\.all\s+class)\]/;
    // To be iterable, the object must have a numeric length property and must not be a string or function.
    if (!value || typeof value.length !== "number" || typeof value === "string" || typeof value === "function") {
        return false;
    }

    // Certain "standard" collections in IE (such as document.images) do not offer the correct
    // Javascript Object interface; specifically, they lack the propertyIsEnumerable method.
    // And the item property while it does exist is not typeof "function"
    if (!value.propertyIsEnumerable) {
        return !!value.item;
    }

    // If it is a regular, interrogatable JS object (not an IE ActiveX object), then...
    // If it has its own property called "length", but not enumerable, it"s iterable
    if (value.hasOwnProperty("length") && !value.propertyIsEnumerable("length")) {
        return true;
    }

    // Test against whitelist which includes known iterable collection types
    return iterableRegex.test(Object.prototype.toString.call(value));
};

return Type;

});
