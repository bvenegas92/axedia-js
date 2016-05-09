define([
    "./class",
    "./validateClassName",
    "../array/each",
    "../array/indexOf",
    "../array/erase",
    "../type/isFunction"
], function() {
    /**
     * Encuentra una Clase/Constructor comenzando la busqueda en el ambito global. `className` debe ser del tipo
     * "Namespace.Subnamespace.Class"
     *
     * @param {String} className Nombre de la clase
     * @param  {Boolean} safe `true` para devolver un valor `null` en caso de no encontrar la clase o que
     *                        el objeto encontrado no sea un constructor (function)
     * @return {?Function} La clase o `null`
     */
    $.Class.find = function(className, safe) {
        var ref = global;

        $.Class.validateClassName(className);

        $.Array.each(className.split("."), function(name, index) {
            if (name in ref) {
                ref = ref[name];
            } else {
                ref = null;
                return false;
            }
        });

        if (!safe && ref == null) {
            throw new Error("[" + namespace + ".Class.find] Clase \"" + className + "\" no encontrada");
        } else if (!safe && !$.Type.isFunction(ref)) {
            throw new Error("[" + namespace + ".Class.find] \"" + className + "\" no es un constructor");
        }

        return ref;
    };
});
