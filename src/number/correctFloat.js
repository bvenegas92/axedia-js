define([
    './number'
], function($Number) {
    /**
     * Corrige numeros flotantes con punto decimal que tienen un overflow a un valor no-preciso debido
     * a su naturaleza de numeros flotantes, por ejemplo: 0.1 + 0.2
     *
     * Esto corrige los tipos de errores donde un flotante termina con una cadena de decimales grande
     * que normalmente es de 15-16 digitos, esta funcion lo acorta a 14
     *
     * @param {Number}  n  El numero a corregir
     * @return {Number}    El numero correctamente redondeado
     */
    $Number.correctFloat = function(n) {
        return parseFloat(n.toPrecision(14));
    };
});
