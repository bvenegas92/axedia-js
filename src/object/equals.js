define([
    "./object"
], function() {
    /**
     * Verifica si dos objectos son iguales. Se consideran iguales si ambos objetos tienen las mismas propiedades
     * y los mismos valores.
     *
     * @param {Object} object1 Objeto 1
     * @param {Object} object2 Objeto 2
     * @return {Boolean} `true` si son iguales, `false` de lo contrario
     */
    $.Object.equals = (function(object1, object2) {
        var check = function(o1, o2) {
            var key;

            for (key in o1) {
                if (o1.hasOwnProperty(key)) {
                    if (o1[key] !== o2[key]) {
                        return false;
                    }
                }
            }
            return true;
        };

        return function(object1, object2) {

            // Short circuit if the same object is passed twice
            if (object1 === object2) {
                return true;
            } if (object1 && object2) {
                // Do the second check because we could have extra keys in
                // object2 that don't exist in object1.
                return check(object1, object2) && check(object2, object1);
            } else if (!object1 && !object2) {
                return object1 === object2;
            } else {
                return false;
            }
        };
    })();
});
