define([
    "./Math"
], function(
    Math
) {
/**
 * Limita un numero al intervalo [min, max]
 *
 * @param {Number} number Numero a limitar
 * @param {Number} min Minimo del intervalo
 * @param {Number} max Maximo del intervalo
 * @return {Number} Numero limitado
 */
Number.constrain = function(number, min, max) {
    number = parseFloat(number);

    if (min === null) {
        min = number;
    }
    if (max === null) {
        max = number;
    }
    return (number < min) ? min : ((number > max) ? max : number);
};

/**
 * Corrige numeros flotantes con punto decimal que tienen un overflow a un valor no-preciso debido
 * a su naturaleza de numeros flotantes binarios, por ejemplo: 0.1 + 0.2 = 0.30000000000000004
 *
 * Esto corrige los tipos de errores donde un flotante termina con una cadena de decimales grande
 * que normalmente es de 15-16 digitos, esta funcion lo acorta a 12
 *
 * @param {Number} n El numero a corregir
 * @return {Number} El numero correctamente redondeado
 */
Number.correctFloat = function(n) {
    return parseFloat(n.toFixed(12));
};

/**
 * Ajusta un numero a `n` decimales. Usando como opciones de ajuste los siguientes tipos:
 *
 * **********************************   "round"    **********************************
 *          -2    -1.5     -1.3     -1     0     1     1.3     1.5     2
 *           ^      |        |       ^           ^       |      |      ^
 *           +------+        +-------+           +-------+      +------+
 *
 * **********************************   "floor"    **********************************
 *          -2    -1.5     -1.3     -1     0     1     1.3     1.5     2
 *           ^      |        |                   ^      |       |
 *           +------+        |                   +------+       |
 *           +---------------+                   +--------------+
 *
 * **********************************   "trunc"    **********************************
 *          -2    -1.5     -1.3     -1     0     1     1.3     1.5     2
 *                  |        |       ^           ^      |       |
 *                  |        +-------+           +------+       |
 *                  +----------------+           +--------------+
 *
 * **********************************   "ceil"    ***********************************
 *          -2    -1.5     -1.3     -1     0     1     1.3     1.5     2
 *                  |        |       ^                  |       |      ^
 *                  |        +-------+                  |       +------+
 *                  +----------------+                  +--------------+
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
Number.decimalAdjust = function(value, n, type) {
    n = n || 0;
    type = type || "round";

    value = +value;
    value = Number.correctFloat(value);
    n = +n;
    // si `value` no es un numero o `n` no es entero retorna `NaN`
    if (isNaN(value) || !(typeof n === 'number' && n % 1 === 0 && n >= 0)) {
        return NaN;
    }
    // Avanza el punto decimal a la derecha para realiza el tipo
    // de ajuste deseado y eliminar los decimales sobrantes
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + ((value[1] ? +value[1] : 0) + n)));
    // Regresa el punto decimal a su lugar original y
    // vuelve a convertir a float
    value = value.toString().split('e');
    return +(value[0] + 'e' + ((value[1] ? +value[1] : 0) - n));
};

/**
 * Trunca un numero a `n` decimales (ver @Number.decimalAdjust)
 *
 * @param  {Number} value
 * @param  {Number} n
 * @return {Number}
 */
Number.trunc = function(value, n) {
    return Number.decimalAdjust(value, n, "trunc");
};

/**
 * Redondea un numero a `n` decimales (ver @Number.decimalAdjust)
 *
 * @param  {Number} value
 * @param  {Number} n
 * @return {Number}
 */
Number.round = function(value, n) {
    return Number.decimalAdjust(value, n, "round");
};

/**
 * Avanza al siguiente decimal un numero a `n` decimales (ver @Number.decimalAdjust)
 *
 * @param  {Number} value
 * @param  {Number} n
 * @return {Number}
 */
Number.ceil = function(value, n) {
    return Number.decimalAdjust(value, n, "ceil");
};

/**
 * Retrocede al anterior decimal un numero a `n` decimales (ver @Number.decimalAdjust)
 *
 * @param  {Number} value
 * @param  {Number} n
 * @return {Number}
 */
Number.floor = function(value, n) {
    return Number.decimalAdjust(value, n, "floor");
};

/**
 * Valida que un valor sea numerico y lo convierte si es necesario. Regresa el valor por default en caso contrario.
 *
 * @param {Object} value
 * @param {Number} defaultValue El numero default
 * @return {Number} `value` si es numerico, `defaultValue` de lo contrario
 */
Number.from = function(value, defaultValue) {
    if (isFinite(value)) {
        value = parseFloat(value);
    }

    return !isNaN(value) ? value : defaultValue;
};

/**
 * Genera un numero entero aleatorio en el intervalo [from, to]
 *
 * @param {Number} from Minimo del intervalo
 * @param {number} to Maximo del intervalo
 * @return {Number} Numero aleatorio
 */
Number.randomInt = function(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
};

return Number;

});
