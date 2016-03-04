define([
    './number'
], function($Number) {
    /*
     * Obliga a que los indices dados sean validos de acuerdo al `length` proporcionado
     *
     * Indices negativos son interpretados como si fueran del fin de un array. Es decir, un indice -1
     * indica el ultimo elemento o lo que es lo mismo `length` - 1.
     *
     * @param {Number}   length                     Longitud de los indices
     * @param {Number[]}    indices                    Arreglo el `begin` y `end` del intervalo
     * @param {Object}   [options]                  Objeto con diferentes opciones
     * @param {Boolean}  [options.count=false]      El segundo numero de `indices` es un contador no un indice
     * @param {Boolean}  [options.inclusive=false]  El segundo numero de `ìndices` es "inclusivo", esto significa que
     *                                              el elemento debe ser incluido en el rango. Normalmente este elemento
     *                                              suele ser el primer elemento fuera del rango, es decir "exclusivo"
     * @param {Boolean}  [options.wrap=true]        Envuelve los numeros negativos hacia atras desde el final del array
     * @return {Number[]}                           El array con los indices normalizados `[begin, end]`
     */
    $Number.clipIndices = function(length, indices, options) {
        options = options || {
            count: false,
            inclusive: false,
            wrap: true
        };

        var defaultValue = 0, // default value for "begin"
            wrap = options.wrap,
            begin, end, i;

        indices = indices || [];
        for (i = 0; i < 2; ++i) {
            // names are off on first pass but used this way so things make sense
            // following the loop..
            begin = end;  // pick up and keep the result from the first loop
            end = indices[i];
            if (end == null) {
                end = defaultValue;
            } else if (i && options.count) {
                end += begin; // this is the length not "end" so convert to "end"
                end = (end > length) ? length : end;
            } else {
                if (wrap) {
                    end = (end < 0) ? (length + end) : end;
                }
                if (i && options.inclusive) {
                    ++end;
                }
                end = (end < 0) ? 0 : ((end > length) ? length : end);
            }
            defaultValue = length; // default value for "end"
        }

        // after loop:
        // 0 <= begin <= length  (calculated from indices[0])
        // 0 <= end <= length    (calculated from indices[1])

        indices[0] = begin;
        indices[1] = (end < begin) ? begin : end;
        return indices;
    };
});
