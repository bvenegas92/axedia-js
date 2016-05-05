define([
    "./array"
], function() {
    /**
     * Toma el valor de una propiedad de cada elemento en el array y arma un nuevo
     * array con estos valores.
     *
     * @param {Array} array Array a iterar
     * @param {String} propertyName Propiedad a tomar
     * @return {Array} Array con los valores de las propiedades
     */
    $.Array.pluck = function(array, propertyName) {
        var ret = [],
            i, ln, item;

        for (i = 0, ln = array.length; i < ln; i++) {
            item = array[i];

            ret.push(item[propertyName]);
        }

        return ret;
    };
});
