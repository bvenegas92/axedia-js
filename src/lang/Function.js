define([
], function() {
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
});
