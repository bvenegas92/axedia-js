define([
    './array',
    './slice'
], function($Array) {
    /**
     * Clona un array plano (solo el primer nivel) sin referenciar al original.
     * Es solo una forma simple para
     * Array.prototype.slice.call(array)
     *
     * @param {Array}  array  Array a clonar
     * @return {Array}        Array clonado
     */
    $Array.clone = function(array) {
        return $Array.slice(array);
    };
});
