define([
    "./class",
    "./validateClassName"
], function() {
    /**
     * Carga una clase (peticion del archivo js) y ejecuta `fn`.
     *
     * @param {String} className Nombre de la clase
     * @param {Function} fn Funcion a ejecutar despues de cargar el archivo
     */
    $.Class.load = function(className, fn) {
        if ($.IS_REQUIREJS_AVAILABLE) {
            $.Class.validateClassName(className);

            define([className.replace(/\./g, "/")], fn);
        } else {
            throw new Error("[" + namespace + ".Class.load] RequireJS debe estar disponible para cargar una clase");
        }
    };
});
