define([
    "../util/Type"
], function(Type) {
/**
 * Limita un numero al intervalo [min, max]
 *
 * @param {Number} num
 * @param {Number} min Minimo del intervalo
 * @param {Number} max Maximo del intervalo
 * @return {Number}
 */
Number.constrain = function(num, min, max) {
    num = parseFloat(num);

    if (min === null) {
        min = num;
    }
    if (max === null) {
        max = num;
    }
    return (num < min) ? min : ((num > max) ? max : num);
};

/**
 * Corrige numeros flotantes con punto decimal que tienen un overflow a un valor no-preciso debido
 * a su naturaleza de numeros flotantes, por ejemplo: 0.1 + 0.2
 *
 * Esto corrige los tipos de errores donde un flotante termina con una cadena de decimales grande
 * que normalmente es de 15-16 digitos, esta funcion lo acorta a 12
 *
 * @param {Number} num
 * @return {Number}
 */
Number.correctFloat = function(num) {
    return parseFloat(num.toFixed(12));
};

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
 * @param {Number} num
 * @param {Number} [n=0] Numero de decimales
 * @param {String} [type="round"] Tipo de ajuste
 * @return {Number}
 */
Number.decimalAdjust = function(num, n, type) {
    n = n || 0;
    type = type || "round";

    num = +num;
    num = Number.correctFloat(num);
    n = +n;
    // si `num` no es un numero o `n` no es entero retorna `NaN`
    if (isNaN(num) || !(typeof n === 'number' && n % 1 === 0)) {
        return NaN;
    }
    // Separa los decimales sobrantes y realiza el tipo de ajuste deseado
    num = num.toString().split('e');
    num = Math[type](+(num[0] + 'e' + (num[1] ? (+num[1] - n) : n)));
    // Vuelve a convertir a float
    num = num.toString().split('e');
    return +(num[0] + 'e' + (num[1] ? (+num[1] + n) : -n));
};

/**
 * Redondea `num` a `n` decimales
 *
 * @param  {Number} num
 * @param  {Number} n Numero de decimales
 * @return {Number}
 */
Number.round = function(num, n) {
    return Number.decimalAdjust(num, n, "round");
};

/**
 * Trunca `num` a `n` decimales
 *
 * @param  {Number} num
 * @param  {Number} n Numero de decimales
 * @return {Number}
 */
Number.truncate = function(num, n) {
    return Number.decimalAdjust(num, n, "floor");
};

/**
 * Redondea arriba `num` a `n` decimales
 *
 * @param  {Number} num
 * @param  {Number} n Numero de decimales
 * @return {Number}
 */
Number.ceil = function(num, n) {
    return Number.decimalAdjust(num, n, "ceil");
};

/**
 * Genera un numero entero aleatorio en el intervalo [from, to]
 *
 * @param {Number} from Minimo del intervalo
 * @param {Number} to Maximo del intervalo
 * @return {Number} Numero aleatorio
 */
Number.randomInt = function(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
};

/**
 * Genera un numero flotante aleatorio en el intervalo [from, to]
 *
 * @param {Number} from Minimo del intervalo
 * @param {Number} to Maximo del intervalo
 * @param {Number} [n] Numero de decimales
 * @return {Number} Numero aleatorio
 */
Number.randomFloat = function(from, to, n) {
    var num = Math.random() * (to - from) + from;
    return Type.isSet(n) ? Number.truncate(num, n) : num;
};
});
