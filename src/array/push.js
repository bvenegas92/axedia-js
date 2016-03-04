define([
    './array',
    '../type/isArray'
], function($Array, $Type) {
    /**
     * Agrega elementos al final del array
     *
     * @param {Array}  target  Array al cual agregar los elementos
     * @return {Array}         Array con los nuevos elementos
     */
    $Array.push = function(target) {
        var len = arguments.length,
            i = 1,
            newItem;

        if (target === undefined) {
            target = [];
        } else if (!$Type.isArray(target)) {
            target = [target];
        }
        for (; i < len; i++) {
            newItem = arguments[i];
            Array.prototype.push[$Type.isIterable(newItem) ? 'apply' : 'call'](target, newItem);
        }
        return target;
    };
});
