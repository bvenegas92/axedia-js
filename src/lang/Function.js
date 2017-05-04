define([
], function(
) {
/**
 * Crea una herencia entre dos constructores encadenando el prototipo de `parent` al prototipo de `child`
 *
 * @param {Function} child Superclase
 * @param {Function} parent Subclase
 */
Function.extends = function(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};

/**
 * Crea una nueva funcion de acuerdo a los criterios del constructor `Function`
 * y los parametros proporcionados
 *
 * @param {...String} str
 * @return {Function}
 */
Function.factory = function(str) {
    var args = Array.prototype.slice.call(arguments);

    return Function.prototype.constructor.apply(Function.prototype, args);
};

return Function;

});
