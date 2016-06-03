define([
    "./convert"
], function() {
    /**
     * Convierte un valor hexadecimal a decimal
     *
     * @param {String} hex Hexadecimal
     * @return {Number} Decimal
     */
    $.Convert.hexToDec = function(hex) {
        return parseInt(hex, 16);
    };
});
