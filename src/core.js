define(function() {
    /**
     * Objeto ROOT(
     * - `window`en navegadores
     * - `global` en servidor
     * - `self` en WebWorker
     *
     * @type {Object}
     */
    var ROOT = (typeof window === "object" && window.window === window && window) ||
    (typeof global === "object" && global.global === global && global) ||
    (typeof self === "object" && self.self === self && self);

    /**
     * Nombre de la propiedad que se tomara como inicio del namespace en el objeto `ROOT`.
     * Si no se especifica ninguna se usara `ROOT` y se prodran acceder a los singletons y clases
     * de la siguiente manera.
     *
     * a)  window|global|self["Nombre/DeLa/ClaseOSingleton"] <- En caso que el nombre de la clase no sea un
     *                                                          nombre de variable valido y `NAME` no este definido
     *
     * b)  NombreDeLaClaseOSingleton <------------------------- En caso que el nombre de la clase sea un nombre de
     *                                                          variable valido y `NAME` no este definido
     *
     * c)  NAME["Nombre/DeLa/ClaseOSingleton"] <--------------- En caso que el nombre de la clase no sea un nombre de
     *                                                          variable valido y `NAME` esta definido
     *
     * d)  NAME.NombreDeLaClaseOSingleton <-------------------- En caso que el nombre de la clase sea un nombre de
     *                                                          variable valido y `NAME` esta definido
     *
     * e)  Class.find("Nombre/DeLa/ClaseOSingleton") <--------- Utilizando la funcion `find` de `la clase `Class` de
     *                                                          esta libreria. Este ejemplo supone que
     *                                                          `ROOT` == `window` && `NAME` == `undefined`
     * @type {String}
     */
    var NAME = arguments[0] ||
    (typeof window === "object" && window.window === window && "window") ||
    (typeof self === "object" && self.self === self && "self") ||
    (typeof global === "object" && global.global === global && "global");

    /**
     * Variable a usarse como entorno
     *
     * @type {Object}
     */
    var $ = ROOT[NAME] = ROOT[NAME] || {};

    /**
     * Verifica si RequireJS esta disponible.
     * Esta constante solo se asegura que `requirejs` sea una funcion
     *
     * @type {Boolean}
     */
    $.EXISTE_REQUIREJS = typeof requirejs === "function" &&
        typeof define === "function" &&
        requirejs === require;
});
