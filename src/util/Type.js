define([
], function() {
/**
 * Crea el singleton `Type`
 *
 * @type {Object}
 */
var Type = {};

/**
 * Verifica si `value` es boolean
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isBoolean = function(value) {
    return typeof value === "boolean";
};

/**
 * Verifica si `value` es una funcion de JavaScript
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isFunction = function(value) {
    return typeof value === "function";
};

/**
 * Verifica si `value` es un string
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isString = function(value) {
    return typeof value === "string";
};

/**
 * Verifica si `value` es de tipo `number`
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isNumber = function(value) {
    return typeof value === "number";
};

/**
 * Verifica si `value` esta definido
 *
 * @param {Object} value
 * @return {Boolean}
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
    return value !== undefined && value !== null;
};

/**
 * Verifica si `value` es un array de JavaScript
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isArray = function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
};

/**
 * Verifica si `value` es una instancia de `Date`
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isDate = function(value) {
    return Object.prototype.toString.call(value) === "[object Date]";
};

/**
 * Verifica si `value` es un objeto literal
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isObject = function(value) {
    return Type.isSet(value) && Object.prototype.toString.call(value) === "[object Object]";
};

/**
 * Verifica si `value` es vacio.
 * Se considera vacio los siguientes casos:
 *
 * - `null`
 * - `undefined`
 * - [] (arreglo con cero elementos)
 * - "" (string vacio)
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isEmpty = function(value) {
    return value === undefined || value === null || value === "" || (Type.isArray(value) && value.length === 0);
};

/**
 * Verifica si `value` es una instancia de `HTMLElement`
 *
 * @param {Object} value
 * @return {Boolean}
 */
Type.isHtmlElement = function(value) {
    return value ? value.nodeType === 1 : false;
};

/**
 * Verifica si `value` es iterable, esto es si sus elementos son accesibles usando
 * notacion de array con indices numericos.
 *
 * Arrays y `arguments` son iterables, tambien lo son colecciones HTML como `NodeList` y
 * `HTMLCollection`
 *
 * @param {Object} value
 * @return {Boolean}
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
});
