define([
], function() {
/**
 * Crea el singleton `Convert`
 *
 * @type {Object}
 */
var Convert = {};

/**
 * Convierte un valor decimal a hexadecimal
 *
 * @param {Number} dec
 * @return {String}
 */
Convert.decToHex = function(dec) {
    return dec.toString(16);
};

/**
 * Convierte un valor hexadecimal a decimal
 *
 * @param {String} hex
 * @return {Number}
 */
Convert.hexToDec = function(hex) {
    return parseInt(hex, 16);
};
});
