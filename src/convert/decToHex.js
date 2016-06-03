define([
    "./convert"
], function() {
    /**
     * Convierte un valor decimal a hexadecimal
     *
     * @param {Number} dec Decimal
     * @return {String} Hexadecimal
     */
    $.Convert.decToHex = function(dec) {
        return dec.toString(16);
    };
});
