define([
    "./class",
    "./validateClassName"
], function() {
    /**
     * Carga una clase (peticion del archivo js) y ejecuta `fn`.
     *
     * @param {String} className Nombre de la clase
     * @param {Function} fn Funcion a ejecutar despues de cargar el archivo
     * @throws {Error} Lanza un error si RequireJS no esta disponible
     */
    $.Class.load = function(className, fn) {
        if ($.EXISTE_REQUIREJS) {
            $.Class.validateClassName(className);

            define([className], fn);
        } else {
            throw new Error("RequireJS debe estar disponible para cargar una clase");
        }
    };
});
