define([
    "lang/String"
], function(
    String
) {
/**
 * Crea el singleton `Convert`
 *
 * @type {Object}
 */
var Convert = {};

/**
 * Convierte un valor decimal a hexadecimal
 *
 * @param  {Number} dec
 * @return {String} Hexadecimal
 */
Convert.decToHex = function(dec) {
    dec = parseInt(dec);
    return dec.toString(16);
};

/**
 * Convierte un valor hexadecimal a decimal
 *
 * @param  {String} hex
 * @return {Number} Decimal
 */
Convert.hexToDec = function(hex) {
    return parseInt(hex, 16);
};

/**
 * Convierte un byte decimal a byte hexadecimal
 *
 * @param {Number} dec
 * @return {String} Hexadecimal
 */
Convert.decByteToHexByte = function(dec) {
    dec = parseInt(dec);
    return String.leftPad(dec.toString(16), 2, "0");
};

/**
 * Convierte un byte hexadecimal a byte decimal
 *
 * @param {String} hex
 * @return {Number} Decimal
 */
Convert.hexByteToDecByte = function(hex) {
    return parseInt(hex, 16);
};

return Convert;

});
