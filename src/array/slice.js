define([
    "./array"
], function() {
    /**
     * Retorna una copia de una parte del array proporcionado
     *
     * @param {Array} array Array a partir
     * @param {Number} [begin] Índice de inicio.
     *                         *Valores negativos son desplazamientos del final del array.
     * @param {Number} [end] Índice de fin.
     *                       *Los elementos copiados no incluyen el ultimo.
     *                       *Valores negativos son desplazamientos del final del array.
     *                       *Si end es omitido, todos los elementos hasta el final del array son copiados.
     * @return {Array} La parte copiada del array
     */
    $.Array.slice = ([1,2].slice(1, undefined).length) ? function(array, begin, end) {
        return Array.prototype.slice.call(array, begin, end);
    } : function(array, begin, end) {
        if (typeof begin === "undefined") {
            return Array.prototype.slice.call(array);
        }
        if (typeof end === "undefined") {
            return Array.prototype.slice.call(array, begin);
        }
        return Array.prototype.slice.call(array, begin, end);
    };
});
