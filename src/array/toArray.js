define([
    './array',
    './slice'
], function($Array) {
    /*
     * Convierte cualquier objeto iterable en array
     *
     * @param {Object}  iterable  Valor a convertir
     * @param {Number}  start    Indice del cual empezar
     * @param {Number}  end      Indice del cual terminar
     * @return {Array}            Array con el valor
     */
    $Array.toArray = function(iterable, start, end) {
        if (!iterable || !iterable.length) {
            return [];
        }

        if (typeof iterable === 'string') {
            iterable = iterable.split('');
        }

        var array = [],
            i;

        start = start || 0;
        end = end ? ((end < 0) ? iterable.length + end : end) : iterable.length;

        for (i = start; i < end; i++) {
            array.push(iterable[i]);
        }

        return array;
    };
});
