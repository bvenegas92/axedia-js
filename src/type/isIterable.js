define([
    "./type",
    "./isFunction",
    "../regexp/iterable"
], function() {
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
    $.Type.isIterable = function(value) {
        // To be iterable, the object must have a numeric length property and must not be a string or function.
        if (!value || typeof value.length !== "number" || typeof value === "string" || $.Type.isFunction(value)) {
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
        return $.RegExp.ITERABLE.test(Object.prototype.toString.call(value));
    };
});
