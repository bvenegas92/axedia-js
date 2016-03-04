define([
    './array',
    '../type/isArray',
    './slice',
    './toArray'
], function($Array, $Type) {
    /*
     * Convierte un valor a array, en caso de que no lo sea.
     * Retorna:
     * - un array vacio `[]` si el valor es `null` o `undefined`
     * - el mismo, si el valor ya es un array
     * - Una copia del array si el valor es un objeto iterable
     * - Un array de un elementoel cual es el valor dado
     *
     * @param {Object}   value         Valor a convertir
     * @param {Boolean}  newReference  Si el array debe ser clon con una nueva referencia
     * @return {Array}                 Array con el valor
     */
    $Array.from = function(value, newReference) {
        if (value === undefined || value === null) {
            return [];
        }

        if ($Type.isArray(value)) {
            return (newReference) ? $Array.slice(value) : value;
        }

        var type = typeof value;
        // <ExtJS>
        // Both strings and functions will have a length property. In phantomJS, NodeList
        // instances report typeof=='function' but don't have an apply method...
        if (value && value.length !== undefined && type !== 'string' && (type !== 'function' || !value.apply)) {
            return $Array.toArray(value);
        }

        return [value];
    };
});
