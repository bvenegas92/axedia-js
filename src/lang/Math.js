define([
], function(
) {
/**
 * Trunca un valor
 *
 * @param {Number} x
 * @return {Number} Numero truncado
 */
Math.trunc = Math.trunc || function(x) {
    return x - x % 1;
};

return Math;

});
