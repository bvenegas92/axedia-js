define([
    "./number"
], function() {
    /**
     * Ajusta un numero a `n` decimales. Usando como opciones de ajuste los siguientes tipos:
     *
     * -- "round": e.g.  1.3 -> 1;  1.5 -> 2
     * -- "floor": e.g.  1.3 -> 1;  1.5 -> 1
     * -- "ceil":  e.g.  1.3 -> 2;  1.5 -> 2
     *
     * NOTA: La function `toPrecision` ajusta la longitud de un numero a `n` digitos (el punto decimal no cuenta)
     * agregando `0` y punto decimal si se require. Debido a este comportamiento, esta funcion causa conflicto
     * cuando la parte entera tiene mas de 2 digitos.
     *
     * NOTA: La funcion `toFixed` devuelve un `string` no un `number`, ademas automaticamente redondea a la
     * cantidad de decimales deseada. Debido a estos comportamientos, esta funcion puede dar resultados no
     * deseados
     *
     * @param {Number} value Numero
     * @param {Number} [n=0] Numero de decimales
     * @param {String} [type="round"] Tipo de ajuste
     * @return {Number} Numero redondeado
     */
    $.Number.decimalAdjust = function(value, n, type) {
        n = n || 0;
        type = type || "round";

        value = +value;
        n = +n;
        // si `value` no es un numero o `n` no es entero retorna `NaN`
        if (isNaN(value) || !(typeof n === 'number' && n % 1 === 0)) {
            return NaN;
        }
        // Separa los decimales sobrantes y realiza el tipo de ajuste deseado
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - n) : n)));
        // Vuelve a convertir a float
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + n) : -n));
    };
});
